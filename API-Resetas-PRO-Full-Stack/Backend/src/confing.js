export const DB_DATABASE = process.env.DB_DATABASE || "Recetas_DB";
export const DB_USER = process.env.DB_USER || "postgres";
export const DB_PORT = process.env.DB_PORT || 5432;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PASSWORD = process.env.DB_PASSWORD || "mysqlcasa";

export const JWT_PASSWORD_SECRET =
  process.env.JWT_PASSWORD_SECRET || "micontraseñasegurisima";
  export const SALTS_ROUNDS = parseInt(process.env.SALTS_ROUNDS) || 10;

