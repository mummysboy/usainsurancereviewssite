// src/components/ZipCodePage.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FormDataContext } from "../../contexts/FormDataContext";
import "../../styles/flowTwo/ZipCodePage.css"; // Custom CSS file for styling
import Header from "../UserFlowOne/Header";
import Footer from "../UserFlowOne/Footer";
import insurance1 from "./../../images/insurance1.jpeg";
import loading from "./../../images/loading.png"; // Placeholder image for lazy loading
import LazyImage from "../UserFlowOne/LazyImage"; // Lazy loading component

const ZipCodePage2 = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access the current URL
  const { formData, setFormData } = useContext(FormDataContext);
  const [zipCode, setZipCode] = useState(formData.zipCode || "");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Extract campaign parameters from URL
    const params = new URLSearchParams(location.search);
    const campaignName =
      params.get("campaign_name") ||
      localStorage.getItem("campaign_name") ||
      "default_campaign";
    const campaignId =
      params.get("campaign_id") ||
      localStorage.getItem("campaign_id") ||
      "default_id";
    const clickId =
      params.get("click_id") ||
      localStorage.getItem("click_id") ||
      "default_click";

    // Store these parameters in local storage to persist them
    if (campaignName) {
      localStorage.setItem("campaign_name", campaignName);
    }
    if (campaignId) {
      localStorage.setItem("campaign_id", campaignId);
    }
    if (clickId) {
      localStorage.setItem("click_id", clickId);
    }

    // Meta Pixel Code Initialization
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    // Initialize the Pixel with your Pixel ID
    fbq("init", "1102235601240222");

    // Track page view when the component loads
    fbq("track", "PageView");
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if zip code is valid
    const zipCodeRegex = /^\d{5}$/; // Only allows 5 digits (basic US zip code format)
    if (!zipCodeRegex.test(zipCode)) {
      setErrorMessage("Please enter a valid 5-digit zip code");
      return;
    }

    setErrorMessage("");

    // Track conversion event when the user submits the form (ad click event)
    fbq("track", "Lead", { value: 1.0, currency: "USD" });

    // Add the green-active effect to the button
    const submitButton = e.target.querySelector(".get-started-button");
    submitButton.classList.add("green-active");

    // Store the zip code in the form data context
    setFormData({ ...formData, zipCode });

    // Delay the navigation to show the green effect
    setTimeout(() => {
      // Open "step-one" page in a new tab
      window.open("/step-one", "_blank");

      // Navigate to the offers page in the current tab
      navigate("/offers");
    }, 500); // Delay for a noticeable effect
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={1500}
      classNames="fade-slide"
    >
      <div className="container">
        <Header />

        {/* Background Container with Faded Background */}
        <div className="background-container">
          <div className="zip-code-card">
            <h1>Find the lowest car insurance rates in California!</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="zip" className="input-label">
                  What is your ZIP Code?
                </label>
                <input
                  type="text"
                  id="zip"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Enter Zip"
                  className="zip-input"
                  maxLength="5"
                />
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </div>
              <button type="submit" className="get-started-button">
                Start Now
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </CSSTransition>
  );
};

export default ZipCodePage2;
