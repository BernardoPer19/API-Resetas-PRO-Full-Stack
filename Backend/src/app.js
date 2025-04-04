import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import AuthRouter from "./routes/Auth.routes.js";

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", AuthRouter)


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
