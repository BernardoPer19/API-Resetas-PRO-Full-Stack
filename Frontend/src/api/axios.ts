// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/auth",
  withCredentials: true, // útil si usas cookies
});

export default instance;
