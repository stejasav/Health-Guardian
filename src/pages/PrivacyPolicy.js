import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";

const sections = [
  {
    id: 1,
    title: "Who We Are",
    content: (
      <p>
        Welcome to <strong>Health Guardian</strong>, a platform dedicated to
        providing AI-powered healthcare services, including disease
        prediction, cost estimation, home treatment recommendations, and
        doctor consultations.
      </p>
    ),
  },
  {
    id: 2,
    title: "Why We Collect and Process Data",
    content: (
      <ul className="term-list">
        <li>
          <span className="term-highlight">Provide Services</span>: Deliver
          accurate disease predictions, cost estimates, and treatment
          recommendations.
        </li>
        <li>
          <span className="term-highlight">Improve Functionality</span>:
          Enhance the performance and usability of our platform.
        </li>
        <li>
          <span className="term-highlight">Ensure Security</span>: Protect our
          platform from unauthorized access and misuse.
        </li>
        <li>
          <span className="term-highlight">Communicate with You</span>:
          Respond to your inquiries and feedback.
        </li>
        <li>
          <span className="term-highlight">
            Comply with Legal Obligations
          </span>
          : Meet regulatory requirements and defend against legal claims.
        </li>
      </ul>
    ),
  },
  {
    id: 3,
    title: "What Data We Collect and Process",
    content: (
      <div className="section-content">
        <div>
          <p className="term-highlight">Personal Data:</p>
          <ul className="term-list">
            <li>Name, email address, and contact information.</li>
            <li>
              Health-related information (e.g., symptoms, medical history).
            </li>
            <li>Demographic data (e.g., age, gender, location).</li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Technical Data:</p>
          <ul className="term-list">
            <li>IP address, device information, browser type.</li>
            <li>Log data (e.g., pages visited, actions taken).</li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Feedback Data:</p>
          <ul className="term-list">
            <li>Comments, suggestions, or reviews provided by you.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "How We Use Your Data",
    content: (
      <div className="section-content">
        <div>
          <p className="term-highlight">Service Delivery:</p>
          <ul className="term-list">
            <li>
              Provide disease predictions, cost estimates, and treatment
              recommendations.
            </li>
            <li>Enable features like face recognition and voice input.</li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Communication:</p>
          <ul className="term-list">
            <li>Respond to your inquiries and feedback.</li>
            <li>Send important updates about our Services.</li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Analytics and Improvement:</p>
          <ul className="term-list">
            <li>Analyze user behavior to improve platform functionality.</li>
            <li>
              Conduct research and development to enhance service accuracy.
            </li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Security:</p>
          <ul className="term-list">
            <li>Monitor and prevent unauthorized access or misuse.</li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Legal Compliance:</p>
          <ul className="term-list">
            <li>
              Fulfill legal obligations and defend against legal claims.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Legal Basis for Processing",
    content: (
      <ul className="term-list">
        <li>
          <span className="term-highlight">Consent</span>: When you
          voluntarily provide personal data.
        </li>
        <li>
          <span className="term-highlight">Contractual Necessity</span>: To
          fulfill our obligations under the Terms of Service.
        </li>
        <li>
          <span className="term-highlight">Legitimate Interest</span>: To
          improve our Services and ensure security.
        </li>
        <li>
          <span className="term-highlight">Legal Obligation</span>: To comply
          with applicable laws and regulations.
        </li>
      </ul>
    ),
  },
  {
    id: 6,
    title: "Data Retention",
    content: (
      <div className="section-content">
        <div>
          <p className="term-highlight">Contact Data:</p>
          <ul className="term-list">
            <li>Up to 3 years from the last interaction.</li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Feedback Data:</p>
          <ul className="term-list">
            <li>Until consent is withdrawn or the purpose is achieved.</li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Technical Data:</p>
          <ul className="term-list">
            <li>Up to 30 days for security purposes.</li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Health Data:</p>
          <ul className="term-list">
            <li>Anonymized after 30 days for research and development.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: "Data Sharing and Transfers",
    content: (
      <div className="section-content">
        <div>
          <p className="term-highlight">Service Providers:</p>
          <ul className="term-list">
            <li>Third-party vendors who assist in platform operations.</li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Legal Authorities:</p>
          <ul className="term-list">
            <li>When required by law or to protect our rights.</li>
          </ul>
        </div>
        <div>
          <p className="term-highlight">Business Partners:</p>
          <ul className="term-list">
            <li>For collaborative research and development.</li>
          </ul>
        </div>
        <p>
          If your data is transferred outside the European Economic Area
          (EEA), we ensure adequate safeguards are in place.
        </p>
      </div>
    ),
  },
  {
    id: 8,
    title: "Your Rights",
    content: (
      <div className="section-content">
        <div>
          <p className="term-highlight">
            Under the GDPR, you have the following rights:
          </p>
          <ul className="term-list">
            <li>
              <span className="term-highlight">Access</span>: Request a copy
              of your personal data.
            </li>
            <li>
              <span className="term-highlight">Rectification</span>: Correct
              inaccurate or incomplete data.
            </li>
            <li>
              <span className="term-highlight">Erasure</span>: Request
              deletion of your data.
            </li>
            <li>
              <span className="term-highlight">Restriction</span>: Limit the
              processing of your data.
            </li>
            <li>
              <span className="term-highlight">Portability</span>: Receive
              your data in a structured, machine-readable format.
            </li>
            <li>
              <span className="term-highlight">Objection</span>: Object to
              processing based on legitimate interests.
            </li>
            <li>
              <span className="term-highlight">Withdraw Consent</span>: Revoke
              consent at any time.
            </li>
          </ul>
        </div>
        <p>
          To exercise these rights, contact us at{" "}
          <strong>
            <a
              href="mailto:HealthGuardianForYou@gmail.com"
              className="contact-email-link"
            >
              HealthGuardianForYou@gmail.com
            </a>
          </strong>
          .
        </p>
      </div>
    ),
  },
  {
    id: 9,
    title: "Security",
    content: (
      <p>
        We implement industry-standard security measures to protect your data,
        including encryption, access controls, and regular audits. However, no
        method of transmission or storage is 100% secure, and we cannot
        guarantee absolute security.
      </p>
    ),
  },
  {
    id: 10,
    title: "Cookies and Tracking",
    content: (
      <div className="section-content">
        <p>
          We use cookies and similar technologies to:
          <ul className="term-list">
            <li>Enhance user experience.</li>
            <li>Analyze platform usage.</li>
            <li>Deliver targeted advertisements.</li>
          </ul>
        </p>
        <p>
          You can manage cookie preferences through your browser settings or
          our cookie consent tool.
        </p>
      </div>
    ),
  },
  {
    id: 11,
    title: "Children’s Privacy",
    content: (
      <p>
        Our Services are not intended for individuals under the age of 18. If
        we become aware that we have collected data from a minor, we will take
        steps to delete it promptly.
      </p>
    ),
  },
  {
    id: 12,
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. The latest
        version will be posted on our website with the effective date. By
        continuing to use our Services, you agree to the updated policy.
      </p>
    ),
  },
  {
    id: 13,
    title: "Contact Us",
    content: (
      <div className="contact-card">
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us:
        </p>
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

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(0);
  const memoizedSections = useMemo(() => sections, []);

  useEffect(() => {
    document.title = "Privacy Policy | Health Guardian";
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
        <meta name="description" content="Health Guardian Privacy Policy" />
      </Helmet>

      <div className="terms-wrapper">
        {/* Header with gradient background */}
        <div className="terms-header">
          <div className="terms-header-content">
            <h1 className="terms-title">Privacy Policy</h1>
            <p className="terms-subtitle">Health Guardian</p>
          </div>
        </div>

        <div className="terms-container">
          {/* Introduction card */}
          <div className="intro-card">
            <p>
              Welcome to Health Guardian. This Privacy Policy explains how we
              collect, use, and safeguard your information when you use our
              platform. Please read this policy carefully to understand our
              practices regarding your data.
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
                  aria-label={`Jump to ${section.title}`}
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
                <div
                  className={`accordion-content ${
                    activeSection === index ? "accordion-content-active" : ""
                  }`}
                >
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
