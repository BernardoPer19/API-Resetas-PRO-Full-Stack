import axios, { AxiosError } from "axios";
import handleError from "../services/ErrorServices";

export const getRecipesRequest = async () => {
  try {
    const response = await axios.get("http://localhost:3000/recetas");
    console.log(response);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    }
    const handledError = handleError(error);
    throw new Error(handledError.body);
  }
};

export const createRecipeRequest = async () => {
  try {
    const response = await axios.post("/recetas");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    }
    const handledError = handleError(error);
    throw new Error(handledError.body);
  }
};
