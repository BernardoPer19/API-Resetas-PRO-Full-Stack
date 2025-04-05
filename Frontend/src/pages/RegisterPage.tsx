import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useContext";

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
