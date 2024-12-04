import React, { useEffect, useState, useContext } from "react";
import "../../styles/flowTwo/ZipCodePage.css";
import Header from "../UserFlowOne/Header";
import Footer from "./Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { FormDataContext } from "../../contexts/FormDataContext";

const ZipCodePage2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, setFormData } = useContext(FormDataContext);

  const [zipCode, setZipCode] = useState(formData.zipCode || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isGoogleTraffic, setIsGoogleTraffic] = useState(false);

  useEffect(() => {
    // Extract campaign parameters from the URL
    const params = new URLSearchParams(location.search);
    const campaignParams = {
      campaign_name:
        params.get("campaign_name") ||
        localStorage.getItem("campaign_name") ||
        "default_campaign",
      campaign_id:
        params.get("campaign_id") ||
        localStorage.getItem("campaign_id") ||
        "default_id",
      click_id:
        params.get("click_id") ||
        localStorage.getItem("click_id") ||
        "default_click",
    };

    // Save campaign parameters in localStorage
    Object.entries(campaignParams).forEach(([key, value]) =>
      localStorage.setItem(key, value)
    );

    const dsp_name = params.get("dsp_name");
    if (dsp_name?.toLowerCase() === "google") {
      setIsGoogleTraffic(true);
      localStorage.setItem("dsp_name", "google");
    } else {
      initializePixel();
    }
  }, [location]);

  const initializePixel = () => {
    // Meta Pixel Initialization
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

    // Initialize Pixel
    fbq("init", "1102235601240222");
    fbq("track", "PageView");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const zipCodeRegex = /^\d{5}$/;
    if (!zipCodeRegex.test(zipCode)) {
      setErrorMessage("Please enter a valid 5-digit zip code");
      return;
    }

    setErrorMessage("");

    if (!isGoogleTraffic) {
      fbq("track", "Lead", { value: 1.0, currency: "USD" });
    }

    // Save ZIP Code
    setFormData({ ...formData, zipCode });
    localStorage.setItem("zip_code", zipCode);

    // Navigate to the next page
    navigate("/step-one2");
  };

  return (
    <div>
      <Header />
      <div className="title">
        <h1>
          Find the lowest car insurance rates in{" "}
          {location.state?.region || "your area"}!
        </h1>
      </div>
      {/* Hero Section */}
      <section className="hero-section">
        <form className="form-container" onSubmit={handleSubmit}>
          <label htmlFor="zipCode">What is your ZIP Code?</label>
          <input
            className="form-container"
            type="text"
            id="zipCode"
            placeholder="Enter Your ZIP Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            aria-label="Enter ZIP Code"
          />
          <button type="submit" className="get-started-button">
            Start Now
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </section>

      {/* Partners Section */}
      <div className="partners">
        <h4>OUR PARTNERS</h4>
        <div className="partner-logos">
          {/* Logo Section */}
          <img
            src="https://www.allstate.com/dist/content-client-react-app/static/media/logo-large.dd47a938943f3af25de5f6885d2c39d8.svg"
            alt="Allstate Logo"
            className="logo"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBdupRpyPnMb5l6Mi3Mhoz8pT0cYVck-bh6Q&s"
            alt="The General Logo"
            className="logo"
          />
          <img
            src="data:image/png;base64,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"
            alt="Liberty Mutual Logo"
            className="logo"
          />
          <img
            src="https://images.contentstack.io/v3/assets/blt62d40591b3650da3/blt483e097d64d66a25/66476d224ac76ee67740f2d5/logo-progressive.svg"
            alt="Progressive Logo"
            className="logo"
          />
          <span>+25 more</span>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ZipCodePage2;
