// components/UserRecipesCard.tsx
import { RecipeType } from "../../types/RecipeType";

interface Props {
  recipe: RecipeType;
}

function UserRecipesCard({ recipe }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 overflow-hidden w-full sm:w-[400px] lg:w-[500px] max-w-sm mx-auto">
      {/* Imagen de la receta */}
      <img
        src={recipe.imagen_url || "/default-recipe.jpg"}
        alt={`Imagen de la receta: ${recipe.receta_nombre}`}
        className="w-full h-64 object-cover rounded-t-xl"
        onError={(e) => {
          e.currentTarget.src = "/default-recipe.jpg";
        }}
      />

      {/* Contenido de la receta */}
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-serif text-gray-800 font-semibold">
          {recipe.receta_nombre}
        </h3>
        <p className="text-gray-600 text-base">{recipe.descripcion}</p>

        <div className="flex justify-between text-sm text-gray-500">
          <p>País: {recipe.pais_nombre}</p>
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-between space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-500 transition-colors"
            aria-label="Ver receta"
          >
            Ver receta
          </button>

  
        </div>
      </div>
    </div>
  );
}

export default UserRecipesCard;
