import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <style>{`
            .hg-error-wrapper {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: radial-gradient(circle at 30% 30%, #0d3d2a, #020d0a 70%);
              font-family: 'DM Sans', sans-serif;
              color: #e8f5f0;
              padding: 2rem;
            }

            .hg-error-card {
              background: rgba(13, 40, 28, 0.6);
              border: 1px solid rgba(29,158,117,0.25);
              border-radius: 24px;
              padding: 3rem 2.5rem;
              text-align: center;
              max-width: 420px;
              width: 100%;
              backdrop-filter: blur(16px);
              box-shadow: 0 20px 60px rgba(0,0,0,0.6);
              animation: fadeUp 0.6s ease;
            }

            .hg-error-icon {
              width: 70px;
              height: 70px;
              margin: 0 auto 1.5rem;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: radial-gradient(circle, rgba(74,222,128,0.25), transparent);
              box-shadow: 0 0 30px rgba(74,222,128,0.4);
              color: #4ade80;
            }

            .hg-error-heading {
              font-size: 1.5rem;
              font-weight: 600;
              margin-bottom: 0.5rem;
            }

            .hg-error-message {
              font-size: 0.95rem;
              color: rgba(232,245,240,0.6);
              margin-bottom: 2rem;
            }

            .hg-btn {
              display: inline-block;
              padding: 12px 26px;
              border-radius: 50px;
              border: none;
              cursor: pointer;
              font-size: 0.9rem;
              font-weight: 500;
              margin: 0 6px;
              transition: all 0.2s ease;
            }

            .hg-btn-primary {
              background: linear-gradient(135deg, #1d9e75, #0f6e56);
              color: white;
              box-shadow: 0 6px 20px rgba(29,158,117,0.4);
            }

            .hg-btn-primary:hover {
              transform: translateY(-2px);
              box-shadow: 0 10px 30px rgba(29,158,117,0.5);
            }

            .hg-btn-ghost {
              background: transparent;
              border: 1px solid rgba(232,245,240,0.2);
              color: rgba(232,245,240,0.7);
            }

            .hg-btn-ghost:hover {
              border-color: #4ade80;
              color: #4ade80;
            }

            @keyframes fadeUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          <div className="hg-error-wrapper">
            <div className="hg-error-card">
              
              {/* ICON */}
              <div className="hg-error-icon">
                ⚠️
              </div>

              {/* TEXT */}
              <h2 className="hg-error-heading">
                Something went wrong
              </h2>

              <p className="hg-error-message">
                Our AI system encountered an unexpected issue. 
                Please refresh or try again.
              </p>

              {/* BUTTONS */}
              <div>
                <button
                  className="hg-btn hg-btn-primary"
                  onClick={() => window.location.reload()}
                >
                  🔄 Refresh
                </button>

                <button
                  className="hg-btn hg-btn-ghost"
                  onClick={() => (window.location.href = "/")}
                >
                  🏠 Home
                </button>
              </div>

            </div>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}