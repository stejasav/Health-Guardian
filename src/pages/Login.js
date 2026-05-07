import { useEffect } from "react";
import LoginComp from "../components/LoginComp";

export default function Login() {
  
  useEffect(() => {
    document.title = "Login | Health Guardian";
  }, []);

  return (
    <div className="page">
      <LoginComp />
    </div>
  );
}
