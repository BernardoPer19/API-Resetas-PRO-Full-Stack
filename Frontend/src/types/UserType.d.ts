export interface UserType {
  user_id: string;
  nombre: string;
  contraseña: string;
  email: string;
  fotoPerfil?: string;
  creacionCuenta: string;
}

export type UserLoginType = Omit<UserType, "creacionCuenta", user_name>;
export type UserRegisterType = Omit<UserType, fotoPerfil>;
