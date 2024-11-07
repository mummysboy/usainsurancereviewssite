// src/components/OffersPage.js
import React, { useContext, useEffect, useState } from "react";
import { FormDataContext } from "../contexts/FormDataContext";
import Header from "./Header";
import Footer from "./Footer";
import "./../OffersPage.css";
import axios from "axios";

const OffersPage = () => {
  const { formData } = useContext(FormDataContext);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityFromZip = async (zipCode) => {
      try {
        const response = await axios.get(
          `https://api.zippopotam.us/us/${zipCode}`
        );
        const cityName = response.data.places[0]["place name"];
        setCity(cityName);
      } catch (error) {
        console.error("Error fetching city data:", error);
        setCity("your area");
      } finally {
        setLoading(false);
      }
    };

    if (formData.zipCode) {
      fetchCityFromZip(formData.zipCode);
    } else {
      setLoading(false);
    }

    // Load the MediaAlpha ad script
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
  }, [formData.zipCode]);

  return (
    <>
      <Header />
      <div className="offers-page-container">
        {loading ? (
          <div className="loading-text">Loading offers...</div>
        ) : (
          <>
            <div className="offers-header">
              <h2>
                We've Matched You with Great Offers in <span>{city}</span>!
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
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OffersPage;
