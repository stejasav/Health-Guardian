import React, { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUsComp() {
  const [state, handleSubmit] = useForm("mblgakdw");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const sections = document.querySelectorAll(".contact-section");

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
      section.style.opacity = 0.6;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Your message has been sent successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Flip,
      });

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("message").value = "";
    }
  }, [state.succeeded]);


  return (
    <div className="contact-us-container">
      <ToastContainer />
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      <div className="contact-us-header">
        <h1>Contact Health Guardian</h1>
        <p>
          We're here to help. Reach out to us with any questions, feedback, or
          support needs.
        </p>
      </div>

      <div className="contact-us-content">
        <div className="contact-section">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p className="feedback-text">
              Have questions about our services? Want to provide feedback? Our
              team is ready to assist you.
            </p>
            <div className="contact-details">
              <div className="contact-detail">
                <i className="fas fa-map-marker-alt" style={{ color: "#4ade80" }}></i>
                <div>
                  <h3>Location</h3>
                  <p>New Delhi, Delhi, India</p>
                </div>
              </div>
              <div className="contact-detail">
                <i className="fas fa-phone" style={{ color: "#4ade80" }}></i>
                <div>
                  <h3>Phone</h3>
                  <p>+91 7303853770</p>
                </div>
              </div>
              <div className="contact-detail">
                <i className="fas fa-envelope" style={{ color: "#4ade80" }}></i>
                <div>
                  <h3>Email</h3>
                  <p>
                    <a href="mailto:HealthGuardianForYou@gmail.com">
                      HealthGuardianForYou@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send Us a Message</h2>
            <form acceptCharset="utf-8" method="POST" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">
                  Full Name<span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Email Address<span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">
                  Your Message<span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>
              <button
                type="submit"
                className="cta-button"
                disabled={state.submitting}
              >
                {state.submitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <i className="fas fa-paper-plane"></i>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>We're Here for You</h2>
        <p>
          Your health journey is important to us. Reach out anytime for support.
        </p>
      </div>
    </div>
  );
}
