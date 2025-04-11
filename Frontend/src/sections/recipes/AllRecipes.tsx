import RecipesCard from "../../components/UI/RecipeCard";
import { useRecipesContext } from "../../hooks/useContext";

function AllRecipes() {
  const { filteredRecipes, loading, error } = useRecipesContext();
  console.log(filteredRecipes);

  if (loading) return <p className="text-center">Cargando recetas...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {filteredRecipes.map((recipe, index) => (
        <RecipesCard key={index} recipe={recipe} />
      ))}
    </div>
  );
}

export default AllRecipes;
