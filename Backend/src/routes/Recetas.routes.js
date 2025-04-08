import { Router } from "express";
import { recetaController } from "../controllers/Recetas.controller.js";

const RecipesRouter = Router();

RecipesRouter.get("/recipes", recetaController.obtenerRecetas);
RecipesRouter.post("/recipes", recetaController.crearReceta);
RecipesRouter.delete("/recipes", recetaController.eliminarRecetas);
RecipesRouter.put("/recipes", recetaController.actualizarReceta);

export default RecipesRouter;
