import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useContext";
import RegisterForm from "../components/Auth/RegisterForm";

function RegisterPage() {
  const { isAuthenticated } = useAuthContext();
  const naviagte = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      naviagte("/");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
