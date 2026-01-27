import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const onLogin = () => {
    if (role === "student") navigate("/student-dashboard");
    if (role === "mentor") navigate("/mentor");
    if (role === "admin") navigate("/admin-dashboard");
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow-lg">

        {/* Icon */}
        <div className="login-icon-wrapper">
          <div className="login-icon">
            🎓
          </div>
        </div>

        {/* Title */}
        <h1 className="login-title text-center">
          Welcome to Mentorship <br /> Personalized
        </h1>
        <p className="login-subtitle text-center">
          Sign in to continue your learning journey
        </p>

        {/* Role Buttons */}
        <div className="login-role-toggle d-flex mb-4">
          {["student", "mentor", "admin"].map((r) => (
            <button
              key={r}
              type="button"
              className={`login-role-pill btn flex-fill ${
                role === r ? "active" : ""
              }`}
              onClick={() => setRole(r)}
            >
              {capitalize(r)}
            </button>
          ))}
        </div>

        {/* Static Inputs */}
        <div className="mb-3">
          <label className="login-label">Email</label>
          <input
            type="email"
            className="form-control login-input"
            placeholder={`${role}@example.com`}
          />
        </div>

        <div className="mb-4">
          <label className="login-label">Password</label>
          <input
            type="password"
            className="form-control login-input"
            placeholder="••••••••"
          />
        </div>

        {/* Buttons */}
        <button className="btn w-100 login-primary-btn mb-3" onClick={onLogin}>
          Sign In as {capitalize(role)}
        </button>

        <button className="btn w-100 login-demo-btn">
          Try Demo ({capitalize(role)})
        </button>

        {/* Footer */}
        <div className="login-footer text-center mt-4">
          <p>
            Don't have an account?
            <span className="login-link-primary"> Sign up as Student</span> or
          </p>
          <span className="login-link-mentor"> Apply as Mentor</span>

          <div className="mt-3">
            <span className="login-back-link">← Back to Home</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
