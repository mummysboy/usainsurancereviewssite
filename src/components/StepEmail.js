// src/components/StepEmail.js
import React, { useState, useContext } from "react";
import { FormDataContext } from "../contexts/FormDataContext";
import { useNavigate } from "react-router-dom";
import "./../Form.css"; // Import your stylesheet here
import { CSSTransition } from "react-transition-group";

const StepEmail = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const navigate = useNavigate();

  // Local state to handle the user's email value
  const [email, setEmail] = useState(formData.email || "");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to validate email format using stricter regex
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Custom email validation
    if (!isValidEmail(email)) {
      setErrorMessage(
        "Please enter a valid email address, e.g., example@domain.com"
      );
      return;
    }

    // Clear any existing error message if email is valid
    setErrorMessage("");

    // Update the context with the user's email if it's valid
    setFormData({
      ...formData,
      email,
    });

    // Navigate to the loading deals page
    navigate("/loading-deals");
  };

  // Handle skip action
  const handleSkip = () => {
    // Navigate to the loading deals page without updating email
    navigate("/loading-deals");
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames="fade-slide"
    >
      <div className="form-container">
        {/* Progress bar container */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: "90%" }}></div>
        </div>
        <h1>Receive Updates on Additional Discounts</h1>

        {/* Email input form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="email-container">
            <label htmlFor="email">Enter your email address:</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
            />
            {/* Display the custom error message */}
            {errorMessage && (
              <p
                className="error-message"
                style={{ color: "red", marginTop: "0.5rem" }}
              >
                {errorMessage}
              </p>
            )}
          </div>
          <div className="buttons-container">
            <button type="submit">Submit</button>
            <button
              type="button"
              className="secondary-button"
              onClick={handleSkip} // Handle skip action
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    </CSSTransition>
  );
};

export default StepEmail;
