// src/components/Navbar/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="mp-navbar shadow-sm">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo / Brand */}
        <Link to="/" className="mp-logo-wrapper d-flex align-items-center text-decoration-none">
          <div className="mp-logo-icon me-2">🎓</div>
          <span className="mp-brand">Mentorship Personalized</span>
        </Link>

        {/* Nav Links */}
        <ul className="mp-nav-links d-none d-md-flex">
          <li>
            <a href="/#features">Features</a>
          </li>
          <li>
            <a href="/#how-it-works">How It Works</a>
          </li>
          <li>
            <a href="/#pricing">Pricing</a>
          </li>
        </ul>

        {/* Sign In Button */}
        <div>
          <Link to="/login" className="btn mp-signin-btn">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
