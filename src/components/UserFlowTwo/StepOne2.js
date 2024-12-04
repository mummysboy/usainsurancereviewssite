import React, { useState, useEffect } from "react";
import "../../styles/flowTwo/StepOne2.css";
import Header from "../UserFlowOne/Header";
import Footer from "../UserFlowTwo/Footer";
import { vehicleMakes } from "../../constants/vehicleMakes";
import { vehicleModel } from "../../constants/vehicleModel";
import { vehicleType } from "../../constants/vehicleType";
import { useNavigate } from "react-router-dom";

const StepOne2 = ({ nextStep }) => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([
    {
      year: "",
      make: "",
      model: "",
      type: "",
      ownership: "Owned (not making loan payments)",
      mileage: "10,000 miles",
      primaryUse: "Commute to Work",
    },
  ]);
  const [errors, setErrors] = useState([]);
  const [zipCode] = useState(localStorage.getItem("zip_code") || ""); // Get ZIP code from localStorage
  const [location, setLocation] = useState("your area");

  // Fetch location based on ZIP code
  useEffect(() => {
    const fetchLocation = async () => {
      if (!zipCode) return; // Exit if no ZIP code

      try {
        const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
        if (!response.ok) {
          throw new Error("Invalid ZIP code or API error");
        }

        const data = await response.json();
        const state = data?.places?.[0]?.["state"]; // Extract state from API response
        setLocation(state || "your area"); // Fallback if state not found
      } catch (error) {
        console.error("Error fetching location:", error.message);
        setLocation("your area"); // Fallback on error
      }
    };

    fetchLocation();
  }, [zipCode]); // Re-run if ZIP code changes

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVehicles = [...vehicles];
    updatedVehicles[index][name] = value;

    // Reset dependent fields when higher-level fields change
    if (name === "make") {
      updatedVehicles[index].model = "";
      updatedVehicles[index].type = "";
    } else if (name === "model") {
      updatedVehicles[index].type = "";
    }

    setVehicles(updatedVehicles);

    // Clear error for the changed field
    const updatedErrors = [...errors];
    updatedErrors[index] = {
      ...updatedErrors[index],
      [name]: false,
    };
    setErrors(updatedErrors);
  };

  const validateFields = (index) => {
    const vehicle = vehicles[index];
    const newErrors = {};
    if (!vehicle.year) newErrors.year = true;
    if (!vehicle.make) newErrors.make = true;
    if (!vehicle.model) newErrors.model = true;
    if (!vehicle.mileage) newErrors.mileage = true;
    if (!vehicle.primaryUse) newErrors.primaryUse = true;

    const updatedErrors = [...errors];
    updatedErrors[index] = newErrors;
    setErrors(updatedErrors);

    return Object.keys(newErrors).length === 0; // Valid if no errors
  };

  const handleAddVehicle = () => {
    setVehicles([
      ...vehicles,
      {
        year: "",
        make: "",
        model: "",
        type: "",
        ownership: "Owned (not making loan payments)",
        mileage: "10,000 miles",
        primaryUse: "Commute to Work",
      },
    ]);
    setErrors([...errors, {}]);
  };

  const handleRemoveVehicle = (index) => {
    const updatedVehicles = vehicles.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setVehicles(updatedVehicles);
    setErrors(updatedErrors);
  };

  const handleSubmit = () => {
    const isValid = vehicles.every((_, index) => validateFields(index));
    if (isValid) {
      navigate("/step-two2");
    }
  };

  return (
    <div>
      <Header />
      <div className="vehicle-details-container">
        <h2>Get the Best Rates in {location}!</h2>
        <p>
          Get your quote in just 3 simple steps. Enter your information below.
        </p>

        {vehicles.map((vehicle, index) => (
          <div key={index} className="vehicle-form-section">
            <div className="section-header">
              <span className="section-number">{index + 1}</span>
              <h3>About Your Vehicle {index + 1}</h3>
            </div>

            <div className="form-section">
              <label htmlFor={`year-${index}`}>
                Vehicle Year
                {errors[index]?.year && (
                  <span className="error-message">Please select an option</span>
                )}
              </label>
              <select
                id={`year-${index}`}
                name="year"
                value={vehicle.year}
                onChange={(e) => handleChange(index, e)}
                className={errors[index]?.year ? "error-field" : ""}
              >
                <option value="">Please Select</option>
                {Array.from(
                  new Array(71),
                  (_, i) => new Date().getFullYear() - i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <label htmlFor={`make-${index}`}>
                Vehicle Make
                {errors[index]?.make && (
                  <span className="error-message">Please select an option</span>
                )}
              </label>
              <select
                id={`make-${index}`}
                name="make"
                value={vehicle.make}
                onChange={(e) => handleChange(index, e)}
                className={errors[index]?.make ? "error-field" : ""}
              >
                <option value="">Please Select</option>
                {vehicleMakes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>

              <label htmlFor={`model-${index}`}>
                Vehicle Model
                {errors[index]?.model && (
                  <span className="error-message">Please select an option</span>
                )}
              </label>
              <select
                id={`model-${index}`}
                name="model"
                value={vehicle.model}
                onChange={(e) => handleChange(index, e)}
                disabled={!vehicle.make}
                className={errors[index]?.model ? "error-field" : ""}
              >
                <option value="">Please Select</option>
                {vehicleModel[vehicle.make]?.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>

              <label htmlFor={`type-${index}`}>Vehicle Type</label>
              <select
                id={`type-${index}`}
                name="type"
                value={vehicle.type}
                onChange={(e) => handleChange(index, e)}
                disabled={!vehicle.model}
              >
                <option value="">Optional</option>
                {vehicleType[vehicle.make]?.[vehicle.model]?.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <label htmlFor={`mileage-${index}`}>
                Average Annual Mileage
                {errors[index]?.mileage && (
                  <span className="error-message">Please select an option</span>
                )}
              </label>
              <select
                id={`mileage-${index}`}
                name="mileage"
                value={vehicle.mileage}
                onChange={(e) => handleChange(index, e)}
                className={errors[index]?.mileage ? "error-field" : ""}
              >
                <option value="">Please Select</option>
                {[...Array(10).keys()].map((i) => (
                  <option key={i} value={`${i * 5 + 5},000 miles`}>
                    {i * 5 + 5},000 miles
                  </option>
                ))}
              </select>

              <label htmlFor={`primaryUse-${index}`}>
                Primary Use
                {errors[index]?.primaryUse && (
                  <span className="error-message">Please select an option</span>
                )}
              </label>
              <select
                id={`primaryUse-${index}`}
                name="primaryUse"
                value={vehicle.primaryUse}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="Commute to Work">Commute to Work</option>
                <option value="Personal Use">Personal Use</option>
                <option value="Business">Business</option>
              </select>

              <div className="vehicle-buttons">
                {index > 0 && (
                  <button
                    className="remove-vehicle-button"
                    onClick={() => handleRemoveVehicle(index)}
                  >
                    - Remove Vehicle
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <button className="add-vehicle-button" onClick={handleAddVehicle}>
          + Add Another Vehicle (Optional)
        </button>

        <button className="next-step-button" onClick={handleSubmit}>
          Next Step
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default StepOne2;
