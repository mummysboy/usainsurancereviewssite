// src/components/LoadingDeals.js
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormDataContext } from "../../contexts/FormDataContext";
import axios from "axios";
import "../../styles/flowOne/LoadingDeals.css"; // Custom CSS for the loading animation

const LoadingDeals = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FormDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityFromZip = async (zipCode) => {
      try {
        // Fetch city information from the zip code
        const response = await axios.get(
          `https://api.zippopotam.us/us/${zipCode}`
        );
        const cityName = response.data.places[0]["place name"];

        // Update form data with the fetched city
        setFormData({ ...formData, city: cityName });
      } catch (error) {
        console.error("Error fetching city data:", error);
        setFormData({ ...formData, city: "your area" });
      } finally {
        // Set loading state to false once the API call is complete
        setLoading(false);

        // Navigate to the OffersPage once the city data is loaded
        setTimeout(() => {
          navigate("/offers");
        }, 2000); // Adding a slight delay for better user experience
      }
    };

    if (formData.zipCode) {
      fetchCityFromZip(formData.zipCode);
    } else {
      // If no zip code is provided, set loading to false
      setLoading(false);
      navigate("/offers");
    }
  }, [formData, navigate, setFormData]);

  return (
    <div className="loading-deals-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Looking for the best deals...</p>
    </div>
  );
};

export default LoadingDeals;
