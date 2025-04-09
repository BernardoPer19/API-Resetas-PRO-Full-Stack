import { useEffect, useState } from "react";
import { getRecipesRequest } from "../api/Recipes";
import { RecipeType } from "../types/RecipeType";

export const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getRecipes = async () => {
    try {
      const data = await getRecipesRequest();
      setRecipes(data);
      console.log(data);
      
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
    recipes,
    loading,
    error,
    getRecipes,
  };
};
