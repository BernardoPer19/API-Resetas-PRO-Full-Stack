import pool from '../db/db.js'

export class recetaMode{
    static obtenerRecetas = async () =>{
        try {
            const query = 'SELECT * FROM recetas_tb';

            const {result} = await pool.query(query);
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error("error al obtener las recetas en la db");
        }
    }

    static crearRecetas = async ({nombre,descripcion,pais_id,dificultad_id,imagen_url,tipoDia_id,categoria_id,comentario_id}) =>{
        try {
            const query = `INSERT INTO recetas_tb(nombre,descripcion,pais_id,dificultad_id,imagen_url,tipoDia_id,categoria_id,comentario_id)
                            VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;

            const {result} = await pool.query(query,[nombre,descripcion,pais_id,dificultad_id,imagen_url,tipoDia_id,categoria_id,comentario_id]);
            return result[0];
        } catch (error) {
            console.error(error.message);
            throw new Error("error al crear las recetas en la db");
        }
    }

    static eliminarRecetas = async (id) =>{
        try {
            const query = 'DELETE FROM recetas_tb WHERE recetas_id = $1';

            const {result} = await pool.query(query,[id]);
            return result.rowCount;
        } catch (error) {
            console.error(error.message);
            throw new Error("error al eliminar las recetas en la db");
        }
    }
    
    static actualizarRecetas = async ({nombre,descripcion,pais_id,dificultad_id,imagen_url,tipoDia_id,categoria_id,comentario_id},id) =>{
        try {
            const query = `UPDATE recetas_tb SET nombre = $1,descripcion = $2,pais_id= $3,dificultad_id= $4,imagen_url= $5,tipoDia_id= $6,
                        categoria_id= $7,comentario_id= $8 WHERE receta_id = $9 RETURNING*`;

            const {result} = await pool.query(query[nombre,descripcion,pais_id,dificultad_id,imagen_url,tipoDia_id,categoria_id,comentario_id,id]);
            if(result.length === 0){return null}
            return result[0];
        } catch (error) {
            console.error(error.message);
            throw new Error("error al actualizar las recetas en la db");
        }
    }
}