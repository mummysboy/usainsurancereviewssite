// src/components/Summary.js
import React, { useContext } from "react";
import { FormDataContext } from "../contexts/FormDataContext";
import { useNavigate } from "react-router-dom";
import "./../Summary.css"; // Ensure this path is correct and the file is present

import { CSSTransition } from "react-transition-group";

const Summary = () => {
  const { formData } = useContext(FormDataContext);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(formData.homeOwnership === "Yes" ? "/step-six" : "/step-five");
  };

  const handleFinish = (event) => {
    // Get the clicked button element
    const button = event.currentTarget;

    // Add the 'green-active' class to make the button stay green
    button.classList.add("green-active");

    // Delay the navigation to show the button effect
    setTimeout(() => {
      navigate("/loading-deals");
    }, 400); // Delay for noticeable green effect
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={1500}
      classNames="fade-slide"
    >
      <div className="form-container">
        {/* Progress bar container with dynamic width */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: "98%" }}></div>
        </div>
        <h1>Review Your Information</h1>
        <div className="summary-details">
          <p>
            <strong>Currently Insured:</strong> {formData.insured}
          </p>
          <p>
            <strong>Age Group:</strong> {formData.ageGroup}
          </p>
          <p>
            <strong>Number of Drivers:</strong> {formData.numDrivers}
          </p>
          <p>
            <strong>Multiple Vehicles:</strong> {formData.numVehicles}
          </p>
          <p>
            <strong>Owns Home:</strong> {formData.homeOwnership}
          </p>
          <p>
            <strong>Interested in Bundling Insurance:</strong>{" "}
            {formData.bundleInterest}
          </p>
        </div>

        <div className="buttons-container">
          <button onClick={(event) => handleFinish(event)}>Finish</button>
          <button className="secondary-button" onClick={handleBack}>
            Back to Edit
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Summary;
