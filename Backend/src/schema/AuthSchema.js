import { z } from "zod";

// Esquema para validar el registro de usuarios
const registerSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres."),
  email: z.string().email("Debe ser un correo electrónico válido."),
  contraseña: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
  fotoPerfil: z.string().optional(),
  creacionCuenta: z.string(),
});

const loginSchema = z.object({
  email: z.string().email("Debe ser un correo electrónico válido."),
  contraseña: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export const validateRegister = (data) => {
  const result = registerSchema.safeParse(data);
  console.log(result);

  if (!result.success) {
    return { valid: false, errors: result.error.format() };
  }
  return { valid: true, data: result.data };
};

export const validateLogin = (data) => {
  const result = loginSchema.safeParse(data);
  
  if (!result.success) {
    return { valid: false, errors: result.error.format() };
  }
  return { valid: true, data: result.data };
};
