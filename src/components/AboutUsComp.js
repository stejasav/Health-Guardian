import React, { useEffect } from "react";

export default function AboutUsComp() {
  useEffect(() => {
    // Simple animation for section visibility
    const sections = document.querySelectorAll(".about-us-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => {
      section.style.opacity = 0.1;
      section.style.transform = "translateY(30px)";
      section.style.transition = "opacity 1s ease, transform 1s ease";
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="about-us-container">
      <div className="particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="particle particle-7"></div>
        <div className="particle particle-8"></div>
        <div className="particle particle-9"></div>
        <div className="particle particle-10"></div>
        <div className="particle particle-11"></div>
        <div className="particle particle-12"></div>
        <div className="particle particle-13"></div>
        <div className="particle particle-14"></div>
        <div className="particle particle-15"></div>
        <div className="particle particle-16"></div>
        <div className="particle particle-17"></div>
        <div className="particle particle-18"></div>
        <div className="particle particle-19"></div>
        <div className="particle particle-20"></div>
      </div>

      <div className="about-us-header">
        <h1>About Health Guardian</h1>
        <p>
          Empowering you to take control of your health with AI-driven
          solutions.
        </p>
      </div>

      <div className="about-us-content">
        <div className="about-us-section">
          <div className="section-text">
            <h2>Who We Are</h2>
            <p>
              Welcome to <span className="color-change">Health Guardian</span>,
              your trusted AI-powered healthcare companion. We are dedicated to
              revolutionizing the way you manage your health by providing
              accurate disease predictions, cost estimations, and personalized
              treatment recommendations.
            </p>
          </div>
          <div className="section-image">
            <img src="./img/p6.jpg" alt="Health Guardian Introduction" />
          </div>
        </div>

        <div className="about-us-section reverse">
          <div className="section-text">
            <h2>Our Mission</h2>
            <p>
              Our mission is to empower individuals to take control of their
              health through cutting-edge technology. By leveraging artificial
              intelligence and machine learning, we aim to provide reliable
              health insights, reduce healthcare costs, and improve the overall
              quality of life for our users.
            </p>
          </div>
          <div className="section-image">
            <img src="./img/p1.jpg" alt="Health Guardian Mission" />
          </div>
        </div>

        <div className="about-us-section">
          <div className="section-text">
            <h2>What We Offer</h2>
            <p>
              Health Guardian offers a comprehensive suite of features designed
              to meet your healthcare needs:
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-stethoscope" style={{ color: "#4ade80" }}></i>
                </div>
                <div className="feature-title">Disease Prediction</div>
                <p>
                  Accurate predictions based on your symptoms using advanced AI
                  algorithms.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-dollar-sign" style={{ color: "#4ade80" }}></i>
                </div>
                <div className="feature-title">Cost Estimation</div>
                <p>
                  Transparent cost estimates for medical tests and treatments in
                  your area.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-home" style={{ color: "#4ade80" }}></i>
                </div>
                <div className="feature-title">Home Treatment</div>
                <p>
                  Safe and effective home remedies for minor conditions to save
                  time and money.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-user-md" style={{ color: "#4ade80" }}></i>
                </div>
                <div className="feature-title">Doctor Consultation</div>
                <p>
                  Find nearby doctors based on your location, specialty needs,
                  and budget.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-hospital" style={{ color: "#4ade80" }}></i>
                </div>
                <div className="feature-title">Hospital Recommendation</div>
                <p>
                  Discover nearby hospitals based on your location, medical
                  needs, and insurance coverage.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-vial" style={{ color: "#4ade80" }}></i>
                </div>
                <div className="feature-title">Test Recommendation</div>
                <p>
                  Get personalized suggestions for medical tests based on your
                  symptoms and medical history.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-us-section reverse">
          <div className="section-text">
            <h2>Our Team</h2>
            <p>
              Behind Health Guardian is a dedicated team of healthcare
              professionals, Developers, and software engineers who are
              passionate about improving healthcare outcomes.
            </p>
            <div className="team-grid">
              <div className="team-member">
                <img src="./img/my-pic.png" alt="Team Member" />
                <h3>Tejasav Singh</h3>
                <p>Front-end Developer</p>
              </div>
              <div className="team-member">
                <img src="./img/rav-pic.jpeg" alt="Team Member" />
                <h3>Ravneet Kaur</h3>
                <p>Back-end Developer</p>
              </div>
              <div className="team-member">
                <img src="./img/tav-pic.png" alt="Team Member" />
                <h3>Tavneet Kaur</h3>
                <p>Back-end Developer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-us-section">
          <div className="section-text">
            <h2>Our Vision</h2>
            <p>
              We envision a world where everyone has access to affordable and
              reliable healthcare. By continuously innovating and improving our
              platform, we strive to be the go-to resource for health
              management, empowering users to make informed decisions about
              their well-being.
            </p>
          </div>
          <div className="section-image">
            <img src="./img/p5.jpg" alt="Health Guardian Vision" />
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Start Your Health Journey Today</h2>
        <p>
          Join thousands of users who have already discovered the benefits of
          AI-powered healthcare.
        </p>
        {/* <a href="/predictor" className="cta-button">
          Get Started <i className="fas fa-arrow-right"></i>
        </a> */}
      </div>
    </div>
  );
}
