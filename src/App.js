// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ZipCodePage from "./components/ZipCodePage";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";
import StepFive from "./components/StepFive";
import StepSix from "./components/StepSix";
import Summary from "./components/Summary";
import StepEmail from "./components/StepEmail";
import OffersPage from "./components/OffersPage";
import LoadingDeals from "./components/LoadingDeals";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ZipCodePage />} />
        <Route path="step-one" element={<StepOne />} />
        <Route path="/step-two" element={<StepTwo />} />
        <Route path="/step-three" element={<StepThree />} />
        <Route path="/step-four" element={<StepFour />} />
        <Route path="/step-five" element={<StepFive />} />
        <Route path="/step-six" element={<StepSix />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/email" element={<StepEmail />} />
        <Route path="/loading-deals" element={<LoadingDeals />} />
        <Route path="/offers" element={<OffersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
