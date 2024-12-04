// src/components/ZipCodePage.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FormDataContext } from "../../contexts/FormDataContext";
import "../../styles/flowOne/ZipCodePage.css"; // Custom CSS file for styling
import Header from "./Header";
import Footer from "./Footer";
import insurance1 from "./../../images/insurance1.jpeg";
import loading from "./../../images/loading.png"; // Placeholder image for lazy loading
import LazyImage from "./LazyImage"; // Lazy loading component

const ZipCodePage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access the current URL
  const { formData, setFormData } = useContext(FormDataContext);
  const [zipCode, setZipCode] = useState(formData.zipCode || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isGoogleTraffic, setIsGoogleTraffic] = useState(false);

  useEffect(() => {
    // Extract campaign parameters from URL or use localStorage
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

    // Store these parameters in localStorage to persist data
    if (campaignName) {
      localStorage.setItem("campaign_name", campaignName);
    }
    if (campaignId) {
      localStorage.setItem("campaign_id", campaignId);
    }
    if (clickId) {
      localStorage.setItem("click_id", clickId);
    }

    // Check if the source is Google
    const dsp_name = params.get("dsp_name");
    if (dsp_name && dsp_name.toLowerCase() === "google") {
      setIsGoogleTraffic(true);
      localStorage.setItem("dsp_name", "google");
    } else {
      // Meta Pixel Code Initialization (only if not Google traffic)
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
    }
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
    if (!isGoogleTraffic) {
      fbq("track", "Lead", { value: 1.0, currency: "USD" });
    }

    // Add the green-active effect to the button
    const submitButton = e.target.querySelector(".get-started-button");
    submitButton.classList.add("green-active");

    // Store the zip code in the form data context and local storage
    setFormData({ ...formData, zipCode });
    localStorage.setItem("zip_code", zipCode);

    // Delay the navigation to show the green effect
    setTimeout(() => {
      // Navigate to the landerOffers page in the current tab
      navigate("/step-one");
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
        <div className="content-container">
          <LazyImage
            src={insurance1}
            alt="Save on Insurance Banner"
            className="banner-image"
            placeholder={loading}
          />
          <div className="zip-code-card">
            <h1>
              Better Coverage, Better Costs Compare Top Insurance Providers
              Today
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="zip" className="input-label">
                  What is your zip code?
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
                Get Started
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </CSSTransition>
  );
};

export default ZipCodePage;
