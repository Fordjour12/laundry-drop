import { useStorageState } from "@/hooks/useStorageState";
import axios from "axios";
import { createContext, useContext } from "react";

type AuthContextType = {
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<any>;
  onRegister: (email: string, password: string) => Promise<any>;
  session?: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const JWT_STORAGE_KEY = process.env.EXPO_PUBLIC_JWT_STORAGE_KEY!;

  const [[isLoading, session], setSession] = useStorageState(JWT_STORAGE_KEY);

  const register = async (email: string, password: string) => {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/register`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data.body);
  };

  const login = async (email: string, password: string) => {
    console.log(email, password);
  };

  const logout = async () => {
    setSession(null);
  };

  const authContextValueData = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    session,
    isLoading
  };

  return (
    <AuthContext.Provider value={authContextValueData}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider, useAuth };
