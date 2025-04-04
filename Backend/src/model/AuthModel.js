import { SALTS_ROUNDS, JWT_PASSWORD_SECRET } from "../confing";
import bycript from "bcrypt";
import pool from "../db/db";
import jwt from "jsonwebtoken";

export class UserModel {
  static async createToken(user) {
    try {
      const token = jwt.sign(
        {
          id: user.user_id,
          name: user.user_name,
          email: user.email,
          createAcc: user.createAcc,
        },
        JWT_PASSWORD_SECRET,
        { expiresIn: "24h" }
      );
      return token;
    } catch (error) {
      throw new Error("Error generating token: " + error.message);
    }
  }

  static async hashPassword(password) {
    const hashingPassword = await bycript.hash(password, SALTS_ROUNDS);
    return hashingPassword;
  }
  static async comparePassword(plasPassword, hashPassword) {
    const comparingPasswords = await bycript.compare(
      plasPassword,
      hashPassword
    );
    return comparingPasswords;
  }
  static async registerUser(
    user_id,
    nombre,
    email,
    contraseña,
    fotoPerfil,
    creacionCuenta
  ) {
    try {
      const hashingPassword = this.hashPassword(contraseña);

      const query = `INSERT INTO users_tb (user_id, nombre, email, "contraseña", "fotoPerfil", "creacionCuenta") 
                     VALUES $1, $2, $3, $4, $5,$6`;
      const data = [
        user_id,
        nombre,
        email,
        hashingPassword,
        fotoPerfil,
        creacionCuenta,
      ];

      const { rows } = pool.query(query, data);
      return rows;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error al añadir un usuario en la DB");
    }
  }

  static async getUserById(user_id) {
    try {
      const query = `SELECT * FROM users_tb WHERE user_id = $1`;
      const data = [user_id];

      const { rows } = pool.query(query, data);
      return rows;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error al añadir un usuario en la DB");
    }
  }

  static async getUserByEmail(email) {
    try {
      const query = `SELECT * FROM users_tb WHERE email = $1`;
      const data = [email];

      const { rows } = pool.query(query, data);
      
      if (rows.length === 0) {
        return null;
      }

      return rows[0];
    } catch (error) {
      console.error(error.message);
      throw new Error("Error al añadir un usuario en la DB");
    }
  }
}
