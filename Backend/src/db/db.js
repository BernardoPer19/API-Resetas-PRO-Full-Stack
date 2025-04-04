import pg from "pg";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../confing";

const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) =>
    console.error("Error connecting to PostgreSQL database:", err)
  );

export default pool;
