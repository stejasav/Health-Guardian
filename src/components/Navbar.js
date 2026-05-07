import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  /* ── NAVBAR ── */
  .hg-navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    padding: 0 2rem;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.4s ease, backdrop-filter 0.4s ease,
                box-shadow 0.4s ease, border-color 0.4s ease;
    border-bottom: 1px solid transparent;
    font-family: 'DM Sans', sans-serif;
  }

  .hg-navbar.scrolled {
    background: rgba(2, 13, 10, 0.88);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom-color: rgba(29, 158, 117, 0.15);
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.35);
  }

  /* ── SCROLL PROGRESS ── */
  .hg-progress-bar {
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: linear-gradient(to right, #1d9e75, #4ade80);
    z-index: 1001;
    transition: width 0.1s linear;
    box-shadow: 0 0 8px rgba(74, 222, 128, 0.5);
  }

  /* ── LOGO ── */
  .hg-nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex-shrink: 0;
  }
  .hg-nav-logo img {
    height: 36px;
    width: auto;
    object-fit: contain;
    filter: brightness(1.1);
    transition: filter 0.2s;
  }
  .hg-nav-logo:hover img { filter: brightness(1.3) drop-shadow(0 0 8px rgba(74,222,128,0.4)); }

  /* ── DESKTOP LINKS ── */
  .hg-nav-links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    list-style: none;
  }
  @media(max-width: 820px) { .hg-nav-links { display: none; } }

  .hg-nav-link {
    position: relative;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 400;
    color: rgba(232, 245, 240, 0.6);
    padding: 6px 14px;
    border-radius: 8px;
    transition: color 0.2s, background 0.2s;
    white-space: nowrap;
  }
  .hg-nav-link::after {
    content: '';
    position: absolute;
    bottom: 2px; left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 16px; height: 1.5px;
    background: #1d9e75;
    border-radius: 2px;
    transition: transform 0.25s ease;
  }
  .hg-nav-link:hover {
    color: #e8f5f0;
    background: rgba(29, 158, 117, 0.08);
  }
  .hg-nav-link:hover::after { transform: translateX(-50%) scaleX(1); }
  .hg-nav-link.active {
    color: #4ade80;
    background: rgba(29, 158, 117, 0.1);
  }
  .hg-nav-link.active::after { transform: translateX(-50%) scaleX(1); }

  /* ── AUTH BUTTONS ── */
  .hg-nav-auth {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  @media(max-width: 820px) { .hg-nav-auth { display: none; } }

  .hg-nav-login {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 400;
    color: rgba(232, 245, 240, 0.6);
    background: transparent;
    border: 1px solid rgba(232, 245, 240, 0.12);
    border-radius: 50px;
    padding: 7px 20px;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
    display: inline-flex;
    align-items: center;
  }
  .hg-nav-login:hover {
    border-color: rgba(29, 158, 117, 0.4);
    color: #4ade80;
  }

  .hg-nav-signup {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: #fff;
    background: linear-gradient(135deg, #1d9e75 0%, #0f6e56 100%);
    border: none;
    border-radius: 50px;
    padding: 8px 20px;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 4px 14px rgba(29, 158, 117, 0.3);
  }
  .hg-nav-signup:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(29, 158, 117, 0.4);
  }

  /* ── HAMBURGER ── */
  .hg-ham-btn {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    transition: background 0.2s;
    z-index: 1100;
  }
  .hg-ham-btn:hover { background: rgba(29, 158, 117, 0.08); }
  @media(max-width: 820px) { .hg-ham-btn { display: flex; } }

  .hg-ham-line {
    width: 22px; height: 1.5px;
    background: rgba(232, 245, 240, 0.7);
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
    transform-origin: center;
  }
  .hg-ham-btn.open .hg-ham-line:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .hg-ham-btn.open .hg-ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hg-ham-btn.open .hg-ham-line:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  /* ── MOBILE DRAWER ── */
  .hg-drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 1050;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s ease;
  }
  .hg-drawer-overlay.open {
    opacity: 1;
    pointer-events: all;
  }

  .hg-drawer {
    position: fixed;
    top: 0; right: 0;
    width: min(320px, 85vw);
    height: 100vh;
    background: rgba(4, 18, 13, 0.97);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-left: 1px solid rgba(29, 158, 117, 0.15);
    z-index: 1100;
    display: flex;
    flex-direction: column;
    padding: 0;
    transform: translateX(100%);
    transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -16px 0 60px rgba(0, 0, 0, 0.4);
  }
  .hg-drawer.open { transform: translateX(0); }

  .hg-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(29, 158, 117, 0.1);
  }
  .hg-drawer-logo img { height: 30px; width: auto; }

  .hg-drawer-close {
    width: 34px; height: 34px;
    border-radius: 10px;
    background: rgba(232, 245, 240, 0.05);
    border: 1px solid rgba(232, 245, 240, 0.08);
    color: rgba(232, 245, 240, 0.5);
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, color 0.2s;
  }
  .hg-drawer-close:hover {
    background: rgba(244, 63, 94, 0.1);
    border-color: rgba(244, 63, 94, 0.2);
    color: #f43f5e;
  }

  .hg-drawer-nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    gap: 4px;
    overflow-y: auto;
  }

  .hg-drawer-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 13px 16px;
    border-radius: 12px;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 400;
    color: rgba(232, 245, 240, 0.65);
    transition: background 0.2s, color 0.2s, transform 0.2s;
    border: 1px solid transparent;
  }
  .hg-drawer-link:hover {
    background: rgba(29, 158, 117, 0.08);
    color: #e8f5f0;
    transform: translateX(4px);
  }
  .hg-drawer-link.active {
    background: rgba(29, 158, 117, 0.1);
    border-color: rgba(29, 158, 117, 0.2);
    color: #4ade80;
  }
  .hg-drawer-link-icon { font-size: 16px; flex-shrink: 0; }

  .hg-drawer-divider {
    height: 1px;
    background: rgba(29, 158, 117, 0.1);
    margin: 0.75rem 0;
  }

  .hg-drawer-footer {
    padding: 1.25rem 1.5rem;
    border-top: 1px solid rgba(29, 158, 117, 0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .hg-drawer-login {
    width: 100%;
    padding: 12px;
    background: transparent;
    border: 1px solid rgba(29, 158, 117, 0.25);
    border-radius: 12px;
    color: rgba(232, 245, 240, 0.65);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    display: block;
    transition: border-color 0.2s, color 0.2s;
  }
  .hg-drawer-login:hover { border-color: rgba(29,158,117,0.5); color: #4ade80; }

  .hg-drawer-signup {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #1d9e75 0%, #0f6e56 100%);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    display: block;
    box-shadow: 0 4px 16px rgba(29, 158, 117, 0.3);
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .hg-drawer-signup:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(29,158,117,0.4); }
`;

const navLinks = [
  { to: "/",         label: "Home",      icon: "🏠" },
  { to: "/aboutus",  label: "About Us",  icon: "ℹ️" },
  { to: "/chatbot",  label: "Chatbot",   icon: "🤖" },
  { to: "/contactus",label: "Contact",   icon: "✉️" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  const toggleDrawer = useCallback(() => setDrawerOpen((p) => !p), []);
  const closeDrawer  = useCallback(() => setDrawerOpen(false), []);

  // Close on route change
  useEffect(() => { closeDrawer(); }, [location]);

  // Scroll + progress
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      setIsScrolled(scrolled > 10);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      <style>{styles}</style>

      {/* Scroll progress bar */}
      <div className="hg-progress-bar" style={{ width: `${scrollProgress}%` }} />

      <nav className={`hg-navbar${isScrolled ? " scrolled" : ""}`}>

        {/* Logo */}
        <Link to="/" className="hg-nav-logo">
          <img src="./img/logo-wh1.png" alt="Health Guardian" loading="lazy" />
        </Link>

        {/* Desktop links */}
        <ul className="hg-nav-links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`hg-nav-link${location.pathname === to ? " active" : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop auth */}
        <div className="hg-nav-auth">
          <Link to="/login"  className="hg-nav-login">Login</Link>
          <Link to="/signup" className="hg-nav-signup">Sign Up</Link>
        </div>

        {/* Hamburger */}
        <button
          className={`hg-ham-btn${drawerOpen ? " open" : ""}`}
          onClick={toggleDrawer}
          aria-label="Toggle menu"
        >
          <span className="hg-ham-line" />
          <span className="hg-ham-line" />
          <span className="hg-ham-line" />
        </button>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`hg-drawer-overlay${drawerOpen ? " open" : ""}`}
        onClick={closeDrawer}
      />

      {/* Mobile drawer */}
      <div className={`hg-drawer${drawerOpen ? " open" : ""}`}>
        <div className="hg-drawer-header">
          <Link to="/" className="hg-drawer-logo" onClick={closeDrawer}>
            <img src="./img/logo-wh1.png" alt="Health Guardian" />
          </Link>
          <button className="hg-drawer-close" onClick={closeDrawer}>✕</button>
        </div>

        <nav className="hg-drawer-nav">
          {navLinks.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`hg-drawer-link${location.pathname === to ? " active" : ""}`}
            >
              <span className="hg-drawer-link-icon">{icon}</span>
              {label}
            </Link>
          ))}
          <div className="hg-drawer-divider" />
        </nav>

        <div className="hg-drawer-footer">
          <Link to="/login"  className="hg-drawer-login"  onClick={closeDrawer}>Login</Link>
          <Link to="/signup" className="hg-drawer-signup" onClick={closeDrawer}>Sign Up</Link>
        </div>
      </div>
    </>
  );
}