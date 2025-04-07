import React, { createContext, ReactNode, SetStateAction } from "react";
import { useAuth } from "../hooks/useAuth";
import { UserLoginType, UserType } from "../types/UserType";

interface AuthContextProps {
  user: UserType | null;
  setUser: React.Dispatch<SetStateAction<UserType | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
  authError: string;
  setAuthError: React.Dispatch<SetStateAction<string>>;
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
    authError,
    isAuthenticated,
    login,
    logout,
    register,
    setAuthError,
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
    authError,
    setAuthError,
    login,
    register,
    logout,
    verify,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
