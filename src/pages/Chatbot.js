import { useEffect } from "react";
import Navbar from "../components/Navbar";
import ChatbotComp from "../components/ChatbotComp";

export default function Chatbot() {
  useEffect(() => {
    document.title = "Chatbot | Health Guardian";
  }, []);

  return (
    <div className="page">
      <Navbar />
      <ChatbotComp />
    </div>
  );
}
