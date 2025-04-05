import z from 'zod';

const recetaSchema = z.object({
    nombre : z.string().min(3,'la receta debe tener al menos 6 caracteres.'),
    descripcion: z.string().min(3, 'la descripcion debe tener 3 caracteres'),
    pais_id: z.number().positive().int(),
    dificultad_id: z.number().positive().int(),
    imagen_url: z.string().min(3,'la imagen debe tener mas caracteres'),
    tipoDia_id: z.number().positive().int(),
    categoria_id : z.number().positive().int(),
    comentario_id : z.number().positive().int()
})

export const vaidarReceta = (input) =>{
    const res =  recetaSchema.safeParse(input);
    if(!res.success){
        return { valid: false, errors: res.error.format() };
    }
    return { valid: true, data: res.data };
}
