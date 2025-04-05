import React, { createContext, ReactNode, SetStateAction } from "react";
import { useAuth } from "../hooks/useAuth";
import { UserLoginType, UserType } from "../types/UserType";

interface AuthContextProps {
  user: UserType | null;
  setUser: React.Dispatch<SetStateAction<UserType | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<SetStateAction<string>>;
  login: (user: UserLoginType) => Promise<void>;
  register: (user: UserType) => Promise<void>;
  logout: () => Promise<void>;
  verify: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    error,
    isAuthenticated,
    login,
    logout,
    register,
    setError,
    setIsAuthenticated,
    user,
    setUser,
    verify,
  } = useAuth();

  const value: AuthContextProps = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    error,
    setError,
    login,
    register,
    logout,
    verify,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
