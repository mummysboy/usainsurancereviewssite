// src/components/StepSix.js
import React, { useContext } from "react";
import { FormDataContext } from "../../contexts/FormDataContext";
import { useNavigate } from "react-router-dom";
import "../../styles/flowOne/Form.css"; // Import your stylesheet here
import { CSSTransition } from "react-transition-group";

const StepSix = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate("/step-five2");
  };

  const handleNext = (bundleInterest, event) => {
    // Get the clicked button element
    const button = event.currentTarget;

    // Add the 'green-active' class to make the button stay green
    button.classList.add("green-active");

    // Set form data
    setFormData({ ...formData, bundleInterest });

    // Delay navigation to show the button effect
    setTimeout(() => {
      navigate("/summary2");
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
          <div className="progress-bar" style={{ width: "75%" }}></div>
        </div>
        <h1>
          Would You be Interested in Bundling Your Auto and Home Insurance?
        </h1>
        <label htmlFor="bundleInterest" className="savings-label">
          Bundle it Can Save Up to 30%
        </label>
        <div className="options-container">
          <button
            className={`option-button ${
              formData.bundleInterest === "Yes" ? "selected" : ""
            }`}
            onClick={(event) => handleNext("Yes", event)}
          >
            Yes
          </button>
          <button
            className={`option-button ${
              formData.bundleInterest === "No" ? "selected" : ""
            }`}
            onClick={(event) => handleNext("No", event)}
          >
            No
          </button>
        </div>
        <div className="buttons-container">
          <button className="secondary-button" onClick={handlePrevious}>
            Previous
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default StepSix;
