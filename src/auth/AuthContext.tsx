import { createContext, useContext, useState } from "react";
import { getToken, setToken, clearToken } from "./token";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(getToken());

  const login = (newToken: string) => {
    setToken(newToken);
    setTokenState(newToken);
  };

  const logout = () => {
    clearToken();
    setTokenState(null);
  };

  const value = {
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
