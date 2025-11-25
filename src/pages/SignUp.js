import { useEffect } from "react";
import Navbar from "../components/Navbar";
import SignupComp from "../components/SignupComp";

export default function SignUp() {

  useEffect(() => {
    document.title = "Signup | Health Guardian";
  }, []);

  return (
    <div className="page">
      <Navbar />
      <SignupComp />
    </div>
  );
}
