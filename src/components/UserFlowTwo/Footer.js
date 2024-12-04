import React from "react";
import "../../styles/flowTwo/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/privacy-center">Privacy Center</a> |{" "}
        <a href="/terms-of-use">Terms of Use</a> |{" "}
        <a href="/privacy-rights">Your Privacy Rights</a> |{" "}
        <a href="/contact-us">Contact Us</a>
      </div>
      <div className="footer-content">
        <p>
          <strong>Usainsurancereviews.com</strong> is a top savings referral
          service enabling consumers to request competitive insurance quotes
          from local insurance agents and companies using proprietary alignment
          technology. Our site does not provide quotes directly to consumers. We
          do not provide insurance and do not represent any specific insurance
          provider.
        </p>
        <p>
          Lowest rates and potential savings may not be representative or
          available from all companies. Rates depend on various factors
          including location, coverage limits, deductibles, driving records, and
          more. The rates displayed are based on specific scenarios and may not
          reflect all discounts.
        </p>
        <p>
          Logos displayed represent carriers we work with but may not be
          available in all states. Carriers include: Allstate Corporation, 3100
          Sanders Road Northbrook, IL 60062; The General Automobile Insurance
          Services Inc., 2636 Elm Hill Pike, Suite 510, Nashville, Tennessee
          37214; Liberty Mutual Insurance Company, 175 Berkeley Street Boston,
          Massachusetts 02116; Progressive Corporation, 6300 Wilson Mills Rd.,
          Mayfield Village, OH 44143.
        </p>
        <p>© 2024 Usainsurancereviews.com. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
