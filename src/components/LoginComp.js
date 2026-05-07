import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .hg-login-page {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
    background: #020d0a;
  }

  .hg-login-page::before {
    content: '';
    position: absolute;
    top: -20%; left: -15%;
    width: 55vw; height: 55vw;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(29,158,117,0.12) 0%, transparent 70%);
    animation: lOrb1 18s ease-in-out infinite;
    pointer-events: none;
  }
  .hg-login-page::after {
    content: '';
    position: absolute;
    bottom: -15%; right: -10%;
    width: 45vw; height: 45vw;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(15,110,86,0.1) 0%, transparent 70%);
    animation: lOrb2 24s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes lOrb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-25px)} }
  @keyframes lOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,20px)} }

  .hg-login-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(29,158,117,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(29,158,117,0.04) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 80%);
    pointer-events: none;
  }

  /* ── CARD ── */
  .hg-login-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 440px;
    background: rgba(4, 18, 13, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(29,158,117,0.18);
    border-radius: 28px;
    padding: 3rem 2.5rem;
    box-shadow: 0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(29,158,117,0.08);
    animation: cardIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards;
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(28px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .hg-login-card::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(29,158,117,0.6), transparent);
    border-radius: 1px;
  }

  /* ── BRAND ── */
  .hg-login-brand {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .hg-login-brand img {
    height: 40px;
    width: auto;
    filter: brightness(1.15) drop-shadow(0 0 8px rgba(74,222,128,0.2));
    animation: logoPulse 3s ease-in-out infinite;
  }
  @keyframes logoPulse {
    0%,100% { filter: brightness(1.1) drop-shadow(0 0 4px rgba(74,222,128,0.15)); }
    50%      { filter: brightness(1.25) drop-shadow(0 0 12px rgba(74,222,128,0.4)); }
  }

  /* ── HEADER ── */
  .hg-login-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  .hg-login-title {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 700;
    color: #e8f5f0;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }
  .hg-login-subtitle {
    font-size: 0.9rem;
    font-weight: 300;
    color: rgba(232,245,240,0.45);
    line-height: 1.5;
  }

  .hg-login-divider {
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(29,158,117,0.25), transparent);
    margin-bottom: 2rem;
  }

  /* ── FORM ── */
  .hg-login-form {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  .hg-field-group { display: flex; flex-direction: column; }

  .hg-field-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(232,245,240,0.4);
    margin-bottom: 6px;
    display: block;
  }

  .hg-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .hg-input-icon {
    position: absolute;
    left: 14px;
    color: rgba(29,158,117,0.6);
    display: flex;
    align-items: center;
    pointer-events: none;
    transition: color 0.2s;
  }
  .hg-input-wrap:focus-within .hg-input-icon { color: #4ade80; }

  .hg-input {
    width: 100%;
    padding: 13px 16px 13px 44px;
    background: rgba(2,13,10,0.8);
    border: 1px solid rgba(29,158,117,0.15);
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    font-weight: 400;
    color: #e8f5f0;
    outline: none;
    transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
    box-sizing: border-box;
  }
  .hg-input::placeholder { color: rgba(232,245,240,0.2); }
  .hg-input:focus {
    border-color: rgba(29,158,117,0.5);
    box-shadow: 0 0 0 3px rgba(29,158,117,0.08);
    background: rgba(4,18,13,0.95);
  }
  .hg-input:hover { border-color: rgba(29,158,117,0.25); }
  .hg-input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #041208 inset !important;
    -webkit-text-fill-color: #e8f5f0 !important;
  }

  .hg-eye-btn {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    color: rgba(232,245,240,0.3);
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    transition: color 0.2s;
  }
  .hg-eye-btn:hover { color: #4ade80; }

  .hg-form-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -0.25rem;
  }
  .hg-remember {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .hg-remember input[type="checkbox"] {
    width: 15px; height: 15px;
    accent-color: #1d9e75;
    cursor: pointer;
  }
  .hg-remember label {
    font-size: 0.82rem;
    font-weight: 400;
    color: rgba(232,245,240,0.45);
    cursor: pointer;
  }
  .hg-forgot {
    font-size: 0.82rem;
    font-weight: 400;
    color: #1d9e75;
    text-decoration: none;
    transition: color 0.2s;
  }
  .hg-forgot:hover { color: #4ade80; }

  .hg-login-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #1d9e75 0%, #0f6e56 100%);
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 20px rgba(29,158,117,0.3);
    margin-top: 0.25rem;
    position: relative;
    overflow: hidden;
  }
  .hg-login-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .hg-login-btn:hover:not(:disabled)::before { opacity: 1; }
  .hg-login-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(29,158,117,0.4);
  }
  .hg-login-btn:active:not(:disabled) { transform: translateY(0); }
  .hg-login-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .hg-btn-spinner {
    width: 15px; height: 15px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    animation: spin 0.8s linear infinite;
    display: inline-block;
    flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .hg-signup-text {
    text-align: center;
    font-size: 0.85rem;
    font-weight: 300;
    color: rgba(232,245,240,0.35);
    margin-top: 0.5rem;
  }
  .hg-signup-link {
    color: #1d9e75;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    margin-left: 4px;
  }
  .hg-signup-link:hover { color: #4ade80; }
`;

export default function LoginComp() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ emailId: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { emailId: formData.emailId, password: formData.password };
    console.log("Sending login payload:", payload);
    try {
      const response = await fetch("http://localhost:2804/user/login", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const text = await response.text();
        console.error("Login failed:", text);
        alert("Login failed. Please check your email and password.");
        return;
      }
      alert("Login successful!");
    } catch (err) {
      console.error("Error during login:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="hg-login-page">
        <div className="hg-login-grid" />

        <div className="hg-login-card">

          {/* Wing Logo */}
          <div className="hg-login-brand">
            <img src="/img/logo-wh1.png" alt="Health Guardian" />
          </div>

          {/* Header */}
          <div className="hg-login-header">
            <h1 className="hg-login-title">Welcome Back</h1>
            <p className="hg-login-subtitle">We've missed you! Enter your details to continue.</p>
          </div>

          <div className="hg-login-divider" />

          {/* Form */}
          <form className="hg-login-form" onSubmit={handleSubmit}>

            <div className="hg-field-group">
              <span className="hg-field-label">Email Address</span>
              <div className="hg-input-wrap">
                <div className="hg-input-icon"><Mail size={16} /></div>
                <input
                  name="emailId"
                  type="email"
                  placeholder="you@example.com"
                  className="hg-input"
                  value={formData.emailId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="hg-field-group">
              <span className="hg-field-label">Password</span>
              <div className="hg-input-wrap">
                <div className="hg-input-icon"><Lock size={16} /></div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="hg-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="hg-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="hg-form-options">
              <div className="hg-remember">
                <input id="remember-me" type="checkbox" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <a href="/forgot-pass" className="hg-forgot">Forgot password?</a>
            </div>

            <button type="submit" className="hg-login-btn" disabled={loading}>
              {loading ? (
                <><span className="hg-btn-spinner" /> Logging in…</>
              ) : "Log In →"}
            </button>

            <p className="hg-signup-text">
              Don't have an account?
              <a href="/signup" className="hg-signup-link">Sign up for free</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}