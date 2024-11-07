// src/components/ZipCodePage.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormDataContext } from "../contexts/FormDataContext";
import "./../ZipCodePage.css"; // Custom CSS file for styling
import Header from "./Header";
import Footer from "./Footer";

const ZipCodePage = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FormDataContext);
  const [zipCode, setZipCode] = useState(formData.zipCode || "");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if zip code is valid
    const zipCodeRegex = /^\d{5}$/; // Only allows 5 digits (basic US zip code format)
    if (!zipCodeRegex.test(zipCode)) {
      setErrorMessage("Please enter a valid 5-digit zip code");
      return;
    }

    setErrorMessage("");

    // Store the zip code in the form data context
    setFormData({ ...formData, zipCode });

    // Navigate to the next page
    navigate("/step-one");
  };

  return (
    <div className="container">
      <Header />
      <div className="zip-code-container">
        <div className="zip-code-card">
          <h1>
            Save Big on Insurance by Comparing the Top Providers in Your Area
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
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <button type="submit" className="get-started-button">
              Get Started
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ZipCodePage;
