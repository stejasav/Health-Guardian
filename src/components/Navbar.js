import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleSidebar = useCallback(() => {
    setSidebarVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close sidebar on route change
    setSidebarVisible(false);
  }, [location]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo-link">
        <img src="./img/logo-wh1.png" alt="Health Guardian Logo" className="logo" loading="lazy" />
      </Link>

      <div className={`sidebar ${isSidebarVisible ? "show-sidebar" : ""}`}>
        <p className="close-x-p" onClick={toggleSidebar} aria-label="Close menu">
          <img src="./img/close-x.png" alt="close button" className="close-x" />
        </p>
        <p> <Link to="/">Home</Link> </p>
        <p> <Link to="/aboutus">AboutUs</Link> </p>
        <p> <Link to="/chatbot">Chatbot</Link> </p>
        <p> <Link to="/contactus">ContactUs</Link> </p>
        <p> <Link to="/login">Login</Link> </p>
      </div>

      <div className="menu">
        <p> <Link to="/aboutus">AboutUs</Link> </p>
        <p> <Link to="/chatbot">Chatbot</Link> </p>
        <p> <Link to="/contactus">ContactUs</Link> </p>
      </div>

      <div className="register">
        <Link to="/login"> <button className="login-btn">Login</button> </Link>
        <Link to="/signup"> <button className="signup-button">SignUp</button> </Link>
      </div>

      <img
        src="./img/ham-icon.png"
        alt="hamburger"
        className="ham-icon"
        onClick={toggleSidebar}
        loading="lazy"
        aria-label="Open menu"
      />
    </nav>
  );
}