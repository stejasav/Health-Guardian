import { useEffect } from "react";
import ChatbotComp from "../components/ChatbotComp";

export default function Chatbot() {
  useEffect(() => {
    document.title = "Chatbot | Health Guardian";
  }, []);

  return (
    <div className="page">
      <ChatbotComp />
    </div>
  );
}
