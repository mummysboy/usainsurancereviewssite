// src/components/StepOne.js
import React, { useContext } from "react";
import { FormDataContext } from "../contexts/FormDataContext";
import { useNavigate } from "react-router-dom";
import "./../Form.css"; // Import your stylesheet here
import { CSSTransition } from "react-transition-group";
import crash from "././images/crash.jpeg";
const StepOne = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate("/");
  };

  const handleNext = (insured, event) => {
    // Get the clicked button element
    const button = event.currentTarget;

    // Add the 'green-active' class to make the button stay green
    button.classList.add("green-active");

    // Update the form data
    setFormData({ ...formData, insured });

    // Delay the navigation to show the button effect
    setTimeout(() => {
      navigate("/step-two");
    }, 400); // Delay of 1000ms for noticeable green effect
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={1500}
      classNames="fade-slide"
    >
      <div className="form-container">
        <img src={crash} alt="Car crash" className="form-image" />
        {/* Progress bar container with dynamic width */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: "5%" }}></div>
        </div>
        <h1>Are You Currently Insured?</h1>
        <div className="options-container">
          <button
            className={`option-button ${
              formData.insured === "Yes" ? "selected" : ""
            }`}
            onClick={(event) => handleNext("Yes", event)}
          >
            Yes
          </button>
          <button
            className={`option-button ${
              formData.insured === "No" ? "selected" : ""
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

export default StepOne;
