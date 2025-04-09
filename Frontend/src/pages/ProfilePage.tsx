import UserProfile from "../components/UserProfile"; // Asegúrate de tener la ruta correcta

const ProfilePage = () => {
  return (
    <main className="min-h-screen bg-[#f5f5f5] py-16 px-6">
      <div className="max-w-[1280px] mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
          Perfil del Usuario
        </h1>

        {/* Datos falsos para el perfil */}
        <UserProfile
          name="Juan Pérez"
          bio="Amante de la cocina y la gastronomía. Aquí comparto mis recetas favoritas."
          image="https://randomuser.me/api/portraits/men/1.jpg"
          recipesCount={15}
          followers={200}
          following={180}
        />
      </div>
    </main>
  );
};

export default ProfilePage;
