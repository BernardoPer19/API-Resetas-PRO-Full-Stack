import { AxiosError } from "axios";
import { loginUser, registerRequest } from "../api/Auth";
import { ValidationError } from "../errors/CustomError";
import { UserType } from "../types/UserType";
import handleError from "./ErrorServices";

export const registerService = async (user: UserType): Promise<UserType> => {
  try {
    const result = await registerRequest(user);
    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ValidationError(
        error.response?.data.message || "Al registrar datos"
      );
    }
    throw handleError(error);
  }
};

export const loginService = async (user: UserType): Promise<UserType> => {
  try {
    const result = await loginUser(user);
    return result.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw new Error("Error en el registro de datos");
  }
};
