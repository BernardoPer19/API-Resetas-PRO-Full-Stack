import { useEffect, useState } from "react";
import { getUserRecipesRequest } from "../api/UserRecipes";
import { RecipeType } from "../types/RecipeType";

export const useFetchUserRecipes = () => {
  const [userRecipes, setUserRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getRecipes = async () => {
    try {
      const data = await getUserRecipesRequest();
      setUserRecipes(data);
      setError(null);
    } catch (err: any) {
      console.error("Error al obtener recetas:", err);
      setError("Hubo un error al obtener las recetas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return {
    userRecipes,
    loading,
    error,
    getRecipes,
  };
};
