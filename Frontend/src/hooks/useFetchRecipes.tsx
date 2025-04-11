import { useEffect, useState } from "react";
import { getRecipeByIdRequest, getRecipesRequest } from "../api/Recipes";
import { RecipeType } from "../types/RecipeType";

export const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getRecipes = async () => {
    setLoading(true);
    try {
      const data = await getRecipesRequest();
      setRecipes(data);
      setError(null);
    } catch (err: any) {
      setError("Hubo un error al obtener las recetas");
    } finally {
      setLoading(false);
    }
  };

  const getRecipeById = async (id: string) => {
    setLoading(true);
    try {
      const data = await getRecipeByIdRequest(id);
      setRecipe(data);
      setError(null);
    } catch (err: any) {
      setError("No se pudo obtener la receta");
    } finally {
      setLoading(false);
    }
  };
  // 🚀 Hacer el fetch solo si recipes está vacío
  useEffect(() => {
    if (recipes.length === 0) {
      getRecipes();
    }
  }, [recipes]);

  return {
    recipes,
    recipe,
    loading,
    error,
    getRecipes,
    getRecipeById,
  };
};
