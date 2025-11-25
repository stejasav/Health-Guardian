import React, { useEffect, useState } from "react";
import { FaCheck, FaStar, FaArrowRight, FaTimes } from "react-icons/fa";

export default function Home() {

  const [modalImage, setModalImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);


  useEffect(() => {
    const sections = document.querySelectorAll(".animated-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0. }
    );

    sections.forEach((section) => {
      section.style.opacity = 0.1;
      section.style.transform = "translateY(30px)";
      section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="home-page">
      {/* Floating Particles Background */}
      <div className="particles">
        {[...Array(32)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero-section animated-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Your personal <span className="text-rotator">health</span>{" "}
              guardian
            </h1>
            <div className="hero-features">
              <ul>
                <li>
                  {" "}
                  <FaCheck className="icon" /> Analyze your symptoms with AI{" "}
                </li>
                <li>
                  {" "}
                  <FaCheck className="icon" /> Get accurate health insights{" "}
                </li>
                <li>
                  {" "}
                  <FaCheck className="icon" /> Personalized recommendations{" "}
                </li>
                <li>
                  {" "}
                  <FaCheck className="icon" /> Prepare for doctor visits{" "}
                </li>
              </ul>
            </div>
            <div className="hero-buttons">
              {/* <button className="primary-button">
                Start Health Assessment <FaArrowRight className="button-icon" />
              </button> */}
              <a href="/chatbot">
                {/* <button className="secondary-button">
                  Try Our Chatbot <FaArrowRight className="button-icon" />
                </button> */}
                <button className="primary-link">
                  Try Our Chatbot <FaArrowRight className="button-icon" />
                </button>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="./img/home-screen-image.png"
              alt="Health Guardian illustration"
            />
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section animated-section">
        <div className="container">
          <h2 className="section-title">Trusted by Health Professionals</h2>
          <div className="slider-logos">
            <div className="list">
              <div className="item-logo" style={{ "--position": 1 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c1.png"
                  alt="Trusted Company 1"
                />
              </div>
              <div className="item-logo" style={{ "--position": 2 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c2.png"
                  alt="Trusted Company 2"
                />
              </div>
              <div className="item-logo" style={{ "--position": 3 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c3.png"
                  alt="Trusted Company 3"
                />
              </div>
              <div className="item-logo" style={{ "--position": 4 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c4.svg"
                  alt="Trusted Company 4"
                />
              </div>
              <div className="item-logo" style={{ "--position": 5 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c5.png"
                  alt="Trusted Company 5"
                />
              </div>
              <div className="item-logo" style={{ "--position": 6 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c6.svg"
                  alt="Trusted Company 6"
                />
              </div>
              <div className="item-logo" style={{ "--position": 7 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c7.png"
                  alt="Trusted Company 7"
                />
              </div>
              <div className="item-logo c8" style={{ "--position": 8 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c8.png"
                  alt="Trusted Company 8"
                />
              </div>
              <div className="item-logo" style={{ "--position": 9 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c9.png"
                  alt="Trusted Company 9"
                />
              </div>
              <div className="item-logo" style={{ "--position": 10 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c10.png"
                  alt="Trusted Company 10"
                />
              </div>
              <div className="item-logo" style={{ "--position": 11 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c11.png"
                  alt="Trusted Company 11"
                />
              </div>
              <div className="item-logo" style={{ "--position": 12 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c12.png"
                  alt="Trusted Company 12"
                />
              </div>
              <div className="item-logo" style={{ "--position": 13 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c13.png"
                  alt="Trusted Company 13"
                />
              </div>
              <div className="item-logo" style={{ "--position": 14 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c14.png"
                  alt="Trusted Company 14"
                />{" "}
              </div>
              <div className="item-logo" style={{ "--position": 15 }}>
                {" "}
                <img
                  src="./img/trusted-companies/c15.png"
                  alt="Trusted Company 15"
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section animated-section">
        <div className="container">
          <div className="section-header">
            <h2>About Health Guardian</h2>
            <p>
              Empowering you to take control of your health with AI-driven
              solutions.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">hours of medical expertise</div>
              <div className="stat-icon">
                <i
                  className="fas fa-brain fa-2x"
                  style={{ color: "#4ade80" }}
                ></i>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-number">5M+</div>
              <div className="stat-label">assessments completed</div>
              <div className="stat-icon">
                <i
                  className="fas fa-clipboard-check fa-2x"
                  style={{ color: "#4ade80" }}
                ></i>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-number">100,000+</div>
              <div className="stat-label">monthly active users</div>
              <div className="stat-icon">
                <i
                  className="fas fa-users fa-2x"
                  style={{ color: "#4ade80" }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works animated-section">
        <div className="container">
          <h2 className="section-title">How Health Guardian Works</h2>
          <p className="section-subtitle">
            Get personalized health insights in just a few minutes
          </p>

          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>
                  <span className="text-rotator">Enter</span> Your Symptoms
                </h3>
                <p>Start by describing what you're feeling in simple terms</p>
              </div>
              <div className="step-image">
                <img
                  src="./img/enter.png"
                  alt="Step 1"
                  onClick={() => openModal("./img/enter.png")}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>

            <div className="step-card reverse">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>
                  <span className="text-rotator">Answer</span> Quick Questions
                </h3>
                <p>Our AI will ask relevant follow-up questions</p>
              </div>
              <div className="step-image">
                <img
                  src="./img/answer.png"
                  alt="Step 2"
                  onClick={() => openModal("./img/answer.png")}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>
                  Get Your <span className="text-rotator">Results</span>
                </h3>
                <p>Receive personalized health insights and recommendations</p>
              </div>
              <div className="step-image">
                <img
                  src="./img/result.png"
                  alt="Step 3"
                  onClick={() => openModal("./img/result.png")}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section animated-section">
        <div className="container">
          <h2 className="section-title">Comprehensive Health Features</h2>
          <p className="section-subtitle">
            Everything you need to manage your health in one place
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i
                  className="fas fa-stethoscope"
                  style={{ color: "#4ade80" }}
                ></i>
              </div>
              <h3>Disease Prediction</h3>
              <p>Accurate AI-powered predictions based on your symptoms</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i
                  className="fas fa-dollar-sign"
                  style={{ color: "#4ade80" }}
                ></i>
              </div>
              <h3>Cost Estimation</h3>
              <p>Transparent cost estimates for medical treatments</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-home" style={{ color: "#4ade80" }}></i>
              </div>
              <h3>Home Treatment</h3>
              <p>Safe remedies for minor conditions</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-user-md" style={{ color: "#4ade80" }}></i>
              </div>
              <h3>Doctor Consultation</h3>
              <p>Connect with qualified healthcare professionals</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-hospital" style={{ color: "#4ade80" }}></i>
              </div>
              <h3>Hospital Recommendation</h3>
              <p>Find nearby hospitals based on your needs</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-vial" style={{ color: "#4ade80" }}></i>
              </div>
              <h3>Test Recommendation</h3>
              <p>Get suggestions for appropriate medical tests</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials animated-section">
        <div className="container">
          <h2 className="section-title">Trusted by Millions</h2>
          <p className="section-subtitle">
            Join thousands who have discovered the benefits of AI-powered
            healthcare
          </p>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">
                {" "}
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />{" "}
              </div>
              <p className="quote">
                "Health Guardian helped me identify symptoms I didn't realize
                were connected. When I went to my doctor with the report, she
                was impressed with how thorough it was."
              </p>
              <p className="author">- Riya Sharma</p>
            </div>

            <div className="testimonial-card">
              <div className="stars">
                {" "}
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />{" "}
              </div>
              <p className="quote">
                "The cost estimation feature saved me hundreds of dollars by
                helping me compare treatment options in my area."
              </p>
              <p className="author">- Ajay Kumar</p>
            </div>

            <div className="testimonial-card">
              <div className="stars">
                {" "}
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />{" "}
              </div>
              <p className="quote">
                "As someone with chronic conditions, Health Guardian helps me
                track my symptoms and communicate better with my doctors."
              </p>
              <p className="author">- Birinder Singh </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App */}
      <section className="mobile-app animated-section">
        <div className="container">
          <div className="app-content">
            <h2>Take Health Guardian With You</h2>
            <p>Download our mobile app for health insights on the go</p>

            <div className="app-buttons">
              <button className="app-store-button">
                <img
                  src="./img/app-store.png"
                  alt="Download on the App Store"
                />
              </button>
              <button className="play-store-button">
                <img src="./img/play-store.png" alt="Get it on Google Play" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section animated-section">
        <div className="container">
          <h2>Start Your Health Journey Today</h2>
          <p>
            Join thousands of users who have already discovered the benefits of
            AI-powered healthcare.
          </p>
          <button className="cta-button">
            Get Started <FaArrowRight className="button-icon" />
          </button>
        </div>
      </section>
      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            cursor: "pointer",
          }}
        >
          <div
            className="modal-content"
            style={{
              position: "relative",
              maxWidth: "90%",
              maxHeight: "90%",
            }}
          >
            <button
              className="close-modal"
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "-40px",
                right: 0,
                color: "#fff",
                fontSize: "30px",
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: "5px",
              }}
            >
              <FaTimes />
            </button>
            <img
              className="modal-image"
              src={modalImage}
              alt="Fullscreen view"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                boxShadow: "0 5px 30px rgba(0, 0, 0, 0.5)",
                borderRadius: "5px",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
