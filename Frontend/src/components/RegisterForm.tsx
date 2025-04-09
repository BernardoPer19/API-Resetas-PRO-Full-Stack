import React from "react";
import { useForm } from "react-hook-form";
import { UserType } from "../types/UserType";
import { useAuthContext } from "../hooks/useContext";
import { Link } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const { register: registerUser, authError } = useAuthContext();

  console.log("AuthError desde el componente:", authError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>();

  const onSubmit = async (data: UserType) => {
    try {
      await registerUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen 0">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Crear Cuenta
        </h2>

        {authError && (
          <div className="mb-4 text-sm text-white font-medium bg-red-700 px-4 py-2 rounded-lg shadow-md">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              {...register("nombre", { required: "El nombre es requerido" })}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-2">
                {errors.nombre.message}
              </p>
            )}
          </div>

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
            Registrarse
          </button>
        </form>
        <p className="my-4">
          Ya tienes una cuenta?{" "}
          <span className="text-cyan-600">
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
