import React, { createContext, useState, useMemo, useCallback } from "react";
import { useFetchRecipes } from "../hooks/useFetchRecipes";
import { RecipeType } from "../types/RecipeType";

// Tipado del contexto
interface RecipesContextProps {
  recipes: RecipeType[];
  loading: boolean;
  error: string | null;
  getRecipes: () => void;
  filteredRecipes: RecipeType[];
  filterByDifficulty: (difficulty: string) => void;
  filterByTypeOfDay: (type: string) => void;
  filterByCountry: (country: string) => void;
  filterByName: (name: string) => void;
}

// Creación del contexto
export const RecipesContext = createContext<RecipesContextProps | undefined>(
  undefined
);

export const RecipesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { recipes, loading, error, getRecipes } = useFetchRecipes();

  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  const [typeOfDayFilter, setTypeOfDayFilter] = useState<string>("");
  const [countryFilter, setCountryFilter] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");

  // Funciones de filtro
  const filterByDifficulty = useCallback((difficulty: string) => {
    setDifficultyFilter(difficulty);
  }, []);

  const filterByTypeOfDay = useCallback((type: string) => {
    setTypeOfDayFilter(type);
  }, []);

  const filterByCountry = useCallback((country: string) => {
    setCountryFilter(country);
  }, []);

  const filterByName = useCallback((name: string) => {
    setNameFilter(name.toLowerCase());
  }, []);

  // Lógica de filtrado
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesDifficulty =
        difficultyFilter === "" ||
        recipe.dificultad_nombre === difficultyFilter;

      const matchesTypeOfDay =
        typeOfDayFilter === "" || recipe.tipodia_nombre === typeOfDayFilter;

      const matchesCountry =
        countryFilter === "" || recipe.pais_nombre === countryFilter;

      const matchesName =
        nameFilter === "" ||
        recipe.receta_nombre.toLowerCase().includes(nameFilter);

      return (
        matchesDifficulty && matchesTypeOfDay && matchesCountry && matchesName
      );
    });
  }, [recipes, difficultyFilter, typeOfDayFilter, countryFilter, nameFilter]);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        loading,
        error,
        getRecipes,
        filteredRecipes,
        filterByDifficulty,
        filterByTypeOfDay,
        filterByCountry,
        filterByName,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
