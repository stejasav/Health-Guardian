import { useEffect } from "react";
import ContactUsComp from "../components/ContactUsComp";

export default function ContactUs() {
  
  useEffect(() => {
    document.title = "Contact Us | Health Guardian";
  }, []);

  return (
    <div className="page">
      <ContactUsComp />
    </div>
  );
}
