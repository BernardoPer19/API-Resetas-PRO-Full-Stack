import { usuarioModel } from "../model/usuarioModel.js";
import { validateUsuario } from "../schema/usuarioShema.js";

export class usuarioController {
  static obtenerRecetaUsuario = async (req, res) => {
    const user_id = req.user.id;
    console.log("-------------", user_id);

    try {
      const result = await usuarioModel.obtenerRecetaUsuarioModel(user_id);
      console.log(result);

      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener las recetas del usuario", error });
    }
  };

  static crearRecetaUsuario = async (req, res) => {
    const user_id = req.user.id;
    const receta_id = req.params.id;

    if (isNaN(receta_id) || Number(receta_id) <= 0) {
      return res
        .status(400)
        .json({ message: "El ID de la receta no es válido." });
    }

    try {
      const { valid, errors } = validateUsuario({
        user_id,
        receta_id: Number(receta_id),
      });

      if (!valid) {
        return res.status(400).json({ message: "Error de validación", errors });
      }

      const recetaExistente = await usuarioModel.verificarRecetaExistente(
        user_id,
        receta_id
      );
      if (recetaExistente) {
        return res
          .status(400)
          .json({ message: "Esta receta ya está asociada a tu cuenta." });
      }

      const result = await usuarioModel.crearRecetaUsuarioModel(
        user_id,
        receta_id
      );

      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error al guardar la receta." });
    }
  };

  static eliminarRecetaUsuario = async (req, res) => {
    const user_id = req.user.id;
    try {
      const { receta_id } = req.body;

      if (!receta_id) {
        return res.status(400).json({ message: "receta_id es requerida" });
      }
      const result = await usuarioModel.eliminarRecetaUsuarioModel(
        user_id,
        receta_id
      );

      console.log("asdasd", result);

      if (!result) {
        return res
          .status(400)
          .json({ message: "receta no encontrada del usuario" });
      }

      res.status(200).json({ message: "receta eliminada con exito" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al eliminar la receta del usuario", error });
    }
  };
}
