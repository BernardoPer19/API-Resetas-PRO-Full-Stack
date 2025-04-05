import { AuthModel } from "../model/AuthModel.js";
import { validateLogin, validateRegister } from "../schema/AuthSchema.js";



export class AuthController {
  static async registerUser(req, res) {
    try {
      const validate =  validateRegister(req.body);
      
      const { nombre, email, contraseña, fotoPerfil, creacionCuenta } =
        validate.data;

      if (!contraseña) {
        return res.status(404).json({ message: "Falta una contraseña" });
      }

      const user = await AuthModel.verifyByEmail(email);

      if (user) {
        return res
          .status(404)
          .json({ message: "El usuario ya esta registrado" });
      }

      await AuthModel.registerUser(
        nombre,
        email,
        contraseña,
        fotoPerfil,
        creacionCuenta
      );

      

      return res.status(201).json({
        message: "Usuario registrado",
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  static async loginUser(req, res) {
    try {
      const validate = validateLogin(req.body);
      
      const { email, contraseña } = validate.data;
      
      const user = await AuthModel.verifyByEmail(email);
      
      if (!contraseña) {
        return res.status(404).json({ message: "Falta una contraseña" });
      }
      
      console.log(user.contraseña);
      if (!user) {
        return res
          .status(404)
          .json({ message: "El usuario NO esta registrado" });
      }

      const validPassword = await AuthModel.comparePassword(
        contraseña,
        user.contraseña
      );



      if (!validPassword) {
        return res.status(401).json({ message: "La contraseña es incorrecta" });
      }

      const token = AuthModel.createToken(user);
      const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60,
      };

      return res
        .status(201)
        .cookie("access_token", token, options)
        .json({ message: "Login exitoso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el login", error: error.message });
    }
  }

  static async protectedRoute(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autorizado" });
    }

    res.status(200).json({ message: "Usuario autorizado", user: req.user });
  }

  static async logout(req, res) {
    try {
      res.clearCookie("access_token", { httpOnly: true, sameSite: "Strict" });

      return res.status(200).json({ message: "Logout exitoso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al cerrar sesión", error: error.message });
    }
  }
}
