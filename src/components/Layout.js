import { memo, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";

const styles = `
  .hg-layout {
    min-height: 100vh;
    background: #020d0a;
  }

  /* Push content below fixed navbar */
  .hg-layout-content {
    padding-top: 68px;
    position: relative;
  }

  /* ── PAGE TRANSITION ── */
  .hg-page {
    animation: hgPageIn 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes hgPageIn {
    from {
      opacity: 0;
      transform: translateY(16px);
      filter: blur(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0px);
    }
  }

  /* ── BACK TO TOP ── */
  .hg-back-top {
    position: fixed;
    bottom: 100px; /* sits above the chatbot FAB */
    right: 28px;
    width: 42px; height: 42px;
    border-radius: 12px;
    background: rgba(4, 18, 13, 0.9);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(29, 158, 117, 0.25);
    color: rgba(232, 245, 240, 0.6);
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 900;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease,
      border-color 0.2s,
      color 0.2s,
      box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }
  .hg-back-top.hidden {
    opacity: 0;
    pointer-events: none;
    transform: translateY(12px);
  }
  .hg-back-top.visible {
    opacity: 1;
    pointer-events: all;
    transform: translateY(0);
  }
  .hg-back-top:hover {
    border-color: rgba(29, 158, 117, 0.55);
    color: #4ade80;
    box-shadow: 0 6px 24px rgba(29, 158, 117, 0.2);
  }
  .hg-back-top:active { transform: scale(0.93); }
`;

function Layout({ children }) {
  const location = useLocation();
  const [pageKey, setPageKey] = useState(location.pathname);
  const [showTop, setShowTop] = useState(false);
  const prevPath = useRef(location.pathname);

  // Update key on route change to re-trigger animation
  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      prevPath.current = location.pathname;
      setPageKey(location.pathname + Date.now());
      // Scroll to top on navigation
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location]);

  // Back to top visibility
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style>{styles}</style>
      <div className="hg-layout">
        <CustomCursor />
        <Navbar />

        <main className="hg-layout-content">
          {/* key change re-mounts → triggers CSS animation */}
          <div key={pageKey} className="hg-page">
            {children}
          </div>
        </main>

        {/* Back to top */}
        <button
          className={`hg-back-top ${showTop ? "visible" : "hidden"}`}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </>
  );
}

export default memo(Layout);