// src/api/Auth.ts
import axios from "../api/axios"; // importás la instancia personalizada
import { AxiosError } from "axios";
import handleError from "../services/ErrorServices";
import { ValidationError } from "../errors/CustomError";
import { UserType } from "../types/UserType";

// Register
export const registerRequest = async (user: UserType) => {
  try {
    const response = await axios.post("/register", user);
    return response.data;
  } catch (error) {
    console.log("Error en register:", error);

    if (error instanceof AxiosError) {
      throw new ValidationError(
        error.response?.data?.message || "Error en el registro"
      );
    }
    throw handleError(error);
  }
};

// Login
export const loginUser = async (user: UserType) => {
  try {
    const response = await axios.post("/login", user);
    return response.data;
  } catch (error) {
    console.log("Error en login:", error);

    if (error instanceof AxiosError) {
      throw new ValidationError(
        error.response?.data?.message || "Error en el login"
      );
    }
    throw handleError(error);
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
export const verifyRequest = async () => {
  try {
    const response = await axios.get("/verify");
    return response.data;
  } catch (error) {
    console.log("Error en verify:", error);
    throw new Error("Usuario no autenticado");
  }
};
