import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
