
import pool from "../db/db.js";

export class modelUsuarios{
    static obtenerRecetasUsuario = async (id) =>{
        try {
            const query = 
            `SELECT u.nombre,r.nombre,r.descripcion,r.imagen_url,r.pais_id FROM recetas_usuario_tb d
                INNER JOIN users_tb u ON d.user_id  = u.user_id 
                INNER JOIN recetas_tb  r ON d.receta_id = r.receta_id
                WHERE user_id = $1`;

            const {result} = await pool.query(query,[id]);
            return result;
        } catch (error) {
            console.log(error.message);
            throw new Error("error al obtener recetas del usuario en la DB");
        }
    }

    static crearRecetaUsuario = async (receta_id,user_id) =>{
        try {
            const query = 'INSERT INTO recetas_usuario_tb(receta_id,user_id) VALUES ($1,$2) RETURNING * ';

            const {result} = await pool.query(query,[receta_id,user_id]);

            return result[0];
        } catch (error) {
            console.log(error.message);
            throw new Error("error al crear  recetas del usuario en la DB");
        }
    }

    static eliminarRecetaUsuario = async (user_id,receta_id) =>{
        try {
            const query = 'DELETE FROM recetas_usuario_tb WHERE user_id = $1 AND receta_id = $2';

            const {result} = await pool.query(query,[user_id,receta_id]);
            return result.rowCount; 
        } catch (error) {
            console.log(error.message);
            throw new Error("error al eliminar  recetas del usuario en la DB");
        }
    }
}