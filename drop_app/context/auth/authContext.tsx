import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
  authState?: { token: string | null; isAuthenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
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
  const API_KEY = String(process.env.EXPO_PUBLIC_API_ENDPOINT);

  // useEffect(() => {
  //   const tokenLoaded = async () => {
  //     const isTokenAvailable = await SecureStore.getItemAsync(JWT_KEY);

  //     if (isTokenAvailable) {
  //       axios.defaults.headers.common[
  //         "Authorization"
  //       ] = `Bearer ${isTokenAvailable}`;

  //       setAuthState({
  //         isAuthenticated: true,
  //         token: isTokenAvailable,
  //       });
  //     } else {
  //       setAuthState({
  //         isAuthenticated: false,
  //         token: null,
  //       });
  //     }
  //   };

  //   tokenLoaded();
  // }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axios.post(API_KEY, { email, password });
    } catch (error) {
      // return { error: true, message: (error as any).response.data.message };
      console.error(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(API_KEY, { email, password });
      console.info("response:", result);
      setAuthState({
        isAuthenticated: true,
        token: result.data.token,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(JWT_KEY, result.data.token);

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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider, useAuth };
