import { HeartIcon } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContex";

interface Props {
  recetaId: number;
}

const HeartIcona = ({ recetaId }: Props) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorito = isFavorite(recetaId);

  const toggleFavorite = () => {
    favorito ? removeFavorite(recetaId) : addFavorite(recetaId);
  };

  return (
    <button onClick={toggleFavorite} className="cursor-pointer">
      <HeartIcon
        size={32}
        className={`transition-colors ${
          favorito ? "text-red-500" : "text-gray-500"
        }`}
      />
    </button>
  );
};

export default HeartIcona;
