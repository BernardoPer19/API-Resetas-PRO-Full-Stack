import { AuthModel } from "../model/AuthModel.js";
import { validateLogin, validateRegister } from "../schema/AuthSchema.js";

export class AuthController {
  static async registerUser(req, res) {
    try {
      const validate = validateRegister(req.body);

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
      return res.status(500).json(error.message, "aaaaa");
    }
  }
  static async loginUser(req, res) {
    try {
      const validate = validateLogin(req.body);
      console.log(validate.data);

      const { email, contraseña } = validate.data;

      const user = await AuthModel.verifyByEmail(email);

      if (!contraseña) {
        return res.status(404).json({ message: "Falta una contraseña" });
      }
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
      console.log(token);
      
      const options = {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60,
      };
      return res
        .status(200)
        .cookie("access_token", token, options)
        .json({
          message: "Login exitoso",
          user: { id: user.user_id, email: user.email },
        });
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



export const verify = async (req, res) => {
  try {
    console.log("usuario autenticado:", req.user);

    const { email } = req.user;

    const userFound = await AuthModel.verifyByEmail(email);
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario autenticado", user: userFound });
  } catch (error) {
    return res.status(500).json({ message: "Error en la autenticación" });
  }
};
