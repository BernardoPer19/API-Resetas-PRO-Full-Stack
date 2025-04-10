import jwt from "jsonwebtoken";
import { JWT_PASSWORD_SECRET } from "../confing.js";

export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    console.log("token",token);
    
    if (!token) {
      return res.status(401).json({ message: "Token no encontrado" });
    }

    const decoded = jwt.verify(token, JWT_PASSWORD_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error.message);
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
