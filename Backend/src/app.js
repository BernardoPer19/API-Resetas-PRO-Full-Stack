import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import AuthRouter from "./routes/Auth.routes.js";
import RecipesRouter from "./routes/Recetas.routes.js";
import usuarioRecipeRoute from "./routes/UsuarioReceta.routes.js";

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));


app.use("/", AuthRouter);
app.use("/",usuarioRecipeRoute)
app.use("/", RecipesRouter)
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
