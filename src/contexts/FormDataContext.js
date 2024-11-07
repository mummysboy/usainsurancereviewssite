// src/contexts/FormDataContext.js
import React, { createContext, useState, useEffect } from "react";

export const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  // Initialize formData with data from session storage if it exists
  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          insured: "",
          ageGroup: "",
          numDrivers: false,
          numVehicles: false,
          homeOwnership: false,
          bundleInterest: false,
          email: "",
        };
  });

  // Save formData to session storage every time it changes
  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
