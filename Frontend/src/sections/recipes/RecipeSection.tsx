import { useState } from "react";
import ShareButton from "../../components/UI/ShareButton";

function RecipeSection() {
  const [showOptions, setShowOptions] = useState(false);

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent("¡Mira esta deliciosa receta!");

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("¡Enlace copiado al portapapeles!");
    setShowOptions(false);
  };

  return (
    <section className="w-full bg-[#f5f5f5] h-screen flex items-center py-12">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        {/* Imagen del plato */}
        <img
          src="https://www.pequerecetas.com/wp-content/uploads/2010/10/pasta-carbonara-espaguetis-receta.jpg"
          alt="Pasta Carbonara"
          className="w-full md:w-[500px] rounded-2xl shadow-lg object-cover"
        />

        {/* Contenido de la receta */}
        <div className="flex-1 space-y-5 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Pasta Carbonara Cremosa
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            ¡Una explosión de sabor en cada bocado! Disfruta de esta receta
            italiana con toques caseros que enamoran. Rápida, deliciosa y
            perfecta para cualquier ocasión.
          </p>

          <div className="flex justify-center md:justify-start gap-4 pt-4 flex-wrap">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-5 rounded-lg transition duration-300">
              Añadir al Libro de Recetas
            </button>

            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="bg-white border-2 border-yellow-400 hover:bg-yellow-100 text-yellow-500 font-semibold py-2 px-5 rounded-lg transition duration-300"
              >
                Compartir
              </button>

              <ShareButton
                showOptions={showOptions}
                shareUrl={shareUrl}
                shareText={shareText}
                handleCopy={handleCopy}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecipeSection;
