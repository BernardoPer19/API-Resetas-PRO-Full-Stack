import AllRecipes from "../sections/recipes/AllRecipes";
import FilterRecipesSection from "../sections/recipes/FilterRecipesSection";
import RecipeSection from "../sections/recipes/RecipeSection";

function RecipePage() {
  return (
    <main>
      <RecipeSection />
      <section className="mian-h-screen p-10">
        <h1 className="text-4xl text-center font-semibold">Nuestras Recetas!</h1>
        <FilterRecipesSection />
        <AllRecipes />
      </section>
    </main>
  );
}

export default RecipePage;
