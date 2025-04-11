import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchRecipes } from "../hooks/useFetchRecipes";
import HeartIcon from "../components/UI/HearIcon";

function RecipeDetail() {
  const { id } = useParams();
  const { recipe, loading, error, getRecipeById } = useFetchRecipes();

  useEffect(() => {
    if (id) getRecipeById(id);
  }, [id]);

  if (loading) return <div>Cargando receta...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!recipe) return <div>No se encontró la receta.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex justify-center items-center">
        <img
          src={recipe.imagen_url || "/default-recipe.jpg"}
          alt={`Imagen de la receta: ${recipe.receta_nombre}`}
          className="w-full h-96 object-cover rounded-xl"
          onError={(e) => {
            e.currentTarget.src = "/default-recipe.jpg";
          }}
        />
      </div>

      {/* Texto a la derecha */}
      <div className="space-y-6">
        <h2 className="text-3xl font-serif text-gray-800 font-semibold">
          {recipe.receta_nombre}
        </h2>

        <p className="text-lg text-gray-600">{recipe.descripcion}</p>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-700">
            Detalles de la receta
          </h3>
          <ul className="text-gray-600 text-base space-y-2">
            <li>
              <strong>País:</strong> {recipe.pais_nombre}
            </li>
            <li>
              <strong>Dificultad:</strong> {recipe.dificultad_nombre}
            </li>
            <li>
              <strong>Categoría:</strong> {recipe.categoria_nombre}
            </li>
            <li>
              <strong>Tipo de día:</strong> {recipe.tipodia_nombre}
            </li>
          </ul>
        </div>

        {/* Botones */}
        <div className="mt-6 space-x-4 flex items-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Guardar en libro de recetas
          </button>
          <HeartIcon />
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
