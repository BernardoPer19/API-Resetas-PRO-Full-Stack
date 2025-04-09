import { Pencil, Users, Heart, LogOut } from "lucide-react"; // Íconos de acciones
import { useAuthContext } from "../hooks/useContext";

interface UserProfileProps {
  name: string;
  bio: string;
  image: string;
  recipesCount: number;
  followers: number;
  following: number;
}

const UserProfile = ({
  name,
  bio,
  image,
  recipesCount,
  followers,
  following,
}: UserProfileProps) => {
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
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 w-full mx-auto max-w-md">
      <div className="flex items-center space-x-6">
        <img
          src={image}
          alt={`${name}'s profile`}
          className="w-40 h-40 object-cover rounded-full border-4 border-yellow-400"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">{bio}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">
              {recipesCount}
            </p>
            <p className="text-sm text-gray-500">Recetas</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">{followers}</p>
            <p className="text-sm text-gray-500">Seguidores</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">{following}</p>
            <p className="text-sm text-gray-500">Siguiendo</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
          <Users size={16} /> Seguir
        </button>
      </div>

      <div className="mt-4 flex gap-4">
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
          <Pencil size={16} /> Editar Perfil
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition">
          <Heart size={16} /> Me Gusta
        </button>
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
