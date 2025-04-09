import { Pencil, Trash2, Share2 } from "lucide-react";
import { RecipeType } from "../types/RecipeType";

interface Props {
  recipe: RecipeType;
}

function RecipesCard({ recipe }: Props) {
  const { title, description, image } = recipe;

  const handleEdit = () => alert(`Editar receta: ${title}`);
  const handleDelete = () => confirm(`¿Eliminar receta "${title}"?`);
  const handleShare = () => {
    navigator.clipboard.writeText(title);
    alert("Receta copiada al portapapeles");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-[1.02] overflow-hidden w-full sm:w-[380px]">
      <img
        src={image}
        alt={`Imagen de la receta: ${title}`}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.src = "/default-recipe.jpg";
        }}
      />
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
          >
            <Pencil size={16} /> Editar
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
          >
            <Trash2 size={16} /> Eliminar
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
          >
            <Share2 size={16} /> Compartir
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipesCard;
