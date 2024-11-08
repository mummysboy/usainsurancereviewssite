// src/components/StepFour.js
import React, { useContext } from "react";
import { FormDataContext } from "../contexts/FormDataContext";
import { useNavigate } from "react-router-dom";
import "./../Form.css"; // Import your stylesheet here
import { CSSTransition } from "react-transition-group";

const StepFour = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate("/step-three");
  };

  const handleNext = (numVehicles, event) => {
    // Get the clicked button element
    const button = event.currentTarget;

    // Add the 'green-active' class to make the button stay green
    button.classList.add("green-active");

    // Set form data
    setFormData({ ...formData, numVehicles });

    // Delay the navigation to show the button effect
    setTimeout(() => {
      navigate("/step-five");
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
          <div className="progress-bar" style={{ width: "35%" }}></div>
        </div>
        <h1>Would You Like to Insure More Than One Vehicle?</h1>
        <label htmlFor="numVehicles" className="savings-label">
          You Can Save Up to 20%
        </label>

        <div className="options-container">
          <button
            className={`option-button ${
              formData.numVehicles === "Yes" ? "selected" : ""
            }`}
            onClick={(event) => handleNext("Yes", event)}
          >
            Yes
          </button>
          <button
            className={`option-button ${
              formData.numVehicles === "No" ? "selected" : ""
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

export default StepFour;
