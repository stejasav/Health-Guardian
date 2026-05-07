import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { FaCheck, FaStar, FaArrowRight, FaTimes } from "react-icons/fa";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .hg-home {
    font-family: 'DM Sans', sans-serif;
    background: #020d0a;
    color: #e8f5f0;
    overflow-x: hidden;
  }

  .hg-bg-layer {
    position: fixed; inset: 0;
    pointer-events: none; z-index: 0;
  }
  .hg-bg-layer::before {
    content: '';
    position: absolute;
    top: -20%; left: -10%;
    width: 55vw; height: 55vw;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(29,158,117,0.11) 0%, transparent 70%);
    animation: bgOrb1 20s ease-in-out infinite;
  }
  .hg-bg-layer::after {
    content: '';
    position: absolute;
    bottom: -15%; right: -8%;
    width: 45vw; height: 45vw;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(15,110,86,0.09) 0%, transparent 70%);
    animation: bgOrb2 26s ease-in-out infinite;
  }
  @keyframes bgOrb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(35px,-25px)} }
  @keyframes bgOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,30px)} }

  .hg-grid {
    position: fixed; inset: 0;
    pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(29,158,117,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(29,158,117,0.04) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 90% 80% at 50% 30%, black 10%, transparent 75%);
  }

  .hg-reveal {
    opacity: 0; transform: translateY(30px);
    transition: opacity 0.85s ease, transform 0.85s ease;
  }
  .hg-reveal.visible { opacity: 1; transform: translateY(0); }
  .hg-rd1{transition-delay:0.05s} .hg-rd2{transition-delay:0.15s}
  .hg-rd3{transition-delay:0.25s} .hg-rd4{transition-delay:0.35s}
  .hg-rd5{transition-delay:0.45s} .hg-rd6{transition-delay:0.55s}

  .hg-container { max-width: 1140px; margin: 0 auto; padding: 0 2rem; }

  .hg-section-label {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.2em;
    text-transform: uppercase; color: #1d9e75; margin-bottom: 1rem;
  }
  .hg-section-label::before { content:''; width:20px; height:1px; background:#1d9e75; }

  .hg-section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700; color: #e8f5f0;
    line-height: 1.15; margin-bottom: 1rem;
  }
  .hg-section-title span {
    background: linear-gradient(135deg, #4ade80 0%, #1d9e75 60%, #5dcaa5 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hg-section-sub {
    font-size: 1rem; font-weight: 300;
    color: rgba(232,245,240,0.5); line-height: 1.75; max-width: 540px;
  }
  .hg-divider {
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(29,158,117,0.25), transparent);
  }

  /* HERO */
  .hg-hero {
    position: relative; z-index: 1;
    min-height: 100vh; display: flex;
    align-items: center; padding: 6rem 2rem 4rem;
  }
  .hg-hero-inner {
    max-width: 1140px; margin: 0 auto; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 4rem; align-items: center;
  }
  @media(max-width:860px){
    .hg-hero-inner{grid-template-columns:1fr;text-align:center}
    .hg-hero-checks{align-items:center}
    .hg-hero-btns{justify-content:center}
    .hg-hero-img{order:-1}
  }

  .hg-hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(29,158,117,0.1); border: 1px solid rgba(29,158,117,0.25);
    border-radius: 50px; padding: 7px 18px;
    font-size: 12px; font-weight: 500; color: #4ade80;
    letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1.5rem;
    opacity: 0; animation: fadeUp 0.7s ease forwards 0.2s;
  }
  .hg-badge-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
    animation: blink 2s ease-in-out infinite;
  }
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}

  .hg-hero-h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.6rem, 5.5vw, 4.8rem);
    font-weight: 700; line-height: 1.08; margin-bottom: 1.75rem;
    opacity: 0; animation: fadeUp 0.8s ease forwards 0.35s;
    color: #e8f5f0;
  }
  .hg-hero-h1 span {
    background: linear-gradient(135deg, #4ade80 0%, #1d9e75 60%, #5dcaa5 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .hg-hero-checks {
    display: flex; flex-direction: column; gap: 12px;
    margin-bottom: 2.5rem;
    opacity: 0; animation: fadeUp 0.8s ease forwards 0.5s;
  }
  .hg-check-item {
    display: flex; align-items: center; gap: 12px;
    font-size: 0.95rem; font-weight: 400; color: rgba(232,245,240,0.7);
  }
  .hg-check-icon {
    width: 22px; height: 22px; border-radius: 50%;
    background: rgba(29,158,117,0.15); border: 1px solid rgba(29,158,117,0.35);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; color: #4ade80; font-size: 10px;
  }

  .hg-hero-btns {
    display: flex; gap: 1rem; flex-wrap: wrap;
    opacity: 0; animation: fadeUp 0.8s ease forwards 0.65s;
  }

  .hg-btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: linear-gradient(135deg, #1d9e75 0%, #0f6e56 100%);
    color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem; font-weight: 500; padding: 14px 28px;
    border-radius: 50px; border: none; cursor: pointer;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 6px 24px rgba(29,158,117,0.35);
  }
  .hg-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(29,158,117,0.45); }

  .hg-btn-ghost {
    display: inline-flex; align-items: center; gap: 10px;
    background: transparent; color: rgba(232,245,240,0.6);
    font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
    font-weight: 400; padding: 14px 24px; border-radius: 50px;
    border: 1px solid rgba(232,245,240,0.12);
    cursor: pointer; text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
  }
  .hg-btn-ghost:hover { border-color: rgba(29,158,117,0.4); color: #4ade80; }

  .hg-hero-img {
    opacity: 0; animation: fadeUp 1s ease forwards 0.5s; position: relative;
  }
  .hg-hero-img img {
    width: 100%; border-radius: 20px;
    filter: drop-shadow(0 20px 60px rgba(29,158,117,0.2));
    animation: floatImg 4s ease-in-out infinite;
  }
  @keyframes floatImg {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-14px); }
  }
  .hg-hero-img-ring { display: none; }
  @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}

  /* TRUST STRIP */
  .hg-trust { position: relative; z-index: 1; padding: 3rem 0; overflow: hidden; }
  .hg-trust-label {
    text-align: center; font-size: 11px; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(232,245,240,0.25); margin-bottom: 1.5rem;
  }
  .hg-logo-mask {
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
  }
  .hg-logo-track {
    display: flex; gap: 3rem;
    animation: scrollLogos 30s linear infinite; width: max-content;
  }
  .hg-trust:hover .hg-logo-track { animation-play-state: paused; }
  @keyframes scrollLogos{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  .hg-logo-item { height: 36px; display: flex; align-items: center; flex-shrink: 0; }
  .hg-logo-item img {
    height: 100%; width: auto; object-fit: contain;
    filter: brightness(0) invert(1); opacity: 0.22; transition: opacity 0.3s;
  }
  .hg-logo-item:hover img { opacity: 0.55; }

  /* STATS */
  .hg-stats-section { position: relative; z-index: 1; padding: 5rem 2rem; }
  .hg-stats-header { text-align: center; margin-bottom: 3.5rem; }
  .hg-stats-grid {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 1.5px; background: rgba(29,158,117,0.1);
    border-radius: 20px; overflow: hidden;
    border: 1px solid rgba(29,158,117,0.1);
    max-width: 860px; margin: 0 auto;
  }
  @media(max-width:600px){.hg-stats-grid{grid-template-columns:1fr}}
  .hg-stat-card {
    background: #020d0a; padding: 2.5rem 2rem; text-align: center;
    position: relative; transition: background 0.3s; overflow: hidden;
  }
  .hg-stat-card::before {
    content:''; position:absolute; inset:0;
    background: linear-gradient(135deg,rgba(29,158,117,0.07) 0%,transparent 60%);
    opacity:0; transition:opacity 0.3s;
  }
  .hg-stat-card:hover{background:#041208}
  .hg-stat-card:hover::before{opacity:1}
  .hg-stat-icon{font-size:26px;margin-bottom:1rem}
  .hg-stat-num{
    font-family:'Playfair Display',serif; font-size:2.4rem; font-weight:700;
    color:#4ade80; line-height:1; margin-bottom:6px;
  }
  .hg-stat-label{font-size:13px;font-weight:300;color:rgba(232,245,240,0.45);line-height:1.5}

  /* HOW IT WORKS */
  .hg-hiw{position:relative;z-index:1;padding:6rem 2rem}
  .hg-hiw-header{text-align:center;margin-bottom:4rem}
  .hg-hiw-header .hg-section-label{justify-content:center}
  .hg-hiw-header .hg-section-sub{margin:0 auto;text-align:center}
  .hg-steps{display:flex;flex-direction:column;gap:1.5rem;max-width:960px;margin:0 auto}
  .hg-step {
    display: grid; grid-template-columns: auto 1fr auto;
    gap: 2rem; align-items: center;
    background: rgba(4,18,13,0.5); border: 1px solid rgba(29,158,117,0.12);
    border-radius: 20px; padding: 2rem 2.5rem;
    transition: border-color 0.3s, background 0.3s, transform 0.3s;
    position: relative; overflow: hidden;
  }
  .hg-step::before {
    content:''; position:absolute; inset:0;
    background: linear-gradient(90deg,rgba(29,158,117,0.06) 0%,transparent 50%);
    opacity:0; transition:opacity 0.3s;
  }
  .hg-step:hover{border-color:rgba(29,158,117,0.3);background:rgba(13,40,28,0.5);transform:translateX(6px)}
  .hg-step:hover::before{opacity:1}
  @media(max-width:700px){
    .hg-step{grid-template-columns:auto 1fr}
    .hg-step-img{display:none}
  }
  .hg-step-num {
    width:52px;height:52px;border-radius:16px;
    background:linear-gradient(135deg,rgba(29,158,117,0.15) 0%,rgba(15,110,86,0.1) 100%);
    border:1px solid rgba(29,158,117,0.3);
    display:flex;align-items:center;justify-content:center;
    font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;
    color:#4ade80;flex-shrink:0;
  }
  .hg-step-body h3{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:600;color:#e8f5f0;margin-bottom:6px}
  .hg-step-body p{font-size:0.9rem;font-weight:300;color:rgba(232,245,240,0.5);line-height:1.65}
  .hg-step-img{
    width:140px;height:90px;border-radius:10px;overflow:hidden;
    flex-shrink:0;border:1px solid rgba(29,158,117,0.15);
    cursor:pointer;
  }
  .hg-step-img img{
    width:100%;height:100%;object-fit:cover;
    transition:transform 0.3s,filter 0.3s;filter:brightness(0.85);
    cursor:pointer;
  }
  .hg-step-img:hover img{transform:scale(1.06);filter:brightness(1)}

  /* FEATURES */
  .hg-features{
    position:relative;z-index:1;padding:6rem 2rem;
    background:linear-gradient(to bottom,transparent,rgba(13,61,42,0.1),transparent);
  }
  .hg-features-header{text-align:center;margin-bottom:4rem}
  .hg-features-header .hg-section-label{justify-content:center}
  .hg-features-header .hg-section-sub{margin:0 auto;text-align:center}
  .hg-features-grid{
    display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
    gap:1.5px;background:rgba(29,158,117,0.1);
    border-radius:20px;overflow:hidden;
    border:1px solid rgba(29,158,117,0.1);
    max-width:1000px;margin:0 auto;
  }
  .hg-feat-card{
    background:#020d0a;padding:2.25rem 2rem;
    position:relative;overflow:hidden;transition:background 0.3s;cursor:default;
  }
  .hg-feat-card::before{
    content:'';position:absolute;inset:0;
    background:linear-gradient(135deg,rgba(29,158,117,0.07) 0%,transparent 60%);
    opacity:0;transition:opacity 0.3s;
  }
  .hg-feat-card:hover{background:#041208}
  .hg-feat-card:hover::before{opacity:1}
  .hg-feat-icon{
    width:48px;height:48px;border-radius:13px;
    background:rgba(29,158,117,0.1);border:1px solid rgba(29,158,117,0.22);
    display:flex;align-items:center;justify-content:center;
    font-size:20px;margin-bottom:1.25rem;
    transition:transform 0.3s,background 0.3s;
  }
  .hg-feat-card:hover .hg-feat-icon{transform:scale(1.1);background:rgba(29,158,117,0.18)}
  .hg-feat-title{font-size:1rem;font-weight:600;color:#e8f5f0;margin-bottom:8px}
  .hg-feat-desc{font-size:0.88rem;font-weight:300;color:rgba(232,245,240,0.45);line-height:1.65}

  /* TESTIMONIALS */
  .hg-testimonials{position:relative;z-index:1;padding:6rem 2rem}
  .hg-test-header{text-align:center;margin-bottom:4rem}
  .hg-test-header .hg-section-label{justify-content:center}
  .hg-test-header .hg-section-sub{margin:0 auto;text-align:center}
  .hg-test-grid{
    display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
    gap:1.5rem;max-width:1000px;margin:0 auto;
  }
  .hg-test-card{
    background:rgba(4,18,13,0.6);border:1px solid rgba(29,158,117,0.12);
    border-radius:20px;padding:2rem;position:relative;
    transition:border-color 0.3s,transform 0.3s,background 0.3s;overflow:hidden;
  }
  .hg-test-card::before{
    content:'"';position:absolute;top:12px;right:20px;
    font-family:'Playfair Display',serif;font-size:5rem;
    color:rgba(29,158,117,0.1);line-height:1;pointer-events:none;
  }
  .hg-test-card:hover{border-color:rgba(29,158,117,0.3);transform:translateY(-6px);background:rgba(13,40,28,0.5)}
  .hg-test-stars{display:flex;gap:3px;color:#f59e0b;font-size:13px;margin-bottom:1rem}
  .hg-test-quote{
    font-size:0.93rem;font-weight:300;color:rgba(232,245,240,0.65);
    line-height:1.75;margin-bottom:1.5rem;font-style:italic;
  }
  .hg-test-author{display:flex;align-items:center;gap:10px}
  .hg-test-avatar{
    width:36px;height:36px;border-radius:50%;
    background:linear-gradient(135deg,#1d9e75,#0f6e56);
    display:flex;align-items:center;justify-content:center;
    font-size:14px;font-weight:600;color:#fff;flex-shrink:0;
  }
  .hg-test-name{font-size:0.88rem;font-weight:500;color:rgba(232,245,240,0.7)}
  .hg-test-tag{font-size:11px;color:#1d9e75;margin-top:1px}

  /* CTA */
  .hg-cta{
    position:relative;z-index:1;padding:6rem 2rem 8rem;
    text-align:center;border-top:1px solid rgba(29,158,117,0.1);
  }
  .hg-cta h2{
    font-family:'Playfair Display',serif;
    font-size:clamp(2rem,4vw,3.2rem);font-weight:700;color:#e8f5f0;
    margin-bottom:1rem;max-width:600px;margin-left:auto;margin-right:auto;
  }
  .hg-cta p{
    font-size:1rem;font-weight:300;color:rgba(232,245,240,0.45);
    margin-bottom:2.5rem;max-width:480px;
    margin-left:auto;margin-right:auto;line-height:1.7;
  }

  /* MODAL — portal renders outside .hg-home so overflow:hidden never clips it */
  .hg-modal-overlay{
    position:fixed;inset:0;
    background:rgba(0,0,0,0.88);
    display:flex;align-items:center;justify-content:center;
    z-index:99999;cursor:pointer;
    animation:modalFadeIn 0.25s ease forwards;
  }
  @keyframes modalFadeIn{from{opacity:0}to{opacity:1}}
  .hg-modal-inner{
    position:relative;
    max-width:90vw;
    max-height:88vh;
    cursor:default;
    animation:modalScaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards;
  }
  @keyframes modalScaleIn{from{transform:scale(0.88);opacity:0}to{transform:scale(1);opacity:1}}
  .hg-modal-close{
    position:absolute;top:-44px;right:0;
    width:36px;height:36px;
    background:rgba(255,255,255,0.08);
    border:1px solid rgba(255,255,255,0.15);
    border-radius:50%;color:rgba(255,255,255,0.7);
    font-size:14px;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    transition:background 0.2s,color 0.2s;
  }
  .hg-modal-close:hover{background:rgba(244,63,94,0.2);color:#f43f5e}
  .hg-modal-img{
    display:block;
    max-width:90vw;
    max-height:85vh;
    width:auto;
    height:auto;
    object-fit:contain;
    border-radius:12px;
    box-shadow:0 24px 80px rgba(0,0,0,0.6);
    border:1px solid rgba(29,158,117,0.2);
  }
`;

const features = [
  { icon: "🩺", title: "Disease Prediction",      desc: "Accurate AI-powered predictions based on your symptoms" },
  { icon: "💰", title: "Cost Estimation",          desc: "Transparent cost estimates for medical treatments" },
  { icon: "🏠", title: "Home Treatment",           desc: "Safe remedies for minor conditions at home" },
  { icon: "👨‍⚕️", title: "Doctor Consultation",  desc: "Connect with qualified healthcare professionals" },
  { icon: "🏥", title: "Hospital Recommendation",  desc: "Find nearby hospitals based on your needs" },
  { icon: "🧪", title: "Test Recommendation",      desc: "Get suggestions for appropriate medical tests" },
];

const testimonials = [
  { quote: "Health Guardian helped me identify symptoms I didn't realize were connected. My doctor was impressed with how thorough the report was.", name: "Riya Sharma",    initials: "RS" },
  { quote: "The cost estimation feature saved me hundreds of dollars by helping me compare treatment options in my area.",                          name: "Ajay Kumar",     initials: "AK" },
  { quote: "As someone with chronic conditions, Health Guardian helps me track my symptoms and communicate better with my doctors.",               name: "Birinder Singh", initials: "BS" },
];

const logoSrcs = ["c1.png","c2.png","c3.png","c4.svg","c5.png","c6.svg","c7.png","c8.png","c9.png","c10.png","c11.png","c12.png","c13.png","c14.png","c15.png"];

// ── Modal rendered via portal so it's never clipped by overflow:hidden ──
function Modal({ src, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return ReactDOM.createPortal(
    <div className="hg-modal-overlay" onClick={onClose}>
      <div className="hg-modal-inner" onClick={(e) => e.stopPropagation()}>
        <button className="hg-modal-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
        <img className="hg-modal-img" src={src} alt="Preview" />
      </div>
    </div>,
    document.body
  );
}

export default function Home() {
  const [modalImage, setModalImage] = useState(null);
  const revealRefs = useRef([]);

  const openModal  = (src) => setModalImage(src);
  const closeModal = ()    => setModalImage(null);

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    revealRefs.current.forEach((el) => el && obs.observe(el));
    return () => revealRefs.current.forEach((el) => el && obs.unobserve(el));
  }, []);

  const r = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };
  const allLogos = [...logoSrcs, ...logoSrcs];

  return (
    <>
      <style>{styles}</style>
      <div className="hg-home">
        <div className="hg-bg-layer" />
        <div className="hg-grid" />

        {/* HERO */}
        <section className="hg-hero">
          <div className="hg-hero-inner">
            <div>
              <div className="hg-hero-badge"><span className="hg-badge-dot" />AI-Powered Healthcare</div>
              <h1 className="hg-hero-h1">Your personal <span>health</span> guardian</h1>
              <div className="hg-hero-checks">
                {["Analyze your symptoms with AI","Get accurate health insights","Personalized recommendations","Prepare for doctor visits"].map((t,i)=>(
                  <div className="hg-check-item" key={i}>
                    <div className="hg-check-icon"><FaCheck /></div>{t}
                  </div>
                ))}
              </div>
              <div className="hg-hero-btns">
                <a href="/chatbot" style={{textDecoration:"none"}}>
                  <button className="hg-btn-primary">Try Our Chatbot <FaArrowRight /></button>
                </a>
              </div>
            </div>
            <div className="hg-hero-img">
              <div className="hg-hero-img-ring" />
              <img src="./img/home-screen-image.png" alt="Health Guardian" />
            </div>
          </div>
        </section>

        <div className="hg-divider" />

        {/* TRUST */}
        <section className="hg-trust">
          <div className="hg-trust-label">Trusted by leading health organisations</div>
          <div className="hg-logo-mask">
            <div className="hg-logo-track">
              {allLogos.map((src,i)=>(
                <div className="hg-logo-item" key={i}>
                  <img src={`./img/trusted-companies/${src}`} alt={`partner-${i}`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="hg-divider" />

        {/* STATS */}
        <section className="hg-stats-section">
          <div className="hg-container">
            <div ref={r} className="hg-reveal hg-stats-header">
              <div className="hg-section-label" style={{justifyContent:"center"}}>By the numbers</div>
              <h2 className="hg-section-title" style={{textAlign:"center",maxWidth:"none"}}>About Health Guardian</h2>
              <p className="hg-section-sub" style={{margin:"0 auto",textAlign:"center"}}>Empowering you to take control of your health with AI-driven solutions.</p>
            </div>
            <div className="hg-stats-grid">
              {[
                {icon:"🧠",num:"50,000+",label:"hours of medical expertise"},
                {icon:"📋",num:"5M+",    label:"assessments completed"},
                {icon:"👥",num:"100,000+",label:"monthly active users"}
              ].map((s,i)=>(
                <div ref={r} key={i} className={`hg-reveal hg-rd${i+1} hg-stat-card`}>
                  <div className="hg-stat-icon">{s.icon}</div>
                  <div className="hg-stat-num">{s.num}</div>
                  <div className="hg-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="hg-divider" />

        {/* HOW IT WORKS */}
        <section className="hg-hiw">
          <div className="hg-container">
            <div ref={r} className="hg-reveal hg-hiw-header">
              <div className="hg-section-label">How It Works</div>
              <h2 className="hg-section-title">How Health Guardian Works</h2>
              <p className="hg-section-sub">Get personalized health insights in just a few minutes</p>
            </div>
            <div className="hg-steps">
              {[
                {num:"1",title:"Enter Your Symptoms",    desc:"Start by describing what you're feeling in simple terms",             img:"./img/enter.png"},
                {num:"2",title:"Answer Quick Questions", desc:"Our AI will ask relevant follow-up questions to refine its analysis",  img:"./img/answer.png"},
                {num:"3",title:"Get Your Results",       desc:"Receive personalized health insights and recommendations",             img:"./img/result.png"},
              ].map((step,i)=>(
                <div ref={r} key={i} className={`hg-reveal hg-rd${i+1} hg-step`}>
                  <div className="hg-step-num">{step.num}</div>
                  <div className="hg-step-body"><h3>{step.title}</h3><p>{step.desc}</p></div>
                  <div className="hg-step-img" onClick={() => openModal(step.img)}>
                    <img src={step.img} alt={`Step ${step.num}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="hg-divider" />

        {/* TESTIMONIALS */}
        <section className="hg-testimonials">
          <div className="hg-container">
            <div ref={r} className="hg-reveal hg-test-header">
              <div className="hg-section-label">Testimonials</div>
              <h2 className="hg-section-title">Trusted by Millions</h2>
              <p className="hg-section-sub">Join thousands who have discovered the benefits of AI-powered healthcare</p>
            </div>
            <div className="hg-test-grid">
              {testimonials.map((t,i)=>(
                <div ref={r} key={i} className={`hg-reveal hg-rd${i+1} hg-test-card`}>
                  <div className="hg-test-stars">{[...Array(5)].map((_,j)=><FaStar key={j}/>)}</div>
                  <p className="hg-test-quote">"{t.quote}"</p>
                  <div className="hg-test-author">
                    <div className="hg-test-avatar">{t.initials}</div>
                    <div>
                      <div className="hg-test-name">{t.name}</div>
                      <div className="hg-test-tag">Verified User</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="hg-divider" />

        {/* CTA */}
        <section className="hg-cta">
          <div ref={r} className="hg-reveal">
            <h2>Start Your Health Journey Today</h2>
            <p>Join thousands of users who have already discovered the benefits of AI-powered healthcare.</p>
            <a href="/chatbot" className="hg-btn-primary">
              Get Started →
            </a>
          </div>
        </section>

      </div>

      {/* MODAL — rendered via portal directly into document.body,
          completely outside .hg-home and its overflow:hidden */}
      {modalImage && <Modal src={modalImage} onClose={closeModal} />}
    </>
  );
}