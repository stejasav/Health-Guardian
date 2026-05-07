import { useEffect } from "react";
import AboutUsComp from "../components/AboutUsComp";

export default function AboutUs() {
  
  useEffect(() => {
    document.title = "About Us | Health Guardian";
  }, []);

  return (
    <div className="page">
      <AboutUsComp />
    </div>
  );
}

