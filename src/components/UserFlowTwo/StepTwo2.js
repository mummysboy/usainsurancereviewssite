import React, { useState } from "react";
import "../../styles/flowTwo/StepTwo2.css";
import Header from "../UserFlowOne/Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const DriverInfo = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    insured: true,
    insuredForYear: true,
    sr22: false,
    dui: false,
    homeOwner: true,
    military: false,
    accidents: "0",
    creditScore: "Good",
    gender: "male",
    maritalStatus: "Single",
  });

  const [errors, setErrors] = useState({});

  // Format Date Input
  const handleDateChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    if (value.length > 8) value = value.slice(0, 8); // Limit to 8 characters

    // Add slashes as needed
    if (value.length >= 3 && value.length <= 4) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else if (value.length >= 5) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    }

    setForm({ ...form, dateOfBirth: value });
  };

  // Validate Date of Birth
  const validateDate = (dateString) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // Format: MM/DD/YYYY
    if (!dateRegex.test(dateString)) {
      return "Date must be in mm/dd/yyyy format.";
    }
    const today = new Date();
    const [month, day, year] = dateString.split("/").map(Number);
    const inputDate = new Date(year, month - 1, day);
    if (isNaN(inputDate.getTime()) || inputDate.getDate() !== day) {
      return "Invalid date. Please enter a valid date.";
    }
    if (inputDate >= today) {
      return "Date of birth must be in the past.";
    }
    return "";
  };

  // Validate the entire form
  const validateForm = () => {
    const newErrors = {};

    // Validate first name
    if (!form.firstName || !/^[a-zA-Z]+$/.test(form.firstName)) {
      newErrors.firstName =
        "First name is required and must contain only letters.";
    }

    // Validate last name
    if (!form.lastName || !/^[a-zA-Z]+$/.test(form.lastName)) {
      newErrors.lastName =
        "Last name is required and must contain only letters.";
    }

    // Validate date of birth
    const dateError = validateDate(form.dateOfBirth);
    if (dateError) {
      newErrors.dateOfBirth = dateError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleNextStep = () => {
    if (validateForm()) {
      navigate("/step-three2");
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="driver-info">
        <h2>Driver's Information</h2>

        <div className="driver-section">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                className={errors.firstName ? "error" : ""}
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className={errors.lastName ? "error" : ""}
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="text"
                name="dateOfBirth"
                placeholder="mm/dd/yyyy"
                value={form.dateOfBirth}
                onChange={handleDateChange}
                className={errors.dateOfBirth ? "error" : ""}
              />
              {errors.dateOfBirth && (
                <span className="error-message">{errors.dateOfBirth}</span>
              )}
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div className="toggle-buttons">
                <button
                  className={form.gender === "male" ? "active" : ""}
                  onClick={() => setForm({ ...form, gender: "male" })}
                >
                  Male
                </button>
                <button
                  className={form.gender === "female" ? "active" : ""}
                  onClick={() => setForm({ ...form, gender: "female" })}
                >
                  Female
                </button>
              </div>
            </div>
          </div>

          <div className="form-grid">
            <FormToggle
              label="Are you currently insured?"
              active={form.insured}
              onToggle={() => handleToggle("insured")}
            />
            <FormToggle
              label="Have you been insured for at least a year?"
              active={form.insuredForYear}
              onToggle={() => handleToggle("insuredForYear")}
            />
            <FormDropdown
              label="Current Insurer"
              name="currentInsurer"
              options={[
                "- Select One -",
                "Geico",
                "State Farm",
                "Progressive",
                "Allstate",
                "Liberty Mutual",
                "USAA",
                "Farmers",
                "Nationwide",
                "American Family",
                "Travelers",
                "Other",
              ]}
              onChange={(e) =>
                setForm({ ...form, currentInsurer: e.target.value })
              }
            />
            <FormToggle
              label="Has your state notified you to file an SR22?"
              active={form.sr22}
              onToggle={() => handleToggle("sr22")}
            />
            <FormToggle
              label="Do you have any DUIs in the past 3 years?"
              active={form.dui}
              onToggle={() => handleToggle("dui")}
            />
            <FormDropdown
              label="At fault accidents in the last 3 years?"
              name="accidents"
              options={["0", "1", "2"]}
              onChange={(e) => setForm({ ...form, accidents: e.target.value })}
            />
            <FormToggle
              label="Do you own a Home?"
              active={form.homeOwner}
              onToggle={() => handleToggle("homeOwner")}
            />
            <FormToggle
              label="Military Affiliation?"
              active={form.military}
              onToggle={() => handleToggle("military")}
            />
            <FormDropdown
              label="Credit Score"
              name="creditScore"
              options={["Excellent", "Good", "Average", "Poor"]}
              onChange={(e) =>
                setForm({ ...form, creditScore: e.target.value })
              }
            />
          </div>
        </div>

        <button className="next-step" onClick={handleNextStep}>
          Next Step
        </button>
      </div>
      <Footer />
    </div>
  );
};

const FormToggle = ({ label, active, onToggle }) => (
  <div className="form-group">
    <label>{label}</label>
    <div className="toggle-buttons">
      <button className={active ? "active" : ""} onClick={onToggle}>
        Yes
      </button>
      <button className={!active ? "active" : ""} onClick={onToggle}>
        No
      </button>
    </div>
  </div>
);

const FormDropdown = ({ label, name, options, onChange }) => (
  <div className="form-group">
    <label>{label}</label>
    <select name={name} onChange={onChange}>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default DriverInfo;
