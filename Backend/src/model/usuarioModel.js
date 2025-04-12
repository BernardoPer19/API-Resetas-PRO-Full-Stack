import pool from "../db/db.js";

export class usuarioModel {
  static obtenerRecetaUsuarioModel = async (id) => {
    try {
      const query = `SELECT 
                      u.nombre AS user_nombre,      
                      r.nombre AS receta_nombre,    
                      r.descripcion, 
                      r.imagen_url, 
                      p.nombre AS pais_nombre      
                      FROM recetas_usuario_tb d
                      INNER JOIN users_tb u ON d.user_id = u.user_id 
                      INNER JOIN recetas_tb r ON d.receta_id = r.receta_id
                      INNER JOIN pais_tb p ON r.pais_id = p.pais_id
                      WHERE u.user_id = $1;`;

      const { rows } = await pool.query(query, [id]);

      return rows;
    } catch (error) {
      console.error(error.message);
      throw new Error("error al obtener datos del usuario en la db");
    }
  };

  static verificarRecetaExistente = async (user_id, receta_id) => {
    try {
      const query = `
        SELECT 1 
        FROM recetas_usuario_tb
        WHERE user_id = $1 AND receta_id = $2;
      `;

      const { rows } = await pool.query(query, [user_id, receta_id]);

      if (rows.length > 0) {
        return true; 
      }

      return false;
    } catch (error) {
      console.error("Error al verificar la receta:", error.message);
      throw new Error("Error al verificar la receta en la base de datos.");
    }
  };

  static obtenerRecetaPorId = async (receta_id) => {
    try {
      const query = `SELECT 
                        r.nombre AS receta_nombre,
                        r.descripcion,
                        r.imagen_url,
                        p.nombre AS pais_nombre
                      FROM recetas_tb r
                      INNER JOIN pais_tb p ON r.pais_id = p.pais_id
                      WHERE r.receta_id = $1;`;

      const { rows } = await pool.query(query, [receta_id]);

      if (rows.length === 0) {
        return null;
      }

      return rows[0];
    } catch (error) {
      console.error("Error al obtener la receta:", error.message);
      throw new Error("Error al obtener la receta de la base de datos.");
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
      console.error("Error al insertar en la base de datos:", error);
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
      const { rowCount } = await pool.query(query, [receta_id, user_id]);

      console.log("Filas afectadas:", rowCount);
      return rowCount; // Debería devolver 1 si la receta fue eliminada
    } catch (error) {
      console.error("Error al eliminar receta de usuario:", error.message);
      throw new Error(
        "Error al eliminar la receta para el usuario en la base de datos."
      );
    }
  };
}
