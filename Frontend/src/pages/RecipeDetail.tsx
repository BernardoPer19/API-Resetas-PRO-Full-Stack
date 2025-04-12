import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchRecipes } from "../hooks/useFetchRecipes";
import { createUserRecipeRequest } from "../api/UserRecipes";

function RecipeDetail() {
  const { id } = useParams();
  const { recipe, loading, error, getRecipeById } = useFetchRecipes();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) getRecipeById(id);
  }, [id]);

  const handleSaveRecipe = async () => {
    try {
      await createUserRecipeRequest(recipe?.receta_id);
      setMessage("Receta guardada exitosamente en tu libro de recetas.");
    } catch (error) {
      setMessage(`${error.message}`);
    }
  };

  if (loading) return <div>Cargando receta...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!recipe) return <div>No se encontró la receta.</div>;

  return (
    <div className="h-[70vh] max-w-[1280px] p-5 mx-auto flex gap-20 justify-center items-center">
      <div className="flex justify-center items-center w-[700px]">
        <img
          src={recipe.imagen_url || "/default-recipe.jpg"}
          alt={`Imagen de la receta: ${recipe.receta_nombre}`}
          className="w-full h-[400px] object-cover rounded-xl"
          onError={(e) => {
            e.currentTarget.src = "/default-recipe.jpg";
          }}
        />
      </div>

      <div>
        <h2 className="text-3xl font-serif text-gray-800 font-semibold">
          {recipe.receta_nombre}
        </h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad eum ex ut,
          minus nobis rem tempora assumenda adipisci, autem blanditiis harum in
          quidem quo modi dolorem porro error atque unde.
        </p>

        <p className="text-lg text-gray-600 mt-4">{recipe.descripcion}</p>

        <div className="mt-4">
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

        <div className="mt-6 space-x-4 flex items-center">
          {/* Botón para guardar receta */}
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            onClick={handleSaveRecipe}
          >
            Guardar en libro de recetas
          </button>
        </div>

        {/* Mensaje de estado */}
        {message && <p className="mt-4 text-green-600 font-bold">{message}</p>}
      </div>
    </div>
  );
}

export default RecipeDetail;
