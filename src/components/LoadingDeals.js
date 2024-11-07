// src/components/LoadingDeals.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../LoadingDeals.css"; // Custom CSS for the loading animation

const LoadingDeals = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to navigate to the offers page after 3 seconds
    const timer = setTimeout(() => {
      navigate("/offers");
    }, 3000); // 3000ms = 3 seconds

    // Cleanup the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-deals-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Looking for the best deals...</p>
    </div>
  );
};

export default LoadingDeals;
