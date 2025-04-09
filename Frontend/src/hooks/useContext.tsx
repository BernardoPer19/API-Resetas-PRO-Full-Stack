import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RecipesContext } from "../context/RecipesContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useRecipesContext = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipesContext must be used within a RecipesProvider");
  }
  return context;
};
