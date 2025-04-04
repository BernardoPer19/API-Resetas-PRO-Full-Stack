import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Ruta de ejemplo
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
