import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecipePage from "./pages/RecipePage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import "./App.css";
import ProtectedRoute from "./pages/ProtectedRoute";
import Navbar from "./components/UI/Navbar";
import { RecipesProvider } from "./context/RecipesContext";
import RecipeDetail from "./pages/RecipeDetail";

function App() {
  return (
    <>
      <RecipesProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/recetas" element={<RecipePage />} />
            <Route path="/recetas/:id" element={<RecipeDetail />} />

            {/* Protected Route Here! */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecipesProvider>
    </>
  );
}

export default App;
