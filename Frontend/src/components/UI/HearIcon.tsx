import { HeartOffIcon } from "lucide-react";
import { useState, useEffect } from "react";

const HeartIcon = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Verificar si ya está guardado en el localStorage
    const savedFavorite = localStorage.getItem("favoriteRecipe");
    if (savedFavorite !== null) {
      setIsFavorite(JSON.parse(savedFavorite));
    }
  }, []);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    localStorage.setItem("favoriteRecipe", JSON.stringify(!isFavorite));
  };

  return (
    <button onClick={handleFavoriteClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-8 h-8 ${isFavorite ? "text-red-500" : "text-gray-500"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927C10.56 2.333 9.644 2.345 9.162 2.927l-.868.874-.868-.874C7.356 2.345 6.44 2.333 5.951 2.927a4.557 4.557 0 000 6.438L12 21.35l6.85-11.985a4.557 4.557 0 000-6.438z"
        />
      </svg>
      <HeartOffIcon/>
    </button>
  );
};

export default HeartIcon;
