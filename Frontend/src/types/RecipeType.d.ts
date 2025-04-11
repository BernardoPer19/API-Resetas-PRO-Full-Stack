export interface RecipeType {
  receta_id: number;
  receta_nombre: string;
  descripcion: string;
  imagen_url: string;
  pais_nombre: string;
  dificultad_nombre: string;
  categoria_nombre: string;
  tipodia_nombre: string;
}
export type RecipeDisplayType = Omit<RecipeType, "tipodia_nombre">;


export interface UserRecipeType {
  receta_nombre:string;
  descripcion: string;
  pais_nombre: string;
  imagen_url:string
}