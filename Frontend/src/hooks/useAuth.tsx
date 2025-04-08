import { useEffect, useState } from "react";
import { UserLoginType, UserType } from "../types/UserType";
import { formattedDate } from "../utils/FormattedDate";
import { loginService, registerService } from "../services/AuthServices";
import { verifyTokenRequest } from "../api/Auth";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const register = async (user: UserType): Promise<void> => {
    const userData = { ...user, creacionCuenta: formattedDate() };

    try {
      const response = await registerService(userData);
      if (response) {
        setUser(response);
        setIsAuthenticated(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError(
          "Hubo un problema al intentar al registrarse. Intenta nuevamente."
        );
      }
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

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("access_token");
  };

  useEffect(() => {
    if (authError.length > 0) {
      const timer = setTimeout(() => {
        setAuthError("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [authError]);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await verifyTokenRequest();
        // console.log("Respuesta de verificación del token:", res);

        if (!res.data) {
          console.log("Respuesta sin datos");
          setIsAuthenticated(false);
        } else {
          // console.log("Token verificado con éxito");
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        console.error("Error verificando el token:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);
  return {
    register,
    login,
    logout,
    user,
    setIsAuthenticated,
    isAuthenticated,
    authError,
    setAuthError,
    setUser,
    loading,
    setLoading,
  };
};
