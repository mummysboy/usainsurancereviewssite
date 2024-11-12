// src/components/OffersPage.js
import React, { useContext, useEffect } from "react";
import { FormDataContext } from "../contexts/FormDataContext";
import Header from "./Header";
import Footer from "./Footer";
import "./../OffersPage.css";
import { CSSTransition } from "react-transition-group";

const OffersPage = () => {
  const { formData } = useContext(FormDataContext);

  useEffect(() => {
    // Load the MediaAlpha ad script once the page loads
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      var MediaAlphaExchange = {
         "data": {
            "zip": "${formData.zipCode || "00000"}"
         },
         "placement_id": "fD4petSMP9HeM2IAYex88RKg0siJ_Q",
         "sub_1": "test sub id",
         "type": "ad_unit",
         "version": 17
      };
      MediaAlphaExchange__load('mediaalpha_placeholder');
    `;
    document.body.appendChild(script);

    // Add event listener for ad clicks to trigger a Facebook Pixel Lead event
    const adContainer = document.getElementById("mediaalpha_placeholder");

    const handleAdClick = () => {
      // Trigger Facebook Lead event
      if (window.fbq) {
        fbq("track", "Lead");
      }
    };

    if (adContainer) {
      adContainer.addEventListener("click", handleAdClick);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      if (adContainer) {
        adContainer.removeEventListener("click", handleAdClick);
      }
    };
  }, [formData.zipCode]);

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={1500}
      classNames="fade-slide"
    >
      <>
        <Header />
        <div className="offers-page-container">
          <div className="offers-header">
            <h2>
              We've Matched You with Great Offers in{" "}
              <span>{formData.city}</span>!
            </h2>
            <p className="subtext">See below for details.</p>
          </div>

          <div className="offers-list">
            {/* Placeholder for the MediaAlpha ad unit */}
            <div id="mediaalpha_placeholder"></div>
          </div>

          <p className="powered-by-text">
            Powered by <span className="brand">usainsurancereviews.com</span>
          </p>
        </div>
        <Footer />
      </>
    </CSSTransition>
  );
};

export default OffersPage;
