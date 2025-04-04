import { SALTS_ROUNDS, JWT_PASSWORD_SECRET } from "../confing.js";
import bcrypt from 'bcrypt'
import pool from "../db/db.js";
import jwt from "jsonwebtoken";

export class AuthModel {
  static createToken(user) {
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
    const hashingPassword = await bcrypt.hash(password, SALTS_ROUNDS);
    return hashingPassword;
  }
  
  static async comparePassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw new Error("Error comparing passwords: " + error.message);
    }
  }

  static async registerUser(
    nombre,
    email,
    contraseña,
    fotoPerfil,
    creacionCuenta
  ) {
    try {
      const hashingPassword = await this.hashPassword(contraseña);

      const query = `INSERT INTO users_tb ( nombre, email, "contraseña", "fotoPerfil", "creacionCuenta") 
                     VALUES ($1, $2, $3, $4, $5)`;
      const data = [nombre, email, hashingPassword, fotoPerfil, creacionCuenta];

      const { rows } = await pool.query(query, data);
      return rows;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error al registrar en la DB", error.message);
    }
  }

  static async getUserById(user_id) {
    try {
      const query = `SELECT * FROM users_tb WHERE user_id = $1`;
      const data = [user_id];

      const { rows } = await pool.query(query, data);
      return rows;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error al añadir un usuario en la DB");
    }
  }

  static async verifyByEmail(email) {
    try {
      const query = `SELECT * FROM users_tb WHERE email = $1;`;
      const result = await pool.query(query, [email]);
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      throw new Error("Error verifying email: " + error.message);
    }
  }

}