import React, { useEffect, useRef, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .hg-root {
    font-family: 'DM Sans', sans-serif;
    background: #020d0a;
    color: #e8f5f0;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* ─── HERO ─── */
  .hg-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
  }

  .hg-hero-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 40%, #0d3d2a 0%, #020d0a 70%);
  }

  .hg-grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(29, 158, 117, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(29, 158, 117, 0.06) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%);
  }

  .hg-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }
  .hg-orb-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(29,158,117,0.18) 0%, transparent 70%);
    top: -100px; left: -100px;
    animation: orbFloat 12s ease-in-out infinite;
  }
  .hg-orb-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(15,110,86,0.15) 0%, transparent 70%);
    bottom: -80px; right: -80px;
    animation: orbFloat 16s ease-in-out infinite reverse;
  }
  .hg-orb-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(93,202,165,0.1) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    animation: orbPulse 8s ease-in-out infinite;
  }

  @keyframes orbFloat {
    0%,100% { transform: translate(0, 0); }
    33% { transform: translate(30px, -20px); }
    66% { transform: translate(-20px, 30px); }
  }
  @keyframes orbPulse {
    0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.7; }
    50% { transform: translate(-50%,-50%) scale(1.3); opacity: 1; }
  }

  .hg-hero-content {
    position: relative;
    z-index: 2;
    max-width: 780px;
    padding: 0 2rem;
  }

  .hg-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(29, 158, 117, 0.12);
    border: 1px solid rgba(29, 158, 117, 0.3);
    border-radius: 50px;
    padding: 8px 20px;
    font-size: 13px;
    font-weight: 500;
    color: #4ade80;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 2rem;
    opacity: 0;
    animation: fadeSlideUp 0.8s ease forwards 0.2s;
  }
  .hg-badge-dot {
    width: 7px; height: 7px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
  }

  .hg-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8rem, 6vw, 5.5rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    opacity: 0;
    animation: fadeSlideUp 0.9s ease forwards 0.4s;
  }
  .hg-hero-title span {
    background: linear-gradient(135deg, #4ade80 0%, #1d9e75 50%, #5dcaa5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hg-hero-subtitle {
    font-size: 1.15rem;
    font-weight: 300;
    color: rgba(232, 245, 240, 0.6);
    line-height: 1.7;
    max-width: 580px;
    margin: 0 auto 3rem;
    opacity: 0;
    animation: fadeSlideUp 0.9s ease forwards 0.6s;
  }

  .hg-hero-stats {
    display: flex;
    gap: 2.5rem;
    justify-content: center;
    flex-wrap: wrap;
    opacity: 0;
    animation: fadeSlideUp 0.9s ease forwards 0.8s;
  }
  .hg-stat-item {
    text-align: center;
  }
  .hg-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    font-weight: 700;
    color: #4ade80;
    display: block;
    line-height: 1;
  }
  .hg-stat-label {
    font-size: 12px;
    color: rgba(232,245,240,0.45);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 4px;
  }
  .hg-stat-divider {
    width: 1px;
    background: rgba(29,158,117,0.3);
    align-self: stretch;
  }

  .hg-scroll-indicator {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
    animation: fadeIn 1s ease forwards 1.4s;
  }
  .hg-scroll-indicator span {
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(232,245,240,0.35);
  }
  .hg-scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, rgba(29,158,117,0.6), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%,100% { opacity: 0.4; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(0.7); transform-origin: top; }
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* ─── SECTIONS ─── */
  .hg-section {
    padding: 7rem 2rem;
    max-width: 1160px;
    margin: 0 auto;
  }

  .hg-section-label {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #1d9e75;
    margin-bottom: 1rem;
    position: relative;
    padding-left: 2rem;
  }
  .hg-section-label::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 1px;
    background: #1d9e75;
  }

  .hg-section-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 600;
    line-height: 1.2;
    color: #e8f5f0;
    margin-bottom: 1.5rem;
  }

  .hg-section-body {
    font-size: 1.05rem;
    font-weight: 300;
    color: rgba(232,245,240,0.6);
    line-height: 1.8;
    max-width: 580px;
  }

  /* ─── WHO WE ARE ─── */
  .hg-who-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }
  @media(max-width: 820px) {
    .hg-who-grid { grid-template-columns: 1fr; gap: 3rem; }
  }

  .hg-image-frame {
    position: relative;
  }
  .hg-image-frame img {
    width: 100%;
    height: 420px;
    object-fit: cover;
    border-radius: 20px;
    filter: brightness(0.8) saturate(0.9);
    transition: filter 0.5s ease;
  }
  .hg-image-frame:hover img {
    filter: brightness(0.9) saturate(1.1);
  }
  .hg-image-frame::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 21px;
    background: linear-gradient(135deg, rgba(29,158,117,0.5) 0%, transparent 60%);
    z-index: 1;
    pointer-events: none;
  }
  .hg-image-frame::after {
    content: '';
    position: absolute;
    bottom: -16px;
    right: -16px;
    width: 80%;
    height: 80%;
    border: 1px solid rgba(29,158,117,0.2);
    border-radius: 20px;
    z-index: -1;
  }

  .hg-image-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(2,13,10,0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(29,158,117,0.3);
    border-radius: 12px;
    padding: 12px 16px;
    z-index: 2;
    text-align: center;
  }
  .hg-image-badge-num {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: #4ade80;
    line-height: 1;
  }
  .hg-image-badge-text {
    font-size: 11px;
    color: rgba(232,245,240,0.5);
    margin-top: 3px;
  }

  .hg-highlight-list {
    list-style: none;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .hg-highlight-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.95rem;
    color: rgba(232,245,240,0.65);
  }
  .hg-highlight-list li::before {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(29,158,117,0.15);
    border: 1px solid rgba(29,158,117,0.4);
    flex-shrink: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%231d9e75' stroke-width='3'%3E%3Cpath d='M5 12l5 5L19 7'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }

  /* ─── DIVIDER ─── */
  .hg-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(29,158,117,0.3), transparent);
    margin: 0 auto;
  }

  /* ─── FEATURES ─── */
  .hg-features-section {
    padding: 7rem 2rem;
    background: linear-gradient(to bottom, transparent, rgba(13,61,42,0.15), transparent);
  }
  .hg-features-header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 4rem;
  }
  .hg-features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5px;
    max-width: 1160px;
    margin: 0 auto;
    background: rgba(29,158,117,0.12);
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(29,158,117,0.12);
  }

  .hg-feature-card {
    background: #020d0a;
    padding: 2.5rem;
    position: relative;
    transition: background 0.3s ease;
    cursor: default;
    overflow: hidden;
  }
  .hg-feature-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(29,158,117,0.08) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .hg-feature-card:hover::before { opacity: 1; }
  .hg-feature-card:hover { background: #041208; }

  .hg-feature-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: rgba(29,158,117,0.1);
    border: 1px solid rgba(29,158,117,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 22px;
    transition: transform 0.3s ease, background 0.3s ease;
  }
  .hg-feature-card:hover .hg-feature-icon-wrap {
    transform: scale(1.1);
    background: rgba(29,158,117,0.2);
  }

  .hg-feature-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: #e8f5f0;
    margin-bottom: 0.75rem;
  }
  .hg-feature-desc {
    font-size: 0.9rem;
    font-weight: 300;
    color: rgba(232,245,240,0.5);
    line-height: 1.7;
  }
  .hg-feature-arrow {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(29,158,117,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: rgba(29,158,117,0.5);
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .hg-feature-card:hover .hg-feature-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* ─── MISSION ─── */
  .hg-mission-section {
    padding: 7rem 2rem;
    max-width: 1160px;
    margin: 0 auto;
  }
  .hg-mission-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }
  @media(max-width: 820px) {
    .hg-mission-grid { grid-template-columns: 1fr; gap: 3rem; }
    .hg-mission-img { order: -1; }
  }

  /* ─── TEAM ─── */
  .hg-team-section {
    padding: 7rem 2rem;
    text-align: center;
    background: linear-gradient(to bottom, transparent, rgba(13,61,42,0.1), transparent);
  }
  .hg-team-header .hg-section-label {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0;
  gap: 10px;
}

.hg-team-header .hg-section-label::before {
  position: static;      /* take it out of absolute so it sits inline */
  transform: none;
  flex-shrink: 0;
}
  .hg-team-grid {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1000px;
    margin: 0 auto;
  }
  .hg-team-card {
    background: rgba(13,40,28,0.4);
    border: 1px solid rgba(29,158,117,0.12);
    border-radius: 20px;
    padding: 2rem 1.75rem;
    width: 190px;
    transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .hg-team-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(to right, transparent, #1d9e75, transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .hg-team-card:hover {
    transform: translateY(-8px);
    border-color: rgba(29,158,117,0.35);
    background: rgba(13,61,42,0.5);
  }
  .hg-team-card:hover::before { opacity: 1; }

  .hg-team-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto 1.2rem;
    display: block;
    border: 2px solid rgba(29,158,117,0.3);
    transition: border-color 0.3s;
  }
  .hg-team-card:hover .hg-team-avatar {
    border-color: rgba(29,158,117,0.7);
  }
  .hg-team-avatar-placeholder {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(29,158,117,0.15);
    border: 2px solid rgba(29,158,117,0.3);
    margin: 0 auto 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: #4ade80;
  }

  .hg-team-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: #e8f5f0;
    margin-bottom: 4px;
  }
  .hg-team-role {
    font-size: 0.8rem;
    color: #1d9e75;
    font-weight: 400;
  }

  /* ─── VISION ─── */
  .hg-vision-section {
    padding: 7rem 2rem;
    max-width: 1160px;
    margin: 0 auto;
  }

  .hg-vision-card {
    background: linear-gradient(135deg, rgba(13,61,42,0.5) 0%, rgba(2,13,10,0.8) 100%);
    border: 1px solid rgba(29,158,117,0.2);
    border-radius: 28px;
    padding: 5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  @media(max-width: 820px) {
    .hg-vision-card { grid-template-columns: 1fr; padding: 3rem 2rem; gap: 2.5rem; }
  }
  .hg-vision-card::before {
    content: '';
    position: absolute;
    top: -100px; right: -100px;
    width: 350px; height: 350px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(29,158,117,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .hg-vision-quote {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 600;
    line-height: 1.4;
    color: #e8f5f0;
    position: relative;
    padding-left: 1.5rem;
    border-left: 3px solid #1d9e75;
  }

  /* ─── CTA ─── */
  .hg-cta {
    padding: 6rem 2rem 8rem;
    text-align: center;
    position: relative;
  }
  .hg-cta::before {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(29,158,117,0.4), transparent);
  }

  .hg-cta-inner {
    max-width: 600px;
    margin: 0 auto;
  }
  .hg-cta h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: #e8f5f0;
    margin-bottom: 1rem;
  }
  .hg-cta p {
    font-size: 1.05rem;
    font-weight: 300;
    color: rgba(232,245,240,0.5);
    margin-bottom: 2.5rem;
    line-height: 1.7;
  }

  .hg-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #1d9e75 0%, #0f6e56 100%);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    padding: 14px 32px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 0 0 0 rgba(29,158,117,0.4);
  }
  .hg-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(29,158,117,0.35);
  }
  .hg-btn-primary:active { transform: translateY(0); }

  .hg-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: transparent;
    color: rgba(232,245,240,0.65);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 400;
    padding: 14px 28px;
    border-radius: 50px;
    border: 1px solid rgba(232,245,240,0.15);
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
    margin-left: 1rem;
  }
  .hg-btn-ghost:hover {
    border-color: rgba(29,158,117,0.5);
    color: #4ade80;
  }

  /* ─── INTERSECTION OBSERVER TARGETS ─── */
  .hg-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .hg-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .hg-reveal-delay-1 { transition-delay: 0.1s; }
  .hg-reveal-delay-2 { transition-delay: 0.2s; }
  .hg-reveal-delay-3 { transition-delay: 0.3s; }
  .hg-reveal-delay-4 { transition-delay: 0.4s; }
  .hg-reveal-delay-5 { transition-delay: 0.5s; }
