import React from "react";
import landingImage from "../assets/vet goods for animals-min.jpg";
import Side from "../assets/side-1.png";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <div className="main">
      <div className="header">
        <img src={Side} alt="side" />
        <ul>
          <li onClick={handleLogin}>Login</li>
          <li onClick={handleSignup}>Signup</li>
        </ul>
      </div>
      <div className="child">
        <div className="main-get">
          <h3>Veterinary Clinic </h3>
          <h3>And </h3>
          <h3>Pet Shop Management System </h3>
          <div className="get-started" onClick={handleLogin}>
            <h1>Get Started</h1>
          </div>
        </div>
        <img className="vetimage" src={landingImage} alt="landing image" />
      </div>
    </div>
  );
}

export default LandingPage;
