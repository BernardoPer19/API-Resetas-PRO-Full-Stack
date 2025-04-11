import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useContext";
import { useEffect } from "react";
import LoginForm from "../components/Auth/LoginForm";

function LoginPage() {
  const { isAuthenticated } = useAuthContext();
  console.log(isAuthenticated);
  
  const naviagte = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      naviagte("/profile");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
