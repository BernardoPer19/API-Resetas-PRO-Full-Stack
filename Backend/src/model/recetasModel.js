import pool from "../db/db.js";

export class recetaMode {
  static obtenerRecetass = async () => {
    try {
      const query = `
      SELECT 
        r.nombre AS receta_nombre, 
        r.descripcion, 
        r.imagen_url, 
        p.nombre AS pais_nombre, 
        d.nombre AS dificultad_nombre, 
        c.nombre AS categoria_nombre, 
        t.nombre AS tipoDia_nombre
      FROM 
        recetas_tb r
      JOIN 
        pais_tb p ON r.pais_id = p.pais_id
      JOIN 
        dificultad_tb d ON r.dificultad_id = d.dificultad_id
      JOIN 
        categorias_tb c ON r.categoria_id = c.categoria_id
      JOIN 
        "tipoDia_tb" t ON r."tipoDia_id" = t."tipoDia_id";
    `;

      const { rows } = await pool.query(query);
      console.log(rows);

      return rows;
    } catch (error) {
      console.error("Error al obtener las recetas:", error.message);
      throw new Error("Error al obtener las recetas en la DB");
    }
  };

  static crearRecetas = async ({
    nombre,
    descripcion,
    pais_id,
    dificultad_id,
    imagen_url,
    tipoDia_id,
    categoria_id,
    comentario_id,
  }) => {
    console.log("Datos recibidos:", {
      nombre,
      descripcion,
      pais_id,
      dificultad_id,
      imagen_url,
      tipoDia_id,
      categoria_id,
      comentario_id,
    });
    try {
      const query = `INSERT INTO recetas_tb(
            nombre, descripcion, pais_id, dificultad_id, imagen_url, "tipoDia_id", categoria_id, comentario_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

      const { rows } = await pool.query(query, [
        nombre,
        descripcion,
        pais_id,
        dificultad_id,
        imagen_url,
        tipoDia_id,
        categoria_id,
        comentario_id,
      ]);

      return rows[0];
    } catch (error) {
      console.error("Error al crear las recetas:", error.message);
      throw new Error(error.message);
    }
  };

  static eliminarRecetas = async (id) => {
    try {
      const query = "DELETE FROM recetas_tb WHERE receta_id = $1";

      const { rows } = await pool.query(query, [id]);

      return rows.rowCount; // Devuelve la cantidad de filas afectadas (debería ser 1 si la receta fue eliminada)
    } catch (error) {
      console.error("Error al eliminar las recetas:", error.message);
      throw new Error("Error al eliminar las recetas en la DB");
    }
  };

  static actualizarRecetas = async (
    {
      nombre,
      descripcion,
      pais_id,
      dificultad_id,
      imagen_url,
      tipoDia_id,
      categoria_id,
      comentario_id,
    },
    id
  ) => {
    try {
      const query = `UPDATE recetas_tb SET 
          nombre = $1, descripcion = $2, pais_id = $3, dificultad_id = $4, 
          imagen_url = $5, tipoDia_id = $6, categoria_id = $7, comentario_id = $8
          WHERE receta_id = $9 RETURNING *`;

      const { rows } = await pool.query(query, [
        nombre,
        descripcion,
        pais_id,
        dificultad_id,
        imagen_url,
        tipoDia_id,
        categoria_id,
        comentario_id,
        id,
      ]);

      if (rows.length === 0) {
        return null; // Si no se encuentra la receta con el ID dado
      }

      return rows[0]; // Devuelve la receta actualizada
    } catch (error) {
      console.error("Error al actualizar las recetas:", error.message);
      throw new Error("Error al actualizar las recetas en la DB");
    }
  };
}
