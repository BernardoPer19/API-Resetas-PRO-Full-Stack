import UserProfile from "../components/UI/UserProfile";
import UserRecipesList from "../components/UserRecipesList";
import { useAuthContext } from "../hooks/useContext";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <div>No estás autenticado, por favor inicia sesión.</div>;
  }

  return (
    <main className="min-h-screen max-w-[1280px] m-auto  py-16 px-6">
      <div className="max-w-[1280px] mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
          Perfil del Usuario
        </h1>

        <UserProfile user={user} />
      </div>

      <h1 className="text-5xl font-semibold text-center p-10">Tus Recetas</h1>
      <UserRecipesList />
    </main>
  );
};

export default ProfilePage;
