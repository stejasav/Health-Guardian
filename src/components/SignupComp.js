import React, { useCallback, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, MapPin } from "lucide-react";

export default function SignupComp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    dob: "",
    address: "",
    profilePicture: null,
    terms: false
  });

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formData.terms) {
        alert("Please agree to the terms and conditions.");
        return;
      }
      // Handle form submission
      console.log("Form submitted", formData);
    },
    [formData]
  );

  return (
    <div className="login-page">
      <div className="login-container signup-container">
        <div className="login-header">
          <h1 className="login-title signup-title">Create Account</h1>
          <p className="login-subtitle signup-subtitle">
            Join us today and get started on your journey
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <div className="input-icon">
                <User className="icon" />
              </div>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                className="input-field first-name-input-field"
                onChange={handleChange}
                value={formData.firstName}
                // required
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <User className="icon" />
              </div>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                className="input-field last-name-input-field"
                value={formData.lastName}
                onChange={handleChange}
                // required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-icon">
              <Mail className="icon" />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <Phone className="icon" />
            </div>
            <input
              name="phoneNo"
              type="tel"
              placeholder="Phone Number"
              className="input-field"
              value={formData.phoneNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <Lock className="icon" />
            </div>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div
              className="password-toggle"
              onClick={togglePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="icon password-eye-icon" />
              ) : (
                <Eye className="icon password-eye-icon" />
              )}
            </div>
          </div>

          <div className="input-group">
            <div className="input-icon">
              <Calendar className="icon" />
            </div>
            <input
              name="dob"
              type="date"
              placeholder="Date of Birth"
              className="input-field"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="input-group">
            <div className="input-icon">
              <MapPin className="icon map-icon" />
            </div>
            <textarea
              name="address"
              placeholder="Address"
              className="input-field textarea-field"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
            />
          </div> */}

          <div className="input-group file-input-container">
            <div className="input-icon">
              <svg
                className="icon profile-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>

            <label htmlFor="profilePicture" className="file-input-label">
              {formData.profilePicture ? "Selected: " : "Profile Picture"}
              {formData.profilePicture && (
                <span className="file-name-display">
                  {formData.profilePicture.name}
                </span>
              )}
            </label>

            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              accept="image/*"
              className="hidden-file-input"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFormData((prev) => ({
                    ...prev,
                    profilePicture: e.target.files[0],
                  }));
                }
              }}
            />
          </div>

          {formData.profilePicture && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(formData.profilePicture)}
                alt="Profile Preview"
                className="preview-img"
              />
              <button
                type="button"
                className="change-photo-btn"
                onClick={() =>
                  document.getElementById("profilePicture").click()
                }
              >
                Change Photo
              </button>
            </div>
          )}

          <div className="form-options">
            <div className="remember-option">
              <input
                name="terms"
                id="terms"
                type="checkbox"
                className="remember-checkbox"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms" className="terms-label">
                I agree to the
                <a href="/terms-of-service" target="_blank" className="signup-link" > Terms of Service </a>
                and
                <a href="/privacy-policy" target="_blank" className="signup-link" > Privacy Policy </a>
              </label>
            </div>
          </div>

          <button className="login-button signup-button">Create Account</button>

          <p className="signup-text">
            Already have an account?
            <a href="/login" className="signup-link">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}