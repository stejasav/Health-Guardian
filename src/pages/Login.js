import { useEffect } from "react";
import LoginComp from "../components/LoginComp";
import Navbar from "../components/Navbar";

export default function Login() {
  
  useEffect(() => {
    document.title = "Login | Health Guardian";
  }, []);

  return (
    <div className="page">
      <Navbar />
      <LoginComp />
    </div>
  );
}
