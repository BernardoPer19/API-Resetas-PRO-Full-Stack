import axios, { AxiosError } from "axios";
import handleError from "../services/ErrorServices";
import { ValidationError } from "../errors/CustomError";
import { UserType } from "../types/UserType";

export const registerRequest = async (user: UserType) => {
  try {
    const response = await axios.post("/register", user);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ValidationError(
        error.response?.data.message || "Error en la solicitud"
      );
    }
    throw handleError(error);
  }
};

export const loginUser = async (user: UserType) => {
  try {
    const response = await axios.post("/login", user);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ValidationError(
        error.response?.data.message || "Error en la solicitud"
      );
    }
    throw handleError(error);
  }
};

export const logoutRequest = () => {
  axios.get("/logout");
};
