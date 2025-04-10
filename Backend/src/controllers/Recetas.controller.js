import { recetaMode } from "../model/recetasModel.js";
import { validateReceta } from "../schema/recetasSchema.js";

export class recetaController {
  static obtenerRecetas = async (req, res) => {
    try {
      const result = await recetaMode.obtenerRecetass();

      return res.status(200).json(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "error al obtener las recetas" });
    }
  };

  static crearReceta = async (req, res) => {
    try {
      const { data } = validateReceta(req.body);
      const result = await recetaMode.crearRecetas(data);

      if (!result) {
        return res.status(400).json({ message: "No se encontró la receta" });
      }

      res.status(201).json(result); 
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al crear la receta" });
    }
  };













  //SIN USO PARA EL MVP
  static eliminarRecetas = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await recetaMode.eliminarRecetas(id);
      if (!result) {
        return res.status(400).json({ message: "no se encontro la receta" });
      }
      res.status(201).json(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "error al eliminar las recetas" });
    }
  };

  static actualizarReceta = async (req, res) => {
    const { id } = req.params;
    try {
      const vali = validateReceta(req.body);
      const result = await recetaMode.actualizarRecetas(vali.data, id);
      if (!result) {
        return res.status(400).json({ message: "no se encontro la receta" });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "error al actualizar las recetas" });
    }
  };
}
