// src/components/StepOne.js
import React, { useContext } from "react";
import { FormDataContext } from "../contexts/FormDataContext";
import { useNavigate } from "react-router-dom";
import "./../Form.css"; // Import your stylesheet here
import { CSSTransition } from "react-transition-group";

const StepOne = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate("/");
  };

  const handleNext = (insured) => {
    navigate("/step-two");
    setFormData({ ...formData, insured });
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
          <div className="progress-bar" style={{ width: "5%" }}></div>
        </div>
        <h1>Are You Currently Insured?</h1>
        <div className="options-container">
          <button
            className={`option-button ${
              formData.insured === "Yes" ? "selected" : ""
            }`}
            onClick={() => handleNext("Yes")}
          >
            Yes
          </button>
          <button
            className={`option-button ${
              formData.insured === "No" ? "selected" : ""
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

export default StepOne;
