// src/components/Header.js
import React from "react";
import "./../Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="site-name">USA Insurance Reviews</h1>
        <h4 className="headline-tagline">
          Discover Top Insurance Deals Across the Nation
        </h4>
      </div>
    </header>
  );
};

export default Header;
