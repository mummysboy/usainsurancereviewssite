import React, { useContext } from "react";
import { FormDataContext } from "../../contexts/FormDataContext";
import { useNavigate } from "react-router-dom";
import "../../styles/flowOne/Form.css"; // Import your stylesheet here
import { CSSTransition } from "react-transition-group";

const StepThree = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate("/step-two");
  };

  const handleNext = (numDrivers, event) => {
    // Get the clicked button element
    const button = event.currentTarget;

    // Add the 'green-active' class to make the button stay green
    button.classList.add("green-active");

    // Parse the number of drivers
    const numDriversInt = parseInt(numDrivers, 10);

    // Generate an array of drivers
    const drivers = Array.from({ length: numDriversInt }, (_, i) => ({
      id: i + 1,
      name: "",
      age: "",
      experience: "",
    }));

    // Save the array of drivers in localStorage
    localStorage.setItem("drivers", JSON.stringify(drivers));

    // Save the total number of drivers in localStorage
    localStorage.setItem("numDrivers", numDriversInt);

    // Set form data in context
    setFormData({ ...formData, numDrivers });

    // Delay the navigation to show the button effect
    setTimeout(() => {
      navigate("/step-four");
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
          <div className="progress-bar" style={{ width: "20%" }}></div>
        </div>
        <h1>How Many Drivers Will Be Listed?</h1>
        <div className="options-container">
          <button
            className={`option-button ${
              formData.numDrivers === "1" ? "selected" : ""
            }`}
            onClick={(event) => handleNext("1", event)}
          >
            1
          </button>
          <button
            className={`option-button ${
              formData.numDrivers === "2" ? "selected" : ""
            }`}
            onClick={(event) => handleNext("2", event)}
          >
            2
          </button>
          <button
            className={`option-button ${
              formData.numDrivers === "3" ? "selected" : ""
            }`}
            onClick={(event) => handleNext("3", event)}
          >
            3
          </button>
          <button
            className={`option-button ${
              formData.numDrivers === "4" ? "selected" : ""
            }`}
            onClick={(event) => handleNext("4", event)}
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
