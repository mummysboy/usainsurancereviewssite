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

  const handleNext = (ageGroup) => {
    setFormData({ ...formData, ageGroup });
    navigate("/step-three");
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
              onClick={() => handleNext(ageRange)}
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
