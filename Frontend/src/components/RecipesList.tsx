import { useFetchRecipes } from "../hooks/useFetchRecipes";
import RecipesCard from "./RecipeCard";

const RecipesList = () => {
  const { recipes, loading, error } = useFetchRecipes();
  console.log(recipes);

  if (loading) return <p className="text-center">Cargando recetas...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {recipes.map((recipe, index) => (
        <RecipesCard key={index} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipesList;
