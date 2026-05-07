import React, { useEffect, useState, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
 
  * { margin: 0; padding: 0; box-sizing: border-box; }
 
  .hg-contact-root {
    font-family: 'DM Sans', sans-serif;
    background: #020d0a;
    color: #e8f5f0;
    min-height: 100vh;
    overflow-x: hidden;
  }
 
  /* ── BACKGROUND ── */
  .hg-ct-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .hg-ct-bg::before {
    content: '';
    position: absolute;
    top: -15%;
    right: -10%;
    width: 50vw; height: 50vw;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(29,158,117,0.1) 0%, transparent 70%);
    animation: bgDrift1 20s ease-in-out infinite;
  }
  .hg-ct-bg::after {
    content: '';
    position: absolute;
    bottom: -10%;
    left: -8%;
    width: 40vw; height: 40vw;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(15,110,86,0.08) 0%, transparent 70%);
    animation: bgDrift2 25s ease-in-out infinite;
  }
  @keyframes bgDrift1 {
    0%,100% { transform: translate(0,0); }
    50% { transform: translate(-30px, 40px); }
  }
  @keyframes bgDrift2 {
    0%,100% { transform: translate(0,0); }
    50% { transform: translate(25px,-30px); }
  }
 
  .hg-ct-grid {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image:
      linear-gradient(rgba(29,158,117,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(29,158,117,0.04) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 10%, transparent 80%);
  }
 
  /* ── HERO ── */
  .hg-ct-hero {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 6rem 2rem 4rem;
  }
 
  .hg-ct-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(29,158,117,0.1);
    border: 1px solid rgba(29,158,117,0.25);
    border-radius: 50px;
    padding: 7px 18px;
    font-size: 12px;
    font-weight: 500;
    color: #4ade80;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1.75rem;
    opacity: 0;
    animation: fadeUp 0.7s ease forwards 0.1s;
  }
  .hg-ct-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #4ade80;
    animation: blink 2s ease-in-out infinite;
  }
  @keyframes blink {
    0%,100% { opacity: 1; } 50% { opacity: 0.3; }
  }
 
  .hg-ct-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 5vw, 4.2rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.25rem;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards 0.25s;
  }
  .hg-ct-hero h1 span {
    background: linear-gradient(135deg, #4ade80 0%, #1d9e75 50%, #5dcaa5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
 
  .hg-ct-hero p {
    font-size: 1.05rem;
    font-weight: 300;
    color: rgba(232,245,240,0.55);
    max-width: 520px;
    margin: 0 auto;
    line-height: 1.75;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards 0.4s;
  }
 
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
 
  /* ── MAIN LAYOUT ── */
  .hg-ct-body {
    position: relative;
    z-index: 1;
    max-width: 1140px;
    margin: 0 auto;
    padding: 2rem 2rem 6rem;
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 2.5rem;
    align-items: start;
  }
  @media(max-width: 860px) {
    .hg-ct-body { grid-template-columns: 1fr; }
  }
 
  /* ── REVEAL ── */
  .hg-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .hg-reveal.visible { opacity: 1; transform: translateY(0); }
  .hg-reveal-d1 { transition-delay: 0.1s; }
  .hg-reveal-d2 { transition-delay: 0.2s; }
  .hg-reveal-d3 { transition-delay: 0.3s; }
 
  /* ── INFO PANEL ── */
  .hg-ct-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
 
  .hg-ct-info-header {
    margin-bottom: 0.5rem;
  }
  .hg-section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #1d9e75;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .hg-section-label::before {
    content: '';
    width: 20px; height: 1px;
    background: #1d9e75;
    flex-shrink: 0;
  }
 
  .hg-ct-info-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 700;
    color: #e8f5f0;
    line-height: 1.2;
    margin-bottom: 0.9rem;
  }
  .hg-ct-info-header p {
    font-size: 0.95rem;
    font-weight: 300;
    color: rgba(232,245,240,0.5);
    line-height: 1.75;
  }
 
  /* contact detail cards */
  .hg-detail-card {
    background: rgba(13,40,28,0.35);
    border: 1px solid rgba(29,158,117,0.12);
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: border-color 0.3s, background 0.3s, transform 0.3s;
    cursor: default;
  }
  .hg-detail-card:hover {
    border-color: rgba(29,158,117,0.35);
    background: rgba(13,61,42,0.4);
    transform: translateX(6px);
  }
 
  .hg-detail-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: rgba(29,158,117,0.1);
    border: 1px solid rgba(29,158,117,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
    transition: background 0.3s;
  }
  .hg-detail-card:hover .hg-detail-icon {
    background: rgba(29,158,117,0.2);
  }
 
  .hg-detail-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #1d9e75;
    margin-bottom: 3px;
  }
  .hg-detail-value {
    font-size: 0.9rem;
    font-weight: 400;
    color: rgba(232,245,240,0.7);
  }
  .hg-detail-value a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;
  }
  .hg-detail-value a:hover { color: #4ade80; }
 
  /* response time card */
  .hg-response-card {
    background: linear-gradient(135deg, rgba(29,158,117,0.08) 0%, rgba(2,13,10,0.6) 100%);
    border: 1px solid rgba(29,158,117,0.18);
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .hg-response-icon {
    font-size: 28px;
    flex-shrink: 0;
  }
  .hg-response-title {
    font-size: 13px;
    font-weight: 600;
    color: #e8f5f0;
    margin-bottom: 3px;
  }
  .hg-response-sub {
    font-size: 12px;
    font-weight: 300;
    color: rgba(232,245,240,0.4);
  }
 
  /* ── FORM PANEL ── */
  .hg-ct-form-wrap {
    background: rgba(4,18,13,0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(29,158,117,0.15);
    border-radius: 24px;
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
  }
  .hg-ct-form-wrap::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(29,158,117,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
 
  .hg-ct-form-wrap h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #e8f5f0;
    margin-bottom: 0.5rem;
  }
  .hg-ct-form-wrap > p {
    font-size: 0.88rem;
    font-weight: 300;
    color: rgba(232,245,240,0.4);
    margin-bottom: 2rem;
  }
 
  .hg-divider-line {
    height: 1px;
    background: linear-gradient(to right, rgba(29,158,117,0.3), transparent);
    margin-bottom: 2rem;
  }
 
  /* form rows */
  .hg-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  @media(max-width: 540px) {
    .hg-form-row { grid-template-columns: 1fr; }
  }
 
  .hg-form-group {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-bottom: 1.25rem;
    position: relative;
  }
 
  .hg-form-label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(232,245,240,0.5);
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .hg-required {
    color: #f43f5e;
    font-size: 14px;
  }
 
  .hg-form-input, .hg-form-textarea {
    background: rgba(2,13,10,0.8);
    border: 1px solid rgba(29,158,117,0.15);
    border-radius: 12px;
    padding: 12px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    font-weight: 400;
    color: #e8f5f0;
    outline: none;
    transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
    width: 100%;
  }
  .hg-form-input::placeholder, .hg-form-textarea::placeholder {
    color: rgba(232,245,240,0.2);
  }
  .hg-form-input:focus, .hg-form-textarea:focus {
    border-color: rgba(29,158,117,0.5);
    box-shadow: 0 0 0 3px rgba(29,158,117,0.08);
    background: rgba(4,18,13,0.9);
  }
  .hg-form-input:hover, .hg-form-textarea:hover {
    border-color: rgba(29,158,117,0.25);
  }
 
  .hg-form-textarea {
    resize: vertical;
    min-height: 130px;
    line-height: 1.6;
  }
 
  /* char counter */
  .hg-char-count {
    font-size: 10px;
    color: rgba(232,245,240,0.25);
    text-align: right;
    margin-top: -4px;
  }
 
  /* submit button */
  .hg-submit-btn {
    width: 100%;
    padding: 14px 24px;
    background: linear-gradient(135deg, #1d9e75 0%, #0f6e56 100%);
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s;
    box-shadow: 0 4px 20px rgba(29,158,117,0.3);
    margin-top: 0.5rem;
    position: relative;
    overflow: hidden;
  }
  .hg-submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .hg-submit-btn:hover:not(:disabled)::before { opacity: 1; }
  .hg-submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(29,158,117,0.4);
  }
  .hg-submit-btn:active:not(:disabled) { transform: translateY(0); }
  .hg-submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
 
  /* spinner inside button */
  .hg-btn-spinner {
    width: 16px; height: 16px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    animation: spin 0.8s linear infinite;
    flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
 
  /* success state */
  .hg-success-overlay {
    position: absolute;
    inset: 0;
    background: rgba(4,18,13,0.97);
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    z-index: 10;
    animation: fadeIn 0.5s ease forwards;
    padding: 2rem;
    text-align: center;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
 
  .hg-success-icon {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: rgba(29,158,117,0.15);
    border: 2px solid rgba(29,158,117,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
  }
  @keyframes popIn {
    from { transform: scale(0); }
    to   { transform: scale(1); }
  }
 
  .hg-success-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #e8f5f0;
  }
  .hg-success-sub {
    font-size: 0.9rem;
    font-weight: 300;
    color: rgba(232,245,240,0.5);
    line-height: 1.6;
  }
  .hg-success-back {
    margin-top: 0.5rem;
    background: transparent;
    border: 1px solid rgba(29,158,117,0.3);
    border-radius: 50px;
    padding: 8px 24px;
    color: #4ade80;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .hg-success-back:hover {
    background: rgba(29,158,117,0.1);
    border-color: rgba(29,158,117,0.5);
  }
 
  /* ── CTA BOTTOM ── */
  .hg-ct-cta {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 4rem 2rem 6rem;
    border-top: 1px solid rgba(29,158,117,0.1);
  }
  .hg-ct-cta h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 700;
    color: #e8f5f0;
    margin-bottom: 0.75rem;
  }
  .hg-ct-cta p {
    font-size: 0.95rem;
    font-weight: 300;
    color: rgba(232,245,240,0.4);
    max-width: 420px;
    margin: 0 auto;
    line-height: 1.7;
  }
`;
 
const contactDetails = [
  {
    icon: "📍",
    label: "Location",
    value: "New Delhi, Delhi, India",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+91 7011583095",
  },
  {
    icon: "✉️",
    label: "Email",
    value: (
      <a href="mailto:HealthGuardianForYou@gmail.com">
        HealthGuardianForYou@gmail.com
      </a>
    ),
  },
];
 
export default function ContactUsComp() {
  const [state, handleSubmit] = useForm("mblgakdw");
  const [showSuccess, setShowSuccess] = useState(false);
  const [msgLength, setMsgLength] = useState(0);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", message: "",
  });
  const revealRefs = useRef([]);
 
  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => revealRefs.current.forEach((el) => el && observer.unobserve(el));
  }, []);
 
  const addRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };
 
  // Success handler
  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
      toast.success("Message sent successfully!", {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
        transition: Flip,
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setMsgLength(0);
    }
  }, [state.succeeded]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "message") setMsgLength(value.length);
  };
 
  return (
    <>
      <style>{styles}</style>
      <div className="hg-contact-root">
        <ToastContainer />
        <div className="hg-ct-bg" />
        <div className="hg-ct-grid" />
 
        {/* ── HERO ── */}
        <section className="hg-ct-hero">
          <div className="hg-ct-badge">
            <span className="hg-ct-badge-dot" />
            Get In Touch
          </div>
          <h1>Contact <span>Health Guardian</span></h1>
          <p>We're here to help. Reach out with questions, feedback, or support — our team responds within 24 hours.</p>
        </section>
 
        {/* ── BODY ── */}
        <div className="hg-ct-body">
 
          {/* INFO PANEL */}
          <div className="hg-ct-info">
            <div ref={addRef} className="hg-reveal hg-ct-info-header">
              <div className="hg-section-label">Contact Info</div>
              <h2>Let's start a conversation</h2>
              <p>Have questions about our AI health platform? Want to share feedback? We'd love to hear from you.</p>
            </div>
 
            {contactDetails.map((d, i) => (
              <div key={i} ref={addRef} className={`hg-reveal hg-reveal-d${i + 1} hg-detail-card`}>
                <div className="hg-detail-icon">{d.icon}</div>
                <div>
                  <div className="hg-detail-label">{d.label}</div>
                  <div className="hg-detail-value">{d.value}</div>
                </div>
              </div>
            ))}
 
            <div ref={addRef} className="hg-reveal hg-reveal-d3 hg-response-card">
              <div className="hg-response-icon">⚡</div>
              <div>
                <div className="hg-response-title">Fast Response Time</div>
                <div className="hg-response-sub">We typically reply within 24 hours on business days</div>
              </div>
            </div>
          </div>
 
          {/* FORM PANEL */}
          <div ref={addRef} className="hg-reveal hg-reveal-d2 hg-ct-form-wrap">
            {showSuccess && (
              <div className="hg-success-overlay">
                <div className="hg-success-icon">✅</div>
                <div className="hg-success-title">Message Sent!</div>
                <p className="hg-success-sub">
                  Thanks for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button className="hg-success-back" onClick={() => setShowSuccess(false)}>
                  Send another message
                </button>
              </div>
            )}
 
            <h2>Send Us a Message</h2>
            <p>Fill in the details below and we'll get back to you shortly.</p>
            <div className="hg-divider-line" />
 
            <form onSubmit={handleSubmit} acceptCharset="utf-8" method="POST">
              <div className="hg-form-row">
                <div className="hg-form-group">
                  <label className="hg-form-label" htmlFor="name">
                    Full Name <span className="hg-required">*</span>
                  </label>
                  <input
                    className="hg-form-input"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Tavneet Kaur"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>
 
                <div className="hg-form-group">
                  <label className="hg-form-label" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    className="hg-form-input"
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
 
              <div className="hg-form-group">
                <label className="hg-form-label" htmlFor="email">
                  Email Address <span className="hg-required">*</span>
                </label>
                <input
                  className="hg-form-input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
 
              <div className="hg-form-group">
                <label className="hg-form-label" htmlFor="message">
                  Your Message <span className="hg-required">*</span>
                </label>
                <textarea
                  className="hg-form-textarea"
                  id="message"
                  name="message"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <div className="hg-char-count">{msgLength} characters</div>
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
 
              <button
                type="submit"
                className="hg-submit-btn"
                disabled={state.submitting}
              >
                {state.submitting ? (
                  <>
                    <div className="hg-btn-spinner" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <span style={{ fontSize: 16 }}>✈️</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
 
        {/* ── CTA ── */}
        <section className="hg-ct-cta">
          <h2>We're Here for You 💚</h2>
          <p>Your health journey matters to us. Reach out anytime — we're always ready to help.</p>
        </section>
      </div>
    </>
  );
}
 