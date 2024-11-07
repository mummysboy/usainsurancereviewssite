// src/components/StepOne.js
import React, { useContext } from "react";
import { FormDataContext } from "../contexts/FormDataContext";
import { useNavigate } from "react-router-dom";
import "./../Form.css"; // Import your stylesheet here
import { CSSTransition } from "react-transition-group";

const StepThree = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate("/step-two");
  };

  const handleNext = (numDrivers) => {
    setFormData({ ...formData, numDrivers });
    navigate("/step-four");
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
          <div className="progress-bar" style={{ width: "20%" }}></div>
        </div>
        <h1>How Many Drivers Will Be Listed?</h1>
        <div className="options-container">
          <button
            className={`option-button ${
              formData.numDrivers === "1" ? "selected" : ""
            }`}
            onClick={() => handleNext("1")}
          >
            1
          </button>
          <button
            className={`option-button ${
              formData.numDrivers === "2" ? "selected" : ""
            }`}
            onClick={() => handleNext("2")}
          >
            2
          </button>
          <button
            className={`option-button ${
              formData.numDrivers === "3" ? "selected" : ""
            }`}
            onClick={() => handleNext("3")}
          >
            3
          </button>
          <button
            className={`option-button ${
              formData.numDrivers === "4" ? "selected" : ""
            }`}
            onClick={() => handleNext("4")}
          >
            4
          </button>
        </div>
        <div className="buttons-container">
          <button onClick={handlePrevious}>Previous</button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default StepThree;
