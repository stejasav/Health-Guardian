import React, { useState, useRef, useCallback } from "react";

function ChatbotComp() {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef(null);
const [iframeSrc, setIframeSrc] = useState(
  "https://www.chatbase.co/chatbot-iframe/bPf7aGqnYXNiVIVm9D1OU"
);

  // Send chip text into the Chatbase iframe via postMessage
  const handleChipClick = useCallback((text) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        { type: "userMessage", message: text },
        "https://www.chatbase.co"
      );
    }
  }, []);

  return (
    <>
      <style>{`
        .cb-page {
          min-height: 100vh;
          background: #050d0a;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 20px 48px;
          position: relative;
          overflow: hidden;
          font-family: 'Segoe UI', sans-serif;
        }
        .cb-glow {
          position: absolute;
          top: -160px; left: 50%;
          transform: translateX(-50%);
          width: 700px; height: 500px;
          background: radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .cb-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.22);
          border-radius: 999px; padding: 5px 16px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #4ade80; margin-bottom: 18px;
          position: relative; z-index: 1;
        }
        .cb-badge-dot {
          width: 7px; height: 7px; background: #4ade80;
          border-radius: 50%; animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .cb-title {
          font-size: clamp(26px,4vw,40px); font-weight: 800;
          color: #f0faf4; margin: 0 0 10px; text-align: center;
          position: relative; z-index: 1; letter-spacing: -0.5px;
        }
        .cb-title span { color: #4ade80; }
        .cb-subtitle {
          font-size: 14px; color: rgba(240,250,244,0.4);
          text-align: center; max-width: 400px;
          margin: 0 auto 36px; line-height: 1.65;
          position: relative; z-index: 1;
        }
        .cb-card {
          width: 100%; max-width: 820px;
          background: rgba(8,20,13,0.9);
          border: 1px solid rgba(34,197,94,0.14);
          border-radius: 22px; overflow: hidden;
          position: relative; z-index: 1;
          box-shadow: 0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(34,197,94,0.04);
        }
        .cb-topbar {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background: rgba(12,28,18,0.95);
          border-bottom: 1px solid rgba(34,197,94,0.1);
        }
        .cb-topbar-left { display: flex; align-items: center; gap: 11px; }
        .cb-topbar-name { font-size: 14px; font-weight: 700; color: #e8f5ee; }
        .cb-topbar-status {
          font-size: 11px; color: #4ade80;
          display: flex; align-items: center; gap: 4px; margin-top: 2px;
        }
        .cb-status-dot {
          width: 6px; height: 6px; background: #4ade80;
          border-radius: 50%; animation: blink 2s ease-in-out infinite;
        }
        .cb-dots { display: flex; gap: 6px; }
        .cb-dot { width: 11px; height: 11px; border-radius: 50%; }
        .cb-iframe-wrap {
          position: relative; height: 560px; background: #050d0a;
        }
        .cb-loader {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 14px;
          background: #050d0a; z-index: 2;
          transition: opacity 0.4s ease;
        }
        .cb-loader.hidden { opacity: 0; pointer-events: none; }
        .cb-ring {
          width: 36px; height: 36px;
          border: 2px solid rgba(74,222,128,0.12);
          border-top-color: #4ade80; border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .cb-loader-text { font-size: 13px; color: rgba(240,250,244,0.3); }
        .cb-iframe { width: 100%; height: 100%; border: none; display: block; }
        .cb-footer {
          padding: 11px 20px;
          background: rgba(12,28,18,0.9);
          border-top: 1px solid rgba(34,197,94,0.08);
          display: flex; align-items: center; justify-content: space-between;
        }
        .cb-footer-hint {
          font-size: 11px; color: rgba(240,250,244,0.22);
          display: flex; align-items: center; gap: 5px;
        }
        .cb-footer-hint kbd {
          background: rgba(74,222,128,0.07);
          border: 1px solid rgba(74,222,128,0.15);
          border-radius: 4px; padding: 1px 5px;
          font-size: 11px; color: rgba(74,222,128,0.55); font-family: inherit;
        }
        .cb-footer-brand { font-size: 11px; color: rgba(240,250,244,0.15); }

        /* ── CHIPS ── */
        .cb-chips-section {
          margin-top: 26px; width: 100%; max-width: 820px;
          position: relative; z-index: 1;
        }
        .cb-chips-label {
          font-size: 11px; color: rgba(240,250,244,0.28);
          text-transform: uppercase; letter-spacing: 0.1em;
          font-weight: 700; margin-bottom: 11px;
        }
        .cb-chips { display: flex; flex-wrap: wrap; gap: 9px; }
        .cb-chip {
          background: transparent;
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 999px; padding: 8px 16px;
          font-size: 13px; color: rgba(240,250,244,0.55);
          cursor: pointer; transition: all 0.2s ease;
          display: flex; align-items: center; gap: 6px;
          font-family: inherit;
          position: relative; overflow: hidden;
        }
        .cb-chip::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(34,197,94,0.08);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cb-chip:hover {
          border-color: rgba(34,197,94,0.45);
          color: #4ade80;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(34,197,94,0.12);
        }
        .cb-chip:hover::before { opacity: 1; }
        .cb-chip:active { transform: translateY(0); }
        .cb-chip-hint {
          font-size: 10px; color: rgba(240,250,244,0.2);
          margin-top: 10px; text-align: center;
          width: 100%;
        }

        @media (max-width:600px) {
          .cb-page { padding: 40px 14px 36px; }
          .cb-iframe-wrap { height: 460px; }
          .cb-footer { flex-direction: column; gap: 6px; }
        }
      `}</style>

      <div className="cb-page">
        <div className="cb-glow" />

        <div className="cb-badge">
          <span className="cb-badge-dot" />
          AI Health Assistant
        </div>

        <h1 className="cb-title">
          Ask <span>Health Guardian</span>
        </h1>

        <p className="cb-subtitle">
          Describe your symptoms, ask health questions, or get guidance on when to see a doctor.
        </p>

        <div className="cb-card">
          {/* Top bar */}
          

          {/* Iframe */}
          <div className="cb-iframe-wrap">
            <div className={`cb-loader${loaded ? " hidden" : ""}`}>
              <div className="cb-ring" />
              <span className="cb-loader-text">Connecting to Health Guardian AI…</span>
            </div>
           <iframe
              ref={iframeRef}
              src="https://www.chatbase.co/chatbot-iframe/bPf7aGqnYXNiVIVm9D1OU"
              width="100%"
              style={{ height: "100%", minHeight: "560px", border: "none", display: "block" }}
              frameBorder="0"
               allow="microphone"
               onLoad={() => setLoaded(true)}
              className="cb-iframe"
/>
          </div>

          {/* Footer */}
          <div className="cb-footer">
            <div className="cb-footer-hint">
              Press <kbd>Enter</kbd> to send &nbsp;·&nbsp;{" "}
              <kbd>Shift+Enter</kbd> for new line
            </div>
            <div className="cb-footer-brand">Powered by Chatbase</div>
          </div>
        </div>

        {/* Suggestion chips */}
        <div className="cb-chips-section">
          <div className="cb-chips-label">Try asking</div>
          <div className="cb-chips">
            {[
              { icon: "🤒", text: "I have a fever and headache" },
              { icon: "💊", text: "Medications for common cold?" },
              { icon: "🏥", text: "When should I see a doctor?" },
              { icon: "🩺", text: "Symptoms of diabetes" },
              { icon: "💧", text: "Home remedies for sore throat" },
              { icon: "❤️", text: "Tips for a healthy heart" },
            ].map((c) => (
              <button
                key={c.text}
                className="cb-chip"
                onClick={() => handleChipClick(c.text)}
                title={`Click to ask: ${c.text}`}
              >
                {c.icon} {c.text}
              </button>
            ))}
          </div>
          <div className="cb-chip-hint">
            💡 Click any suggestion above to send it directly to the AI
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatbotComp;