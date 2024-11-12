// src/components/StepFive.js
import React, { useContext } from "react";
import { FormDataContext } from "../contexts/FormDataContext";
import { useNavigate } from "react-router-dom";
import "./../Form.css"; // Import your stylesheet here
import { CSSTransition } from "react-transition-group";

const StepFive = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate("/step-four");
  };

  const handleNext = (homeOwnership, event) => {
    // Get the clicked button element
    const button = event.currentTarget;

    // Add the 'green-active' class to make the button stay green
    button.classList.add("green-active");

    // Set form data
    setFormData({ ...formData, homeOwnership });

    // Determine the next step based on home ownership and delay navigation
    setTimeout(() => {
      navigate(homeOwnership === "Yes" ? "/step-six" : "/summary");
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
          <div className="progress-bar" style={{ width: "55%" }}></div>
        </div>
        <h1>Do You Own Your Home?</h1>
        <div className="options-container">
          <button
            className={`option-button ${
              formData.homeOwnership === "Yes" ? "selected" : ""
            }`}
            onClick={(event) => handleNext("Yes", event)}
          >
            Yes
          </button>
          <button
            className={`option-button ${
              formData.homeOwnership === "No" ? "selected" : ""
            }`}
            onClick={(event) => handleNext("No", event)}
          >
            No
          </button>
        </div>
        <div className="buttons-container">
          <button onClick={handlePrevious}>Previous</button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default StepFive;