`;

const features = [
  {
    icon: "🩺",
    title: "Disease Prediction",
    desc: "Accurate predictions based on your symptoms using advanced AI algorithms trained on millions of clinical data points.",
  },
  {
    icon: "💰",
    title: "Cost Estimation",
    desc: "Transparent cost estimates for medical tests and treatments in your area, so you're never caught off guard.",
  },
  {
    icon: "🏠",
    title: "Home Treatment",
    desc: "Safe and effective home remedies for minor conditions to save you time and money without compromising care.",
  },
  {
    icon: "👨‍⚕️",
    title: "Doctor Consultation",
    desc: "Find nearby doctors based on your location, specialty needs, and budget with real-time availability.",
  },
  {
    icon: "🏥",
    title: "Hospital Recommendation",
    desc: "Discover nearby hospitals based on your location, medical needs, and insurance coverage instantly.",
  },
  {
    icon: "🧪",
    title: "Test Recommendation",
    desc: "Personalized suggestions for medical tests based on your symptoms and medical history for precise diagnosis.",
  },
];

const team = [
  { name: "Ravneet Kaur", role: "Back-end Developer", img: "./img/rav-pic.jpeg", initials: "RK" },
  { name: "Tavneet Kaur", role: "UI/UX Developer", img: "./img/tav-pic.png", initials: "TK" },
  { name: "Sehajpreet Singh", role: "Front-end Developer", img: "./img/sehaj.jpeg", initials: "SP" },
];

function TeamAvatar({ member }) {
  const [imgError, setImgError] = useState(false);
  if (imgError) {
    return (
      <div className="hg-team-avatar-placeholder">{member.initials}</div>
    );
  }
  return (
    <img
      className="hg-team-avatar"
      src={member.img}
      alt={member.name}
      onError={() => setImgError(true)}
    />
  );
}

export default function AboutUsComp() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => revealRefs.current.forEach((el) => el && observer.unobserve(el));
  }, []);

  const addRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="hg-root">

        {/* ─── HERO ─── */}
        <section className="hg-hero">
          <div className="hg-hero-bg" />
          <div className="hg-grid-overlay" />
          <div className="hg-orb hg-orb-1" />
          <div className="hg-orb hg-orb-2" />
          <div className="hg-orb hg-orb-3" />

          <div className="hg-hero-content">
            <div className="hg-badge">
              <span className="hg-badge-dot" />
              AI-Powered Healthcare
            </div>

            <h1 className="hg-hero-title">
              Redefining Health<br />with <span>Intelligence</span>
            </h1>

            <p className="hg-hero-subtitle">
              Health Guardian empowers you to take control of your well-being
              through cutting-edge AI — from disease prediction to personalized
              treatment recommendations.
            </p>

            <div className="hg-hero-stats">
              <div className="hg-stat-item">
                <span className="hg-stat-num">98%</span>
                <span className="hg-stat-label">Prediction Accuracy</span>
              </div>
              <div className="hg-stat-divider" />
              <div className="hg-stat-item">
                <span className="hg-stat-num">10K+</span>
                <span className="hg-stat-label">Active Users</span>
              </div>
              <div className="hg-stat-divider" />
              <div className="hg-stat-item">
                <span className="hg-stat-num">500+</span>
                <span className="hg-stat-label">Conditions Covered</span>
              </div>
            </div>
          </div>

          <div className="hg-scroll-indicator">
            <span>Scroll</span>
            <div className="hg-scroll-line" />
          </div>
        </section>

        {/* ─── WHO WE ARE ─── */}
        <section className="hg-section">
          <div className="hg-who-grid">
            <div ref={addRef} className="hg-reveal">
              <div className="hg-section-label">Who We Are</div>
              <h2 className="hg-section-heading">Your trusted AI healthcare companion</h2>
              <p className="hg-section-body">
                Welcome to Health Guardian — dedicated to revolutionizing the way you
                manage your health. We combine advanced artificial intelligence with
                clinical expertise to provide accurate predictions, transparent cost
                estimates, and personalized care recommendations.
              </p>
              <ul className="hg-highlight-list">
                <li>Clinically validated AI models</li>
                <li>Real-time doctor and hospital discovery</li>
                <li>Secure, privacy-first health data handling</li>
                <li>Available 24/7 from any device</li>
              </ul>
            </div>

            <div ref={addRef} className="hg-reveal hg-reveal-delay-2">
              <div className="hg-image-frame">
                <img src="./img/p6.jpg" alt="Health Guardian Introduction" />
                <div className="hg-image-badge">
                  <div className="hg-image-badge-num">AI</div>
                  <div className="hg-image-badge-text">Powered</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="hg-divider" />

        {/* ─── FEATURES ─── */}
        <section className="hg-features-section">
          <div ref={addRef} className="hg-reveal hg-features-header">
           <div className="hg-section-label">
  What We Offer
</div>
            <h2 className="hg-section-heading" style={{ textAlign: "center", maxWidth: "none" }}>
              Everything you need for smarter health decisions
            </h2>
          </div>

          <div className="hg-features-grid">
            {features.map((f, i) => (
              <div
                key={i}
                ref={addRef}
                className={`hg-feature-card hg-reveal hg-reveal-delay-${(i % 3) + 1}`}
              >
                <div className="hg-feature-icon-wrap">{f.icon}</div>
                <div className="hg-feature-title">{f.title}</div>
                <p className="hg-feature-desc">{f.desc}</p>
                <div className="hg-feature-arrow">→</div>
              </div>
            ))}
          </div>
        </section>

        <div className="hg-divider" />

        {/* ─── MISSION ─── */}
        <section className="hg-mission-section">
          <div className="hg-mission-grid">
            <div ref={addRef} className="hg-reveal hg-mission-img">
              <div className="hg-image-frame">
                <img src="./img/p1.jpg" alt="Health Guardian Mission" />
                <div className="hg-image-badge">
                  <div className="hg-image-badge-num">2024</div>
                  <div className="hg-image-badge-text">Founded</div>
                </div>
              </div>
            </div>

            <div ref={addRef} className="hg-reveal hg-reveal-delay-2">
              <div className="hg-section-label">Our Mission</div>
              <h2 className="hg-section-heading">Democratizing access to quality healthcare</h2>
              <p className="hg-section-body">
                Our mission is to empower individuals to take control of their health
                through cutting-edge technology. By leveraging artificial intelligence
                and machine learning, we aim to provide reliable health insights, reduce
                healthcare costs, and improve the overall quality of life for our users.
              </p>
              <p className="hg-section-body" style={{ marginTop: "1.25rem" }}>
                We believe that access to quality healthcare guidance should not be a
                privilege — it should be a right available to everyone, everywhere.
              </p>
            </div>
          </div>
        </section>

        <div className="hg-divider" />

        {/* -── TEAM ─── */}
       {/* -── TEAM ─── */}
<section className="hg-team-section">
  <div ref={addRef} className="hg-reveal hg-team-header">
    <div className="hg-section-label">
      The Team
    </div>
            <h2 className="hg-section-heading" style={{ textAlign: "center", maxWidth: "none" }}>
              Built by passionate people
            </h2>
            <p className="hg-section-body" style={{ margin: "0 auto", textAlign: "center" }}>
              A dedicated team of healthcare professionals, developers, and engineers
              who care deeply about improving healthcare outcomes.
            </p>
          </div>

          <div className="hg-team-grid">
            {team.map((member, i) => (
              <div
                key={i}
                ref={addRef}
                className={`hg-team-card hg-reveal hg-reveal-delay-${i + 1}`}
              >
                <TeamAvatar member={member} />
                <div className="hg-team-name">{member.name}</div>
                <div className="hg-team-role">{member.role}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="hg-divider" />

        {/* ─── VISION ─── */}
        <section className="hg-vision-section">
          <div ref={addRef} className="hg-reveal">
            <div className="hg-section-label">Our Vision</div>
          </div>
          <div ref={addRef} className="hg-reveal hg-reveal-delay-1 hg-vision-card">
            <p className="hg-vision-quote">
              "A world where everyone has access to affordable, reliable, and
              intelligent healthcare — wherever they are."
            </p>
            <div>
              <p className="hg-section-body">
                We continuously innovate and improve our platform, striving to be
                the go-to resource for health management. By bridging the gap
                between cutting-edge AI and everyday healthcare needs, we empower
                users to make informed decisions about their well-being.
              </p>
              <div style={{ marginTop: "2rem", display: "flex", gap: "2rem" }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#4ade80" }}>50+</div>
                  <div style={{ fontSize: "12px", color: "rgba(232,245,240,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "3px" }}>Conditions tracked</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#4ade80" }}>24/7</div>
                  <div style={{ fontSize: "12px", color: "rgba(232,245,240,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "3px" }}>Availability</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#4ade80" }}>100%</div>
                  <div style={{ fontSize: "12px", color: "rgba(232,245,240,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "3px" }}>Privacy-first</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="hg-cta">
          <div ref={addRef} className="hg-reveal hg-cta-inner">
            <h2>Start Your Health Journey Today</h2>
            <p>
              Join thousands of users who have already discovered the benefits
              of AI-powered healthcare guidance.
            </p>
            <div>
             <a href="/chatbot" className="hg-btn-primary">
              Get Started →
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}