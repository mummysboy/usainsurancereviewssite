// src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getUrlParameter } from "./utils/getUrlParameter";
import ZipCodePage from "./components/UserFlowOne/ZipCodePage";
import StepOne from "./components/UserFlowOne/StepOne";
import StepTwo from "./components/UserFlowOne/StepTwo";
import StepThree from "./components/UserFlowOne/StepThree";
import StepFour from "./components/UserFlowOne/StepFour";
import StepFive from "./components/UserFlowOne/StepFive";
import StepSix from "./components/UserFlowOne/StepSix";
import Summary from "./components/UserFlowOne/Summary";
import OffersPage from "./components/UserFlowOne/OffersPage";
import LoadingDeals from "./components/UserFlowOne/LoadingDeals";
import LanderOffersPage from "./components/UserFlowOne/LanderOffersPage";
import "./styles/flowOne/App.css";
import "./styles/flowOne/Form.css";

function App() {
  return (
    <Router>
      <PageRoutes />
    </Router>
  );
}

function PageRoutes() {
  useEffect(() => {
    // Capture campaign parameters from URL
    const campaignName = getUrlParameter("campaign_name");
    const campaignId = getUrlParameter("campaign_id");
    const clickId = getUrlParameter("click_id");

    // Store the parameters in local storage if they are present
    if (campaignName) {
      localStorage.setItem("campaign_name", campaignName);
    }
    if (campaignId) {
      localStorage.setItem("campaign_id", campaignId);
    }
    if (clickId) {
      localStorage.setItem("click_id", clickId);
    }
  }, []);

  return (
    <TransitionGroup>
      <CSSTransition timeout={{ enter: 4000, exit: 4000 }} classNames="page">
        <Routes>
          {/* UserFlowOne routes */}
          <Route path="/" element={<ZipCodePage />} />
          <Route path="/step-one" element={<StepOne />} />
          <Route path="/step-two" element={<StepTwo />} />
          <Route path="/step-three" element={<StepThree />} />
          <Route path="/step-four" element={<StepFour />} />
          <Route path="/step-five" element={<StepFive />} />
          <Route path="/step-six" element={<StepSix />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/loading-deals" element={<LoadingDeals />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/landerOffers" element={<LanderOffersPage />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
