import { useState } from "react";
import { UserLoginType, UserType } from "../types/UserType";
import { formattedDate } from "../utils/FormattedDate";
import { loginService, registerService } from "../services/AuthServices";

export const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  const register = async (user: UserType): Promise<void> => {
    const userData = { ...user, creacionCuenta: formattedDate() };

    try {
      const response = await registerService(userData);
      if (response) {
        setUser(response);
        setIsAuthenticated(true);
      }
    } catch (error: unknown) {
      setAuthError(error.body);
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
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError(
          "Hubo un problema al intentar hacer login. Intenta nuevamente."
        );
      }
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
    authError,
    setAuthError,
    setUser,
  };
};
