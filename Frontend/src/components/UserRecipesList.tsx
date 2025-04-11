import { useFetchUserRecipes } from "../hooks/useFetchUserRecipes";

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
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 overflow-hidden w-full sm:w-[400px] lg:w-[500px] max-w-sm mx-auto"
        >
          <img
            src={recipe.imagen_url || "/default-recipe.jpg"}
            alt={`Imagen de la receta: ${recipe.receta_nombre}`}
            className="w-full h-64 object-cover rounded-t-xl"
            onError={(e) => {
              e.currentTarget.src = "/default-recipe.jpg";
            }}
          />
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-serif text-gray-800 font-semibold">
              {recipe.receta_nombre}
            </h3>
            <p className="text-gray-600 text-base">{recipe.descripcion}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <p>País: {recipe.pais_nombre}</p>
            </div>

            <div className="flex items-center justify-between space-x-4 mt-4">
              <button className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-500 transition-colors">
                Ver receta
              </button>
              <button className="p-2 rounded-full border-2 border-gray-300 hover:bg-gray-200 transition-colors">
                <span role="img" aria-label="heart">
                  ❤️
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default UserRecipesList;
