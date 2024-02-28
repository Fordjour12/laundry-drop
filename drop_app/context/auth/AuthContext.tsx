import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";

type AuthContextProps = {
  authState?: { token: string | null; isAuthenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
};

const AuthContext = createContext<AuthContextProps>({});

const AuthContextProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    isAuthenticated: boolean | null;
  }>({
    token: null,
    isAuthenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const isToken = await SecureStore.getItemAsync(tokenKey);
      console.info("stored Tk:", isToken);

      if (isToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${isToken}`;

        setAuthState({
          isAuthenticated: true,
          token: isToken,
        });
      }
    };

    loadToken();
  }, []);

  const api_uri = String(process.env.EXPO_PUBLIC_API_ENDPOINT);
  const tokenKey = String(process.env.EXPO_PUBLIC_TOKEN_KEY);

  /**
   * Register user flow for sign up a new user
   * @params email: string
   * @params password: string
   *
   * */
  const register = async (email: string, password: string) => {
    try {
      return await axios.post(api_uri, { email, password });
    } catch (error) {
      // return { error: true, message: (error as any).response.data.message };
      console.error(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(api_uri, { email, password });

      console.info("response:", result);

      setAuthState({
        isAuthenticated: true,
        token: result.data.token,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(tokenKey, result.data.token);

      return result;
    } catch (error) {
      // return { error: true, message: (error as any).response.data.message };
      console.error(error);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(tokenKey);
    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      isAuthenticated: false,
      token: null,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
