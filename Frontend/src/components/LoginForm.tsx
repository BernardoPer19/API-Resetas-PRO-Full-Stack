import React from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../hooks/useContext";
import { UserLoginType } from "../types/UserType";

const LoginForm: React.FC = () => {
  const { login: loginUser, authError } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginType>();

  const onSubmit = async (data: UserLoginType) => {
    try {
      await loginUser(data);
    } catch (err) {
      console.error("Error al hacer login:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Iniciar Sesión
        </h2>

        {authError && (
          <div className="mb-4 text-sm text-white font-medium bg-red-700 px-4 py-2 rounded-lg shadow-md">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Correo
            </label>
            <input
              type="email"
              {...register("email", {
                required: "El correo es requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de correo inválido",
                },
              })}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              {...register("contraseña", {
                required: "La contraseña es requerida",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            {errors.contraseña && (
              <p className="text-red-500 text-sm mt-2">
                {errors.contraseña.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
