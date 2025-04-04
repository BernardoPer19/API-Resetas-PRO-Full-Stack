import { UserModel } from "../model/AuthModel";
import { validateLogin, validateRegister } from "../schema/AuthSchema";

export class AuthController {
  static async registerUser(req, res) {
    try {
      const validate = validateRegister(req.body);
      const { user_id, nombre, email, contraseña, fotoPerfil, creacionCuenta } =
        validate.data;

      if (!contraseña) {
        return res.status(404).json({ message: "Falta una contraseña" });
      }

      const user = await UserModel.getUserByEmail(user_id);

      if (user) {
        return res
          .status(404)
          .json({ message: "El usuario ya esta registrado" });
      }

      const newUser = await UserModel.registerUser(
        user_id,
        nombre,
        email,
        contraseña,
        fotoPerfil,
        creacionCuenta
      );

      return res.status(201).json({
        message: "Usuario registrado",
        user: newUser,
      });
    } catch (error) {
      res.status(500).json(
        {
          message: "un error interno en el server al registrarse ",
        },
        error.message
      );
    }
  }
  static async loginUser(req, res) {
    try {
      const validate = validateLogin(req.body);
      const { email, contraseña } = validate.data;
      const user = await UserModel.getUserByEmail(email);

      if (!contraseña) {
        return res.status(404).json({ message: "Falta una contraseña" });
      }

      if (!user) {
        return res
          .status(404)
          .json({ message: "El usuario NO esta registrado" });
      }

      const validPassword = UserModel.comparePassword(
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
