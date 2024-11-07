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
    navigate("/Step-three");
  };

  const handleNext = (numVehicles) => {
    setFormData({ ...formData, numVehicles });
    navigate("/Step-five");
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
            onClick={() => handleNext("Yes")}
          >
            Yes
          </button>
          <button
            className={`option-button ${
              formData.numVehicles === "No" ? "selected" : ""
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

export default StepFour;
