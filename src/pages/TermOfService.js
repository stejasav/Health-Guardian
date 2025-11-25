import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";

const sections = [
  {
    id: 1,
    title: "General Provisions",
    content: (
      <p>
        These Terms of Service ("ToS") govern your use of the Health Guardian
        platform, including its website, mobile application, and related
        services. By accessing or using Health Guardian, you agree to comply
        with these terms. If you do not agree, you must not use the platform.
      </p>
    ),
  },
  {
    id: 2,
    title: "Definitions",
    content: (
      <ul className="term-list">
        <li>
          <span className="term-highlight">Health Guardian</span>: The
          AI-powered healthcare platform providing disease prediction, cost
          estimation, home treatment recommendations, doctor consultations, and
          related services.
        </li>
        <li>
          <span className="term-highlight">User</span>: Any individual over 18
          years of age who uses Health Guardian for personal, non-commercial
          purposes.
        </li>
        <li>
          <span className="term-highlight">Services</span>: All features
          provided by Health Guardian, including:
          <ul className="nested-list">
            <li>Symptom-based disease prediction.</li>
            <li>Cost estimation for medical tests and treatments.</li>
            <li>Home treatment recommendations.</li>
            <li>Doctor consultation guidance and nearby doctor listings.</li>
            <li>Face recognition and voice input features.</li>
          </ul>
        </li>
        <li>
          <span className="term-highlight">Result</span>: The output generated
          by Health Guardian, including predicted diseases, cost estimates, and
          treatment recommendations.
        </li>
        <li>
          <span className="term-highlight">Interview</span>: The interactive
          process where Users input symptoms and other health-related
          information to generate a Result.
        </li>
        <li>
          <span className="term-highlight">License</span>: A non-exclusive,
          revocable, and non-transferable license granted to Users to access and
          use Health Guardian.
        </li>
      </ul>
    ),
  },
  {
    id: 3,
    title: "Purpose and Limitations",
    content: (
      <div className="section-content">
        <div>
          <p className="term-highlight">Purpose:</p>
          <ul className="term-list">
            <li>
              Health Guardian is designed to provide informational and
              educational content about potential health conditions, estimated
              costs, and treatment options.
            </li>
            <li>
              It is not a substitute for professional medical advice, diagnosis,
              or treatment.
            </li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Limitations:</p>
          <ul className="term-list">
            <li>
              Health Guardian does not provide medical diagnoses or replace the
              judgment of licensed healthcare professionals.
            </li>
            <li>
              Users must consult a licensed healthcare provider before making
              any health-related decisions.
            </li>
            <li>
              Health Guardian should not be used in emergency situations. In
              case of an emergency, contact local emergency services
              immediately.
            </li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Territorial Scope:</p>
          <ul className="term-list">
            <li>
              Health Guardian is currently available in regions where it
              complies with local regulations. Users are responsible for
              ensuring that their use of the platform is lawful in their
              jurisdiction.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "User Acknowledgments and Responsibilities",
    content: (
      <div className="section-content">
        <div>
          <p className="term-highlight">User Acknowledgments:</p>
          <ul className="term-list">
            <li>
              Health Guardian provides Results "as is" and does not guarantee
              their accuracy, completeness, or reliability.
            </li>
            <li>
              Users acknowledge that the platform is not a licensed medical
              device in all jurisdictions and should be used accordingly.
            </li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">User Responsibilities:</p>
          <ul className="term-list">
            <li>
              Provide accurate and truthful information during the Interview.
            </li>
            <li>
              Do not use Health Guardian for commercial purposes or to advertise
              medical services.
            </li>
            <li>
              Do not misuse the platform, including by attempting to bypass
              security measures or overloading the system.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Services Provided",
    content: (
      <div className="section-content">
        <div>
          <p className="term-highlight">Disease Prediction:</p>
          <ul className="term-list">
            <li>
              Health Guardian uses AI to predict potential diseases based on
              User-provided symptoms.
            </li>
            <li>
              Results are for informational purposes only and do not constitute
              a medical diagnosis.
            </li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Cost Estimation:</p>
          <ul className="term-list">
            <li>
              The platform estimates the cost of medical tests, treatments, and
              checkups based on User input and available data.
            </li>
            <li>
              Costs are estimates and may vary depending on location, healthcare
              provider, and other factors.
            </li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Home Treatment Recommendations:</p>
          <ul className="term-list">
            <li>
              For conditions that can be treated at home, Health Guardian
              provides general recommendations (e.g., rest, hydration,
              over-the-counter medications).
            </li>
            <li>
              Users must consult a healthcare professional before following any
              recommendations.
            </li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Doctor Consultation Guidance:</p>
          <ul className="term-list">
            <li>
              If a condition requires professional care, Health Guardian
              provides a list of nearby doctors based on the User's location and
              budget.
            </li>
            <li>
              The platform does not endorse or guarantee the quality of services
              provided by listed doctors.
            </li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Face Recognition and Voice Input:</p>
          <ul className="term-list">
            <li>
              Face recognition is used for secure login and identification.
            </li>
            <li>
              Voice input allows Users to interact with the platform using
              spoken commands.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Intellectual Property Rights",
    content: (
      <div className="section-content">
        <div>
          <p className="term-highlight">Ownership:</p>
          <ul className="term-list">
            <li>
              All content, software, and features on Health Guardian are the
              intellectual property of the Service Provider.
            </li>
            <li>
              Users are granted a limited, non-exclusive license to use the
              platform for personal, non-commercial purposes.
            </li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Restrictions:</p>
          <ul className="term-list">
            <li>
              Users may not copy, modify, or distribute any part of Health
              Guardian without prior written consent.
            </li>
            <li>
              Scraping or extracting data from the platform is strictly
              prohibited.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: "Privacy and Data Protection",
    content: (
      <div className="section-content">
        <div>
          <p className="term-highlight">Data Collection:</p>
          <ul className="term-list">
            <li>
              Health Guardian collects personal and health-related data to
              provide its Services.
            </li>
            <li>
              By using the platform, Users consent to the collection, storage,
              and processing of their data as described in the Privacy Policy.
            </li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Data Security:</p>
          <ul className="term-list">
            <li>
              The Service Provider implements industry-standard security
              measures to protect User data.
            </li>
            <li>
              However, Users acknowledge that no system is completely secure and
              use the platform at their own risk.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    title: "Liability and Disclaimers",
    content: (
      <div className="section-content">
        <div>
          <p className="term-highlight">Service Provider Liability:</p>
          <ul className="term-list">
            <li>
              The Service Provider is not liable for:
              <ul className="nested-list">
                <li>
                  User actions or decisions based on Health Guardian's Results.
                </li>
                <li>
                  Inaccuracies or errors in the platform's predictions or
                  recommendations.
                </li>
                <li>
                  Interruptions in service due to maintenance, technical issues,
                  or force majeure events.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">User Liability:</p>
          <ul className="term-list">
            <li>
              Users are solely responsible for their use of Health Guardian and
              any consequences arising from it.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 9,
    title: "Termination",
    content: (
      <div className="section-content">
        <div>
          <p className="term-highlight">By User:</p>
          <ul className="term-list">
            <li>
              Users may stop using Health Guardian at any time by uninstalling
              the application or ceasing to access the website.
            </li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">By Service Provider:</p>
          <ul className="term-list">
            <li>
              The Service Provider may terminate or suspend a User's access to
              Health Guardian for violations of these ToS or for any other
              reason at its sole discretion.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 10,
    title: "Amendments",
    content: (
      <ul className="term-list">
        <li>
          The Service Provider reserves the right to modify these ToS at any
          time.
        </li>
        <li>
          Continued use of Health Guardian after changes constitutes acceptance
          of the updated terms.
        </li>
      </ul>
    ),
  },
  {
    id: 11,
    title: "Governing Law",
    content: (
      <ul className="term-list">
        <li>These ToS are governed by the laws of the Republic of India.</li>
        <li>
          Any disputes arising from the use of Health Guardian shall be resolved
          in the courts of the Republic of India.
        </li>
      </ul>
    ),
  },
  {
    id: 12,
    title: "Contact Us",
    content: (
      <div className="contact-card">
        <p>For questions or concerns regarding these ToS, please contact:</p>
        <p className="contact-email">
          <span>Email:</span>{" "}
          <a href="mailto:HealthGuardianForYou@gmail.com">
            HealthGuardianForYou@gmail.com
          </a>
        </p>
      </div>
    ),
  },
];

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState(0);
  const memoizedSections = useMemo(() => sections, []);

  useEffect(() => {
      document.title = "Terms Of Service | Health Guardian";
  }, []);

  const handleSectionClick = (index) => {
    setActiveSection(index);
    window.scrollTo({
      top:
        document.querySelector(`.accordion-item:nth-child(${index + 1})`)
          .offsetTop - 20,
      behavior: "smooth",
    });
  };


  return (
    <>
      <Helmet>
        <meta name="description" content="Health Guardian Terms of Service" />
      </Helmet>

      <div className="terms-wrapper">
        {/* Header with gradient background */}
        <div className="terms-header">
          <div className="terms-header-content">
            <h1 className="terms-title">Terms of Service</h1>
            <p className="terms-subtitle">Health Guardian</p>
          </div>
        </div>

        <div className="terms-container">
          {/* Introduction card */}
          <div className="intro-card">
            <p>
              Welcome to Health Guardian. These Terms of Service ("ToS") govern
              your use of our platform. Please read these terms carefully before
              using our services. By accessing or using Health Guardian, you
              agree to be bound by these terms and conditions.
            </p>
          </div>

          {/* Table of contents */}
          <div className="toc-container">
            <h2 className="toc-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="toc-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              Table of Contents
            </h2>
            <div className="toc-grid">
              {memoizedSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id - 1)}
                  className={`toc-button ${
                    activeSection === section.id - 1 ? "toc-button-active" : ""
                  }`}
                >
                  {section.id}. {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="accordion-container">
            {memoizedSections.map((section, index) => (
              <section
                key={section.id}
                id={`section-${section.id}`}
                className={`accordion-item ${
                  activeSection === index ? "accordion-active" : ""
                }`}
              >
                <button
                  onClick={() =>
                    setActiveSection(index === activeSection ? index : index)
                  }
                  className={`accordion-header ${
                    activeSection === index ? "accordion-header-active" : ""
                  }`}
                >
                  <h3 className="accordion-title">
                    {section.id}. {section.title}
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`accordion-icon ${
                      activeSection === index ? "accordion-icon-active" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className={`accordion-content ${ activeSection === index ? "accordion-content-active" : "" }`} >
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {/* Footer */}
          <div className="terms-footer">
            <p>Last Updated: March 23, 2025</p>
            <p>© 2025 Health Guardian. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );  
}
