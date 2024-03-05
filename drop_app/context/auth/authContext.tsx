import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  authState?: { token: string | null; isAuthenticated: boolean | null };
  onRegister?: (
    email: string,
    password: string,
    username: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType>({});

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    isAuthenticated: boolean | null;
  }>({
    token: null,
    isAuthenticated: null,
  });

  const JWT_KEY = "token";

  useEffect(() => {
    async function getKey(key: string) {
      let result = await SecureStore.getItemAsync(key);

      if (result) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${result}`;
        setAuthState({
          token: result,
          isAuthenticated: true,
        });

        alert("🔐 Here's your value 🔐 \n" + result);
      }
    }
    getKey(JWT_KEY);
  }, []);

  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const response = await axios.post(
        "http://192.168.40.242:5173/api/v1/user/register",
        {
          email,
          password,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.body);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.body.accessToken}`;

      const setToken = await SecureStore.setItemAsync(
        JWT_KEY,
        response.data.body.accessToken
      );
      router.replace("/(app)/(tabs)");

      console.log("SecureStore->:", setToken);
    } catch (error) {
      // return { error: true, message: (error as any).response.data.message };
      console.error(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(
        "http://192.168.40.242:5173/api/v1/user/login",
        { email, password }
      );
      console.info("response:", result);
      setAuthState({
        isAuthenticated: true,
        token: result.data.token,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(JWT_KEY, result.data.token);

      router.replace("/(app)/(tabs)");

      return result;
    } catch (error) {
      // return { error: true, message: (error as any).response.data.message };
      console.error(error);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(JWT_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      isAuthenticated: null,
      token: null,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider, useAuth };
