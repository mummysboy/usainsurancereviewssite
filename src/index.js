// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FormDataProvider } from "./contexts/FormDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FormDataProvider>
    <App />
  </FormDataProvider>
);
