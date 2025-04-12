import { Router } from "express";
import { usuarioController } from "../controllers/usuarios.controller.js";
import { authenticate } from "../middlewares/authenticate.js";


const usuarioRecipeRoute = Router();

usuarioRecipeRoute.get("/profile", authenticate, usuarioController.obtenerRecetaUsuario);
usuarioRecipeRoute.post("/recetas/:id", authenticate, usuarioController.crearRecetaUsuario);
usuarioRecipeRoute.delete("/profile/:id", authenticate, usuarioController.eliminarRecetaUsuario);

export default usuarioRecipeRoute;
