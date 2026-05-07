import React, { useCallback, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, MapPin } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .hg-signup-page {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem 2rem 3rem;
    position: relative;
    overflow: hidden;
    background: #020d0a;
  }

  /* ── BACKGROUND ── */
  .hg-signup-page::before {
    content: '';
    position: absolute;
    top: -20%; left: -15%;
    width: 55vw; height: 55vw;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(29,158,117,0.11) 0%, transparent 70%);
    animation: sOrb1 18s ease-in-out infinite;
    pointer-events: none;
  }
  .hg-signup-page::after {
    content: '';
    position: absolute;
    bottom: -15%; right: -10%;
    width: 45vw; height: 45vw;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(15,110,86,0.09) 0%, transparent 70%);
    animation: sOrb2 24s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes sOrb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-25px)} }
  @keyframes sOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,20px)} }

  .hg-signup-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(29,158,117,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(29,158,117,0.04) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 40%, black 10%, transparent 80%);
    pointer-events: none;
  }

  /* ── CARD ── */
  .hg-signup-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 580px;
    background: rgba(4, 18, 13, 0.82);
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
  .hg-signup-card::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(29,158,117,0.6), transparent);
    border-radius: 1px;
  }

  /* ── BRAND ── */
  .hg-signup-brand {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .hg-signup-brand img {
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
  .hg-signup-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  .hg-signup-title {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 700;
    color: #e8f5f0;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }
  .hg-signup-subtitle {
    font-size: 0.9rem;
    font-weight: 300;
    color: rgba(232,245,240,0.45);
    line-height: 1.5;
  }

  .hg-signup-divider {
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(29,158,117,0.25), transparent);
    margin-bottom: 2rem;
  }

  /* ── FORM ── */
  .hg-signup-form {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  .hg-field-group { display: flex; flex-direction: column; }
  .hg-field-group-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  @media(max-width: 480px) {
    .hg-field-group-row { grid-template-columns: 1fr; }
  }

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
    z-index: 1;
  }
  .hg-input-wrap:focus-within .hg-input-icon { color: #4ade80; }

  .hg-input,
  .hg-textarea {
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
  .hg-textarea {
    resize: vertical;
    min-height: 90px;
    line-height: 1.6;
    align-self: flex-start;
  }
  .hg-input::placeholder,
  .hg-textarea::placeholder { color: rgba(232,245,240,0.2); }
  .hg-input:focus,
  .hg-textarea:focus {
    border-color: rgba(29,158,117,0.5);
    box-shadow: 0 0 0 3px rgba(29,158,117,0.08);
    background: rgba(4,18,13,0.95);
  }
  .hg-input:hover,
  .hg-textarea:hover { border-color: rgba(29,158,117,0.25); }
  .hg-input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #041208 inset !important;
    -webkit-text-fill-color: #e8f5f0 !important;
  }

  /* date picker icon color */
  .hg-input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(0.6) sepia(1) saturate(3) hue-rotate(100deg);
    cursor: pointer;
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

  /* ── TERMS ── */
  .hg-terms-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 1rem;
    background: rgba(29,158,117,0.05);
    border: 1px solid rgba(29,158,117,0.12);
    border-radius: 12px;
  }
  .hg-terms-row input[type="checkbox"] {
    width: 16px; height: 16px;
    accent-color: #1d9e75;
    flex-shrink: 0;
    margin-top: 2px;
    cursor: pointer;
  }
  .hg-terms-label {
    font-size: 0.82rem;
    font-weight: 300;
    color: rgba(232,245,240,0.5);
    line-height: 1.6;
  }
  .hg-terms-link {
    color: #1d9e75;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    margin: 0 3px;
  }
  .hg-terms-link:hover { color: #4ade80; }

  /* ── SUBMIT ── */
  .hg-signup-btn {
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
  .hg-signup-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .hg-signup-btn:hover:not(:disabled)::before { opacity: 1; }
  .hg-signup-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(29,158,117,0.4);
  }
  .hg-signup-btn:active:not(:disabled) { transform: translateY(0); }
  .hg-signup-btn:disabled { opacity: 0.6; cursor: not-allowed; }

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

  /* ── LOGIN LINK ── */
  .hg-login-text {
    text-align: center;
    font-size: 0.85rem;
    font-weight: 300;
    color: rgba(232,245,240,0.35);
    margin-top: 0.5rem;
  }
  .hg-login-link {
    color: #1d9e75;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    margin-left: 4px;
  }
  .hg-login-link:hover { color: #4ade80; }
`;

export default function SignupComp() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    phoneNo: "", password: "", dob: "",
    address: "", profilePicture: null, terms: false,
  });

  const togglePassword = useCallback(() => setShowPassword((p) => !p), []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!formData.terms) { alert("Please agree to the terms and conditions."); return; }
    setLoading(true);

    let dobForApi = formData.dob;
    if (formData.dob) {
      const [year, month, day] = formData.dob.split("-");
      dobForApi = `${day}/${month}/${year}`;
    }

    const payload = {
      firstName: formData.firstName,
      lastName:  formData.lastName,
      emailId:   formData.email,
      phoneNo:   formData.phoneNo,
      password:  formData.password,
      address:   formData.address,
      dob:       dobForApi,
    };

    console.log("Sending payload to backend:", payload);

    try {
      const response = await fetch("http://localhost:2804/user/register", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const text = await response.text();
        console.error("Backend error:", text);
        throw new Error(text || "Registration failed");
      }
      alert("Registration successful! Please check your email.");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [formData]);

  return (
    <>
      <style>{styles}</style>
      <div className="hg-signup-page">
        <div className="hg-signup-grid" />

        <div className="hg-signup-card">

          {/* Wing Logo */}
          <div className="hg-signup-brand">
            <img src="/img/logo-wh1.png" alt="Health Guardian" />
          </div>

          {/* Header */}
          <div className="hg-signup-header">
            <h1 className="hg-signup-title">Create Account</h1>
            <p className="hg-signup-subtitle">Join us today and get started on your journey</p>
          </div>

          <div className="hg-signup-divider" />

          {/* Form */}
          <form className="hg-signup-form" onSubmit={handleSubmit}>

            {/* First + Last Name */}
            <div className="hg-field-group-row">
              <div className="hg-field-group">
                <span className="hg-field-label">First Name</span>
                <div className="hg-input-wrap">
                  <div className="hg-input-icon"><User size={15} /></div>
                  <input
                    id="firstName" name="firstName" type="text"
                    placeholder="First Name"
                    className="hg-input"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="hg-field-group">
                <span className="hg-field-label">Last Name</span>
                <div className="hg-input-wrap">
                  <div className="hg-input-icon"><User size={15} /></div>
                  <input
                    id="lastName" name="lastName" type="text"
                    placeholder="Last Name"
                    className="hg-input"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="hg-field-group">
              <span className="hg-field-label">Email Address</span>
              <div className="hg-input-wrap">
                <div className="hg-input-icon"><Mail size={15} /></div>
                <input
                  name="email" type="email"
                  placeholder="you@example.com"
                  className="hg-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="hg-field-group">
              <span className="hg-field-label">Phone Number</span>
              <div className="hg-input-wrap">
                <div className="hg-input-icon"><Phone size={15} /></div>
                <input
                  name="phoneNo" type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="hg-input"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="hg-field-group">
              <span className="hg-field-label">Password</span>
              <div className="hg-input-wrap">
                <div className="hg-input-icon"><Lock size={15} /></div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="hg-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="hg-eye-btn" onClick={togglePassword} aria-label="Toggle password">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* DOB */}
            <div className="hg-field-group">
              <span className="hg-field-label">Date of Birth</span>
              <div className="hg-input-wrap">
                <div className="hg-input-icon"><Calendar size={15} /></div>
                <input
                  name="dob" type="date"
                  className="hg-input"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="hg-field-group">
              <span className="hg-field-label">Address</span>
              <div className="hg-input-wrap" style={{ alignItems: "flex-start" }}>
                <div className="hg-input-icon" style={{ top: "14px", position: "absolute" }}>
                  <MapPin size={15} />
                </div>
                <textarea
                  name="address"
                  placeholder="Your full address"
                  className="hg-textarea"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                />
              </div>
            </div>

            {/* Terms */}
            <div className="hg-terms-row">
              <input
                name="terms" id="terms" type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms" className="hg-terms-label">
                I agree to the
                <a href="/terms-of-service" target="_blank" className="hg-terms-link">Terms of Service</a>
                and
                <a href="/privacy-policy" target="_blank" className="hg-terms-link">Privacy Policy</a>
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="hg-signup-btn" disabled={loading}>
              {loading ? (
                <><span className="hg-btn-spinner" /> Creating Account…</>
              ) : "Create Account →"}
            </button>

            <p className="hg-login-text">
              Already have an account?
              <a href="/login" className="hg-login-link">Log in</a>
            </p>

          </form>
        </div>
      </div>
    </>
  );
}