import React from "react";

function Header() {
  return (
    <section
      className="
    bg-amber-50
    h-[80vh]
     md:gap-10 p-5 text-center md:text-left  m-auto"
    >
      <main className="max-w-[1280px] flex justify-center items-center m-auto h-[100%]">
        <div className="md:flex-1 space-y-4">
          <h1 className="text-4xl font-bold leading-tight">
            Recetas Rápidas para Todos los Gustos
          </h1>
          <p className="text-lg">
            Descubre recetas fáciles y deliciosas para sorprender a tu familia o
            amigos. ¡Comida casera, sin complicaciones!
          </p>
          <button className="bg-yellow-400 text-black py-2 px-4 rounded-lg mt-4 hover:bg-yellow-500 transition duration-300">
            Ver Recetas!
          </button>
        </div>
        <img
          src="https://www.restaurantechia.com/wp-content/uploads/sites/833/2023/08/comidas.png"
          alt="Comidas deliciosas"
          className="md:w-[500px] w-full mt-5 md:mt-0 rounded-lg back  drop-shadow-2xl"
        />
      </main>
    </section>
  );
}

export default Header;
