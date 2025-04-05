import { useState } from "react";
import { UserLoginType, UserType } from "../types/UserType";
import { formattedDate } from "../utils/FormattedDate";
import { loginService, registerService } from "../services/AuthServices";
import handleError from "../services/ErrorServices";
import { ValidationError } from "../errors/CustomError";
import { AxiosError } from "axios";

export const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const register = async (user: UserType): Promise<void> => {
    const userData = { ...user, creacionCuenta: formattedDate() };
    try {
      const response = await registerService(userData);
      if (response) {
        setUser(response);
        setIsAuthenticated(true);
      }
      
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ValidationError(
          error.response?.data.message || "Al registrar, intente de nuevo"
        );
      }
      throw handleError(error);
    }
  };
  const login = async (user: UserLoginType): Promise<void> => {
    try {
      const response = await loginService(user);
      if (response) {
        setUser(response);
        setIsAuthenticated(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ValidationError(
          error.response?.data.message ||
            "Al hacer login, por favor intente de nuevo"
        );
      }
      throw handleError(error);
    }
  };
  const logout = async () => {};
  const verify = async () => {};

  return {
    register,
    login,
    logout,
    verify,
    user,
    setIsAuthenticated,
    isAuthenticated,
    error,
    setError,
    setUser,
  };
};
