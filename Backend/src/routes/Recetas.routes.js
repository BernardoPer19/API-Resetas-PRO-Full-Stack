import { Router } from "express";
import { recetaController } from "../controllers/Recetas.controller.js";

const RecipesRouter = Router();

RecipesRouter.get("/recetas", recetaController.obtenerRecetas);
RecipesRouter.post("/recetas", recetaController.crearReceta);
RecipesRouter.delete("/recetas", recetaController.eliminarRecetas);
RecipesRouter.put("/recetas", recetaController.actualizarReceta);

export default RecipesRouter;
