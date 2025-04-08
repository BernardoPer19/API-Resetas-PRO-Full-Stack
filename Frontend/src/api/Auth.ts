// src/api/Auth.ts
import { AxiosError } from "axios";
import axios from "../api/axios"; // importás la instancia personalizada
import handleError from "../services/ErrorServices";
import { UserLoginType, UserType } from "../types/UserType";

// Register
export const registerRequest = async (user: UserType) => {
  try {
    const response = await axios.post("/register", user);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("Error backend:", error);

    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    }
    const handledError = handleError(error);
    throw new Error(handledError.body);
  }
};

export const loginUser = async (user: UserLoginType) => {
  try {
    const response = await axios.post("/login", user);
    return response.data;
  } catch (error: unknown) {
    console.log("Error backend:", error);

    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    }
    const handledError = handleError(error);
    throw new Error(handledError.body);
  }
};
// Logout
export const logoutRequest = async () => {
  try {
    const response = await axios.get("/logout");
    return response.data;
  } catch (error) {
    console.log("Error en logout:", error);
  }
};

// Verify Token
export const verifyTokenRequest = async () => {
  try {
    const response = await axios.get("/verify");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("Error en verify:", error);
    throw new Error("Usuario no autenticado");
  }
};
