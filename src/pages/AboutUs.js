import { useEffect } from "react";
import Navbar from "../components/Navbar";
import AboutUsComp from "../components/AboutUsComp";

export default function AboutUs() {
  
  useEffect(() => {
    document.title = "About Us | Health Guardian";
  }, []);

  return (
    <div className="page">
      <Navbar />
      <AboutUsComp />
    </div>
  );
}

