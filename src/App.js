import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

// Lazy load all pages
const Main = lazy(() => import("./pages/Main"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const TermOfService = lazy(() => import("./pages/TermOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Chatbot = lazy(() => import("./pages/Chatbot")); // Lazy load Chatbot too

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ErrorBoundary>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route index element={<Main />} />
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/terms-of-service" element={<TermOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/chatbot" element={<Chatbot />} />
              </Routes>
            </Suspense>
          </Layout>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}
