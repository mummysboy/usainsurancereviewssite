// src/components/StepTwo.js
import React, { useContext } from "react";
import { FormDataContext } from "../contexts/FormDataContext";
import { useNavigate } from "react-router-dom";
import "./../Form.css"; // Import the CSS styles
import { CSSTransition } from "react-transition-group";

const StepTwo = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate("/step-one");
  };

  const handleNext = (ageGroup, event) => {
    // Get the clicked button element
    const button = event.currentTarget;

    // Add the 'green-active' class to make the button stay green
    button.classList.add("green-active");

    // Set form data
    setFormData({ ...formData, ageGroup });

    // Delay the navigation to show the button effect
    setTimeout(() => {
      navigate("/step-three");
    }, 450); // Delay for noticeable green effect
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
          <div className="progress-bar" style={{ width: "10%" }}></div>
        </div>
        <h1>Which Age Group Are You In?</h1>
        <div className="age-group-container">
          {[
            "16 - 20",
            "21 - 24",
            "25 - 34",
            "35 - 44",
            "45 - 54",
            "55 - 64",
            "65+",
          ].map((ageRange) => (
            <button
              key={ageRange}
              className={`option-button ${
                formData.ageGroup === ageRange ? "selected" : ""
              }`}
              onClick={(event) => handleNext(ageRange, event)}
            >
              {ageRange}
            </button>
          ))}
        </div>
        <div className="buttons-container">
          <button onClick={handlePrevious}>Previous</button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default StepTwo;
