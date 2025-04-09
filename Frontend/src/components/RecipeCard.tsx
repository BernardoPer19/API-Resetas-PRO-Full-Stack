import { RecipeType } from "../types/RecipeType";

interface Props {
  recipe: RecipeType;
}

function RecipesCard({ recipe }: Props) {
  const {
    categoria_nombre,
    descripcion,
    dificultad_nombre,
    imagen_url,
    receta_nombre,
    pais_nombre,
    tipodia_nombre,
  } = recipe;

  console.log(tipodia_nombre);
  

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 overflow-hidden w-full sm:w-[400px] lg:w-[500px] max-w-sm mx-auto">
      <img
        src={imagen_url || "/default-recipe.jpg"}
        alt={`Imagen de la receta: ${receta_nombre}`}
        className="w-full h-64 object-cover rounded-t-xl"
        onError={(e) => {
          e.currentTarget.src = "/default-recipe.jpg";
        }}
      />
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-serif text-gray-800 font-semibold">{receta_nombre}</h3>
        <p className="text-gray-600 text-base">{descripcion}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <p>País: {pais_nombre}</p>
          <p>Dificultad: {dificultad_nombre}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">Categoría: {categoria_nombre}</p>
          <p className="text-sm text-gray-400">Tipo de día: {tipodia_nombre}</p>
        </div>
        <div className="flex items-center justify-between space-x-4 mt-4">
          <button className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-500 transition-colors">
            Ver receta
          </button>
          <button className="p-2 rounded-full border-2 border-gray-300 hover:bg-gray-200 transition-colors">
            <span role="img" aria-label="heart">❤️</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipesCard;
