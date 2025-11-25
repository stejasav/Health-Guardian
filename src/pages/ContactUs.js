import { useEffect } from "react";
import Navbar from "../components/Navbar";
import ContactUsComp from "../components/ContactUsComp";

export default function ContactUs() {
  
  useEffect(() => {
    document.title = "Contact Us | Health Guardian";
  }, []);

  return (
    <div className="page">
      <Navbar />
      <ContactUsComp />
    </div>
  );
}
