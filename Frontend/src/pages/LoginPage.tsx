import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuthContext } from "../hooks/useContext";
import { useEffect } from "react";

function LoginPage() {
  const { isAuthenticated } = useAuthContext();
  console.log(isAuthenticated);
  
  const naviagte = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      naviagte("/");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
