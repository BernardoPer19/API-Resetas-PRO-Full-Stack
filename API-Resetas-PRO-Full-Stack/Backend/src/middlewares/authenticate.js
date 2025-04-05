import jwt from "jsonwebtoken";
import { JWT_PASSWORD_SECRET } from "../confing.js";

export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

  if (!token) {
    res.status(400).json({ message: "verificar la creacion del token" });
    throw new Error("token expirado o iunvalido!");
  }

  const decoed = jwt.verify(token, JWT_PASSWORD_SECRET);
  console.log("decodeeeeeeeeeeeeeee", decoed);
  
  req.user = decoed

  next()
  } catch (error) {
    res.status(500).json(error.message)
  }
};
