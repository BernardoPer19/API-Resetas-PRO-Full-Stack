import z from 'zod';

const usuarioSchema= z.object({
   user_id : z.number().positive().int(),
   receta_id:  z.number().positive().int()
});

export const validateUsuario = (data) => {
  const result = usuarioSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.format();
    return { valid: false, errors }; 
  }
  return { valid: true, data: result.data };
};