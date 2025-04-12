// components/UserRecipesList.js
import { useFetchUserRecipes } from "../hooks/useFetchUserRecipes";
import UserRecipesCard from "./UI/UserRecipesCard";

function UserRecipesList() {
  const { userRecipes, loading, error } = useFetchUserRecipes();

  if (loading) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600">
          Cargando tus recetas...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-red-600">{error}</div>
      </section>
    );
  }

  if (userRecipes.length === 0) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600">
          No tienes recetas disponibles.
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {userRecipes.map((recipe, index) => (
        <UserRecipesCard key={index} recipe={recipe} />
      ))}
    </section>
  );
}

export default UserRecipesList;
