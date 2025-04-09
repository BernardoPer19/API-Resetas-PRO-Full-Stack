import { usuarioModel } from "../model/usuarioModel.js";
import { validateUsuario } from "../schema/usuarioShema.js";

export class usuarioController{
    static obtenerRecetaUsuario  = async (req,res) =>{
        const user_id = req.user.id;
        try {
            const result = await usuarioModel.obtenerUsuario(user_id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las recetas del usuario", error });
        }
    }


    static  crearRecetaUsuario = async (req,res) =>{
        const user_id = req.user.id;
        try {
            const vali = validateUsuario(req.body);
            if(!vali.valid){
                return res.status(400).json({message : "receta de usuario no validada"})
            }

            const result = await usuarioModel.crearUsuario(vali.data,user_id)
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: "Error al crear la receta del usuario", error });
        }
    }

    static eliminarRecetaUsuario = async (req,res) =>{
        const user_id = req.user.id;
        try {
            const {receta_id} = req.body;

            if(!receta_id){
                return res.status(400).json({message : "receta_id es requerida"});
            }
            const result = await usuarioModel.eiminarUsuario(user_id,receta_id);

            if(!result){
                return res.status(400).json({message: "receta no encontrada del usuario"});
            }

            res.status(200).json({message: "receta eliminada con exito"});
        } catch (error) {
             res.status(500).json({ message: "Error al eliminar la receta del usuario", error });
        }
    }
}