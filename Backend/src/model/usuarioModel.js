import pool from "../db/db.js";

export class usuarioModel{
    static obtenerUsuario = async (id) =>{
        try {
            const query = `SELECT u.nombre,r.nombre,r.descripcion,r.imagen_url,r.pais_id FROM recetas_usuario_tb d
                INNER JOIN users_tb u ON d.user_id  = u.user_id 
                INNER JOIN recetas_tb  r ON d.receta_id = r.receta_id
                WHERE user_id = $1`;

            const {result} = await pool.query(query,[id])
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error("error al obtener datos del usuario en la db");   
        }
    }

    static crearUsuario = async (user_id,receta_id) =>{
        try {
            const query = `INSERT INTO recetas_usuario_tb(user_id,receta_id) VALUES ($1,$2)`;

            const {result} = await pool.query(query,[user_id,receta_id])
            return result[0];
        } catch (error) {
            console.error(error.message);
            throw new Error("error al obtener datos del usuario en la db");   
        }
    }

    static eiminarUsuario = async (id,user_id) =>{
        try {
            const query = `DELETE FROM recetas_usuario_tb WHERE recetas_usuario_id = $1 AND  user_id = $2`;

            const {result} = await pool.query(query,[id,user_id])
            return result.rowCount;
        } catch (error) {
            console.error(error.message);
            throw new Error("error al obtener datos del usuario en la db");   
        }
    }
}