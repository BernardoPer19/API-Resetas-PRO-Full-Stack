import pool from "../db/db.js";

export class usuarioModel {
  static obtenerRecetaUsuarioModel = async (id) => {
    try {
      const query = `SELECT u.nombre, r.nombre, r.descripcion, r.imagen_url, p.nombre 
                     FROM recetas_usuario_tb d
                     INNER JOIN users_tb u ON d.user_id = u.user_id 
                     INNER JOIN recetas_tb r ON d.receta_id = r.receta_id
                     INNER JOIN pais_tb p ON r.pais_id = p.pais_id
                     WHERE u.user_id = $1`;

      const { rows } = await pool.query(query, [id]);

      return rows;
    } catch (error) {
      console.error(error.message);
      throw new Error("error al obtener datos del usuario en la db");
    }
  };
  static crearRecetaUsuarioModel = async (user_id, receta_id) => {
    try {
      const query = `INSERT INTO recetas_usuario_tb(user_id, receta_id) 
        VALUES ($1, $2) 
        RETURNING *`;
  
      const { rows } = await pool.query(query, [user_id, receta_id]);
  
      return rows[0];
    } catch (error) {
      console.error("Error al insertar en la base de datos:", error); // Aquí mostramos el error real
      throw new Error(`Error al crear la receta del usuario: ${error.message}`);
    }
  };
  

  static eliminarRecetaUsuarioModel = async (user_id, receta_id) => {
    try {
      const query = `
        DELETE FROM recetas_usuario_tb 
        WHERE receta_id = $1 AND user_id = $2
        RETURNING *;
      `;
      console.log("Ejecutando consulta con params:", [receta_id, user_id]);
  
      // Ejecutamos la consulta SQL
      const {  rowCount } = await pool.query(query, [receta_id, user_id]);
  
      console.log("Filas afectadas:", rowCount);
      return rowCount; // Debería devolver 1 si la receta fue eliminada
    } catch (error) {
      console.error("Error al eliminar receta de usuario:", error.message);
      throw new Error("Error al eliminar la receta para el usuario en la base de datos.");
    }
  };
  
}
