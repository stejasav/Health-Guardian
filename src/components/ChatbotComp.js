import React from "react";

export default function ChatbotComp() {
  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="pulse-dot"></div>
        <h2 className="chatbot-title">Health Guardian AI</h2>
      </div>

      <iframe
        src="https://www.chatbase.co/chatbot-iframe/bPf7aGqnYXNiVIVm9D1OU"
        width="100%"
        frameborder="0"
        title="Health Guardian Chatbot"
        className="chatbot-frame"
        allow="microphone *"
      />
    </div>
  );
}
