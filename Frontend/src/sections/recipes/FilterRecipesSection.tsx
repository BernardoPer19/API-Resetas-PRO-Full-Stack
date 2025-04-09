import { useRecipesContext } from "../../hooks/useContext";
import { ChangeEvent } from "react";

const FilterRecipesSection = () => {
  const {
    filterByDifficulty,
    filterByTypeOfDay,
    filterByCountry,
    filterByName,
  } = useRecipesContext();

  const handleDifficulty = (e: ChangeEvent<HTMLSelectElement>) => {
    filterByDifficulty(e.target.value);
  };

  const handleTypeOfDay = (e: ChangeEvent<HTMLSelectElement>) => {
    filterByTypeOfDay(e.target.value);
  };

  const handleCountry = (e: ChangeEvent<HTMLSelectElement>) => {
    filterByCountry(e.target.value);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    filterByName(e.target.value);
  };

  return (
    <section className="max-w-[1280px] m-auto py-10 bg-white rounded-2xl space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Buscador por nombre */}
        <div className="flex w-full sm:w-[300px]">
          <input
            type="text"
            placeholder="Buscar recetas..."
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="button"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md transition-colors"
          >
            Buscar
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Tipo de día */}
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            defaultValue=""
            onChange={handleTypeOfDay}
          >
            <option value="">Todos los tipos</option>
            <option value="Desayuno">Desayuno</option>
            <option value="Almuerzo">Almuerzo</option>
            <option value="Cena">Cena</option>
            <option value="Merienda">Merienda</option>
          </select>

          {/* Dificultad */}
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            defaultValue=""
            onChange={handleDifficulty}
          >
            <option value="">Todas las dificultades</option>
            <option value="Fácil">Fácil</option>
            <option value="Medio">Medio</option>
            <option value="Difícil">Difícil</option>
          </select>

          {/* País */}
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            defaultValue=""
            onChange={handleCountry}
          >
            <option value="">Todos los países</option>
            <option value="España">España</option>
            <option value="México">México</option>
            <option value="Japón">Japón</option>
            <option value="Italia">Italia</option>
            <option value="Estados Unidos">Estados Unidos</option>
            <option value="Francia">Francia</option>
            <option value="Tailandia">Tailandia</option>
            <option value="India">India</option>
            <option value="Argentina">Argentina</option>
            <option value="Grecia">Grecia</option>
            <option value="Turquía">Turquía</option>
            <option value="Brasil">Brasil</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default FilterRecipesSection;
