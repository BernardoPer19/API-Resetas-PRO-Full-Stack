
import pool from "../db/db.js";



export class recetaModel{
    static obtenerRecetas = async () =>{
        try {
            const query = 'SELECT * FROM recetas_tb';
            const {result}  = await pool.query(query);
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error("error al obtener los datos en la DB");
        }
    }

    
    static crearRecetas = async (
        {nombre,descripcion,pais_id,dificultad_id,imagen_url,tipoDia_id,categoria_id,comentario_id}) =>{
        try {
            const query = 
            `INSERT INTO recetas_tb({"nombre","descripcion","pais_id","dificultad_id",
            "imagen_url","tipoDia_id","categoria_id","comentario_id")
            VALUES($1,$2,$3,$4,$5,$6;$7,$8) RETURNING * `;



            const {rows} = await pool.query(query,[nombre,descripcion,pais_id,dificultad_id,imagen_url,tipoDia_id,categoria_id,comentario_id])
            return rows[0];
        } catch (error) {
            console.error(error.message);
            throw new Error("error al crear los datos en la DB");
        }
    } 

    static deleteReceta = async (id) =>{
        try {
            const query = 'DELETE FROM recetas_tb WHERE receta_id = $1';
            const {result} = await pool.query(query,[id]);

            return result.rowCount;
        } catch (error) {
            console.error(error.message);
            throw new Error("error al eliminar una receta en la DB");
        }
    }

    static mejorarReceta = async (
        {nombre,descripcion,dificultad_id,imagen_url,tipoDia_id,categoria_id,comentario_id},id) =>{
        try {
            const query = `UPDATE recetas_tb SET nombre = $1,descripcion = $2, dificultad_id = $3,imagen_url = $4,
            tipoDia_id = $5 ,categoria_id = $6, comentario_id  = $7 WHERE receta_id = $8`; 

            const {rows} = await pool.query(query,[nombre,descripcion,dificultad_id,imagen_url,tipoDia_id,categoria_id,comentario_id,id]);

            if(rows.length === 0){
                return null;
            }
            return rows[0];
        } catch (error) {
            console.error(error.message);
            throw new Error("error al mejorar una receta en la DB");
        }
    }
}