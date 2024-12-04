import React, { useState, useEffect } from "react";
import "../../styles/flowTwo/StepThree2.css";
import Header from "../UserFlowOne/Header";
import Footer from "./Footer";

const StepThree2 = () => {
  const [selectedCoverage, setSelectedCoverage] = useState("standard");
  const [zipCode] = useState(localStorage.getItem("zip_code") || ""); // Get ZIP code from localStorage
  const [location, setLocation] = useState("your area");

  // Fetch location based on ZIP code
  useEffect(() => {
    const fetchLocation = async () => {
      if (!zipCode) return; // Exit if no ZIP code

      try {
        const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
        if (!response.ok) {
          throw new Error("Invalid ZIP code or API error");
        }

        const data = await response.json();
        const state = data?.places?.[0]?.["state abbreviation"]; // Extract state from API response
        const city = data?.places?.[0]?.["place name"]; // Extract city from API response
        const zip = data?.["post code"]; // Extract ZIP code from API response
        setLocation(city + ", " + state + ", " + zip || "your area"); // Fallback if state not found
      } catch (error) {
        console.error("Error fetching location:", error.message);
        setLocation("your area"); // Fallback on error
      }
    };

    fetchLocation();
  }, [zipCode]); // Re-run if ZIP code changes

  return (
    <div>
      <Header />
      <div className="quote-form-container">
        <h3 className="title">
          <span className="step-number">3.</span> Contact Details and See Quote
        </h3>
        <form className="form">
          <div className="form-group">
            <label>Street Address</label>
            <input type="text" placeholder="Ex: 123 Main St." required />
          </div>
          <div className="form-group">
            <label>City, State and ZIP Code</label>
            <input type="text" placeholder={location} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Ex: john@email.com" required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="(xxx) xxx-xxxx" required />
          </div>

          <h4 className="coverage-title">
            What type of rates do you want to see?
          </h4>
          <p className="coverage-description">Select a coverage option.</p>

          <table className="coverage-table">
            <thead>
              <tr>
                <th className={`coverage-header`}></th>
                <th
                  className={`coverage-header ${
                    selectedCoverage === "minimum" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedCoverage("minimum")}
                >
                  MINIMUM
                </th>
                <th
                  className={`coverage-header ${
                    selectedCoverage === "standard" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedCoverage("standard")}
                >
                  STANDARD
                </th>
                <th
                  className={`coverage-header ${
                    selectedCoverage === "premium" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedCoverage("premium")}
                >
                  PREMIUM
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="row-label">Bodily Injury</td>
                <td
                  className={selectedCoverage === "minimum" ? "highlight" : ""}
                >
                  $25,000 / $50,000
                </td>
                <td
                  className={selectedCoverage === "standard" ? "highlight" : ""}
                >
                  $100,000 / $300,000
                </td>
                <td
                  className={selectedCoverage === "premium" ? "highlight" : ""}
                >
                  $250,000 / $500,000
                </td>
              </tr>
              <tr>
                <td className="row-label">Property Damage</td>
                <td
                  className={selectedCoverage === "minimum" ? "highlight" : ""}
                >
                  $10,000
                </td>
                <td
                  className={selectedCoverage === "standard" ? "highlight" : ""}
                >
                  $50,000
                </td>
                <td
                  className={selectedCoverage === "premium" ? "highlight" : ""}
                >
                  $100,000
                </td>
              </tr>
              <tr>
                <td className="row-label">Medical</td>
                <td
                  className={selectedCoverage === "minimum" ? "highlight" : ""}
                >
                  You pay
                </td>
                <td
                  className={selectedCoverage === "standard" ? "highlight" : ""}
                >
                  Insurance pays
                </td>
                <td
                  className={selectedCoverage === "premium" ? "highlight" : ""}
                >
                  Insurance pays
                </td>
              </tr>
              <tr>
                <td className="row-label">Roadside / Rental</td>
                <td
                  className={selectedCoverage === "minimum" ? "highlight" : ""}
                >
                  You pay
                </td>
                <td
                  className={selectedCoverage === "standard" ? "highlight" : ""}
                >
                  Insurance pays
                </td>
                <td
                  className={selectedCoverage === "premium" ? "highlight" : ""}
                >
                  Insurance pays
                </td>
              </tr>
            </tbody>
          </table>

          <button type="submit" className="get-quote-button1">
            Get Quote
          </button>
          <p className="disclaimer">
            By clicking Get Quote, I agree to the terms outlined below the
            button.
          </p>
          <p className="legal-text">
            By clicking Get Quote above and submitting your quote request, you
            represent that you are at least 18 years old, you authorize us to
            share the information you provided with our marketing partners and
            others...
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default StepThree2;
