import { LogOut } from "lucide-react"; // Solo los iconos que usas
import { UserType } from "../../types/UserType";
import { useAuthContext } from "../../hooks/useContext";

interface UserProfileProps {
  user: UserType;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 w-full mx-auto ">
      <div className="flex items-center space-x-6">
        <img
          src={
            user.fotoPerfil ||
            "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
          }
          alt={`${user.nombre}'s profile`}
          className="w-40 h-40 object-cover rounded-full border-4 border-yellow-400"
        />
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-gray-800">{user.nombre}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <time>fecha de creacion: {user.creacionCuenta}</time>
        </div>
      </div>

      {/* Botón Cerrar Sesión */}
      <button
        onClick={handleLogout}
        className="mt-6 flex items-center gap-2 px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
      >
        <LogOut size={16} /> Cerrar Sesión
      </button>
    </div>
  );
};

export default UserProfile;
