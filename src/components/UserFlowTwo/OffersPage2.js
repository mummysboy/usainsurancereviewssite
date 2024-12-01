import React, { useEffect, useState } from "react";
import Header from "../UserFlowOne/Header";
import Footer from "../UserFlowOne/Footer";
import "../../styles/flowOne/OffersPage.css";
import { CSSTransition } from "react-transition-group";

const OffersPage2 = () => {
  const [cityName, setCityName] = useState("your area");

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const zipCode =
      params.get("zip") || localStorage.getItem("zip_code") || "00000";
    const insured = params.get("insured") || localStorage.getItem("insured");
    const numVehicles =
      params.get("vehicles") || localStorage.getItem("numVehicles");
    const numDrivers =
      params.get("drivers") || localStorage.getItem("numDrivers");
    const homeOwnership =
      params.get("home_ownership") ||
      localStorage.getItem("home_ownership") ||
      "00000";
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

    // Load the MediaAlpha ad script with campaign data
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      var MediaAlphaExchange = {
         "data": {
            "zip": "${zipCode}",
            "currently_insured": "${insured}",
            "vehicles[]": "${numVehicles}",
            "drivers[]": "${numDrivers}",
            "home_ownership": "${homeOwnership}"
         },
         "placement_id": "uGZJokgB7cJsneLQN-wSgBbQbnbzkQ",
         "sub_1": "${campaignName}",
         "sub_2": "${campaignId}",
         "sub_3": "${clickId}",
         "type": "ad_unit",
         "version": 17
      };
      MediaAlphaExchange__load('mediaalpha_placeholder');
    `;
    document.body.appendChild(script);

    // Fetch city name from ZIP code
    if (zipCode !== "00000") {
      fetchCityName(zipCode);
    }

    const addStarRatings = () => {
      // Select the specific elements with the provided class names
      const offerElements = document.querySelectorAll(
        ".mav-partner.js-media-alpha-partner.mav-partner__standard.collapsible.collapsed, .mav-partner.js-media-alpha-partner.mav-partner__featured.collapsible.collapsed"
      );

      offerElements.forEach((offerElement, index) => {
        // Check if stars are already added to avoid duplicates
        if (offerElement.querySelector(".star-overlay")) {
          return; // If stars are already present, skip adding
        }

        // Create the star overlay
        const starOverlay = document.createElement("div");
        starOverlay.className = "star-overlay";
        starOverlay.setAttribute("data-rating", `offer-${index}`); // Adding an attribute for easier debugging

        // Set the star rating (start with 5 and decrement by 1 for each listing)
        let rating = 5 - index;
        if (rating < 1) {
          rating = 1; // Ensure that rating does not go below 1 star
        }

        // Add stars
        for (let i = 1; i <= 5; i++) {
          const star = document.createElement("span");
          star.className = "star" + (i <= rating ? " filled" : "");
          star.innerHTML = "★";
          starOverlay.appendChild(star);
        }

        // Append the star overlay to the offer card (the full container)
        offerElement.style.position = "relative"; // Ensure the offer container is positioned relative
        offerElement.appendChild(starOverlay);
      });
    };

    // Use MutationObserver to detect changes and call the function when MediaAlpha ads are loaded
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          console.log("Mutation detected:", mutation);
          addStarRatings();
        }
      });
    });

    const targetNode = document.getElementById("mediaalpha_placeholder");
    if (targetNode) {
      observer.observe(targetNode, { childList: true, subtree: true });
    }
  }, []);

  const fetchCityName = async (zipCode) => {
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
      if (response.ok) {
        const data = await response.json();
        const city = data.places[0]["place name"];
        setCityName(city);
      }
    } catch (error) {
      console.error("Failed to fetch city name:", error);
    }
  };

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
            <h2>We've Matched You with Great Offers in {cityName}!</h2>
            <p className="subtext">
              USA Insurance Reviews works with many reverse-bidding insurance
              companies. Based on your answers, we have matched you with the top
              aggregator in {cityName} that can get you the best possible deal.
            </p>
            Click View My Quote to see the best prices.
            <p></p>
          </div>

          <div className="offers-list">
            {/* Placeholder for the MediaAlpha ad unit */}
            <div
              id="mediaalpha_placeholder"
              className="mediaalpha-container"
            ></div>
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

export default OffersPage2;
