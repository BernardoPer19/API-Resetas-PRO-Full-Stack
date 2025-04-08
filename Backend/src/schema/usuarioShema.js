import z from 'zod';

const usuarioSchema= z.object({
   user_id : z.number().positive().int(),
   receta_id:  z.number().positive().int()
});

export const validateUsuario = (data) => {
  const result = usuarioSchema.safeParse(data);

  if (!result.success) {
    return { valid: false, errors: result.error.format() };
  }
  return { valid: true, data: result.data };
}