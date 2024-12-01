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
import "./styles/flowTwo/ZipCodePage.css";
// Flow Two
import ZipCodePage2 from "./components/UserFlowTwo/ZipCodePage2";
import StepOne2 from "./components/UserFlowTwo/StepOne2";
import StepTwo2 from "./components/UserFlowTwo/StepTwo2";
import StepThree2 from "./components/UserFlowTwo/StepThree2";
import StepFour2 from "./components/UserFlowTwo/StepFour2";
import StepFive2 from "./components/UserFlowTwo/StepFive2";
import StepSix2 from "./components/UserFlowTwo/StepSix2";
import Summary2 from "./components/UserFlowTwo/Summary2";
import OffersPage2 from "./components/UserFlowTwo/OffersPage2";
import LoadingDeals2 from "./components/UserFlowTwo/LoadingDeals2";
import LanderOffersPage2 from "./components/UserFlowTwo/LanderOffersPage2";

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

          {/* UserFlowTwo routes */}
          <Route path="/2" element={<ZipCodePage2 />} />
          <Route path="/step-one2" element={<StepOne2 />} />
          <Route path="/step-two2" element={<StepTwo2 />} />
          <Route path="/step-three2" element={<StepThree2 />} />
          <Route path="/step-four2" element={<StepFour2 />} />
          <Route path="/step-five2" element={<StepFive2 />} />
          <Route path="/step-six2" element={<StepSix2 />} />
          <Route path="/summary2" element={<Summary2 />} />
          <Route path="/loading-deals2" element={<LoadingDeals2 />} />
          <Route path="/offers2" element={<OffersPage2 />} />
          <Route path="/landerOffers2" element={<LanderOffersPage2 />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
