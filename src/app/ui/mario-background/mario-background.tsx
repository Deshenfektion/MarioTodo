import React from "react";
import "./MarioBackground.css";

const MarioBackground = () => {
  return (
    <div id="app">
      <div id="star-container">
        <div id="star-pattern"></div>
        <div id="star-gradient-overlay"></div>
      </div>
      <div id="stripe-container">
        <div id="stripe-pattern"></div>
      </div>
    </div>
  );
};

export default MarioBackground;
