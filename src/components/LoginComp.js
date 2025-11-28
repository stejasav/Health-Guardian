import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginComp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page refresh

    const payload = {
      emailId: formData.emailId,
      password: formData.password,
    };

    console.log("Sending login payload:", payload);

    try {
      const response = await fetch("http://localhost:2804/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Login failed:", text);
        alert("Login failed. Please check your email and password.");
        return;
      }

      // If backend returns some data:
      // const data = await response.json();
      // console.log("Login success:", data);

      alert("Login successful!");
    } catch (err) {
      console.error("Error during login:", err);
      alert("Something went wrong. Please try again.");
    }
  };



  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle"> We've missed you! Enter your details to continue </p>
        </div>

          <form className="login-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <div className="input-icon">
              <Mail className="icon" />
            </div>
            <input
              name="emailId"                           // 👈 matches backend key
              type="email"
              placeholder="Email Address"
              className="input-field if"
              value={formData.emailId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <Lock className="icon" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field if"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff className="icon" /> ) : ( <Eye className="icon" /> )}
            </div>
          </div>

          <div className="form-options">
            <div className="remember-option">
              <input id="remember-me" type="checkbox" className="remember-checkbox" />
              <label htmlFor="remember-me" className="remember-label"> Remember me </label>
            </div>
            <a href="/forgot-pass" className="forgot-link"> Forgot password? </a>
          </div>

          <button type="submit" className="login-button">
            Log In
          </button>

          {/* <div className="divider">
            <span className="divider-text">Or continue with</span>
          </div> */}

          {/* <div className="social-login">
            <a href="/google">
              <button type="button" className="social-button">
                <svg className="social-icon google" viewBox="0 0 24 24" aria-hidden="true" >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </button>
            </a>
            <a href="/facebook">
              <button type="button" className="social-button">
                <svg className="social-icon facebook" viewBox="0 0 24 24" aria-hidden="true" >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </a>
            <a href="/twitter">
              <button type="button" className="social-button">
                <svg className="social-icon twitter" viewBox="0 0 24 24" aria-hidden="true" >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
            </a>
          </div> */}

          <p className="signup-text"> Don't have an account? <a href="/signup" className="signup-link"> Sign up for free </a> </p>
        </form>
      </div>
    </div>
  );
}