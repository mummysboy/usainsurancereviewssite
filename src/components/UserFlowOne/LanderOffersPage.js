// src/components/OffersPage.js
import React, { useContext, useEffect, useRef } from "react";
import { FormDataContext } from "../../contexts/FormDataContext";
import Header from "./Header";
import Footer from "./Footer";
import "../../styles/flowOne/OffersPage.css";
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";

const LanderOffersPage = () => {
  const { formData } = useContext(FormDataContext);
  const offersPageRef = useRef(null); // Create a ref for the animated component
  const location = useLocation();

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

    // Load the MediaAlpha ad script once the page loads
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      var MediaAlphaExchange = {
         "data": {
            "zip": "${formData.zipCode || "00000"}"
         },
         "placement_id": "fD4petSMP9HeM2IAYex88RKg0siJ_Q",
         "sub_1": "${campaignName}",
         "sub_2": "${campaignId}",
         "sub_3": "${clickId}",
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
  }, [formData.zipCode, location]);

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={1500}
      classNames="fade-slide"
      nodeRef={offersPageRef} // Add nodeRef here
    >
      <div ref={offersPageRef}>
        {" "}
        {/* Attach the ref to the root div */}
        <Header />
        <div className="offers-page-container">
          <div className="offers-header">
            <h2>Compare Quotes to Get The Best Rates!</h2>
            <p className="subtext">
              Comparing quotes can save you <span>up to 20%</span> on your
            </p>
            Click View My Quote to see the best prices.
            <p></p>
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
      </div>
    </CSSTransition>
  );
};

export default LanderOffersPage;
