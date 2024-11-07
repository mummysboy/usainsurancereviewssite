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

  const handleNext = (homeOwnership) => {
    setFormData({ ...formData, homeOwnership });
    navigate(formData.homeOwnership === "Yes" ? "/step-six" : "/summary");
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
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
            onClick={() => handleNext("Yes")}
          >
            Yes
          </button>
          <button
            className={`option-button ${
              formData.homeOwnership === "No" ? "selected" : ""
            }`}
            onClick={() => handleNext("No")}
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
