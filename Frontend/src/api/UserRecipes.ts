import handleError from "../services/ErrorServices";
import axios from "../api/axios";
import { AxiosError } from "axios";

export const getUserRecipesRequest = async () => {
  try {
    const response = await axios.get("/profile");
    console.log(response.data);

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

export const createUserRecipeRequest = async (recetaId: number) => {
  try {
    const response = await axios.post(`/recetas/${recetaId}`, {
      receta_id: recetaId,
    }); 
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
