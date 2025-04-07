import z from 'zod';

 const recetasSchema= z.object({
    nombre: z.string().min(3,"necesita al menos 3 caracteres"),
    descripcion:z.string().min(3, "necesita al menos 3 caracteres"),
    pais_id:z.number().positive().int(),
    difiultad_id: z.number().positive().int(),
    imagen_url:z.string(),
    tipoDia_id: z.number().positive().int(),
    categoria_id: z.number().positive().int(),
    comentario_id: z.number().positive().int()
});

export const validateReceta = (data) => {
  const result = recetasSchema.safeParse(data);

  if (!result.success) {
    return { valid: false, errors: result.error.format() };
  }
  return { valid: true, data: result.data };
};