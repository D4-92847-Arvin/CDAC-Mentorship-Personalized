import React, { useState } from "react";
import "./Registration.css";
import { Link } from "react-router-dom";

const StudentRegister = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    grade: "",
    goals: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // static page – no backend, just mock
    console.log("Student registration data:", form);
    alert("Student account created (mock)!");
  };

  const subjects = [
    "Mathematics",
    "Chemistry",
    "History",
    "Engineering",
    "Computer Science",
    "Biology",
    "Economics",
    "Physics",
    "English",
    "Business Studies",
  ];

  return (
    <div className="register-page d-flex align-items-center justify-content-center">
      <div className="register-card">
        <div className="register-icon-wrapper">
          <div className="register-icon register-icon-student">🎯</div>
        </div>

        <h1 className="register-title text-center">Create Student Account</h1>
        <p className="register-subtitle text-center">
          Join Mentorship Personalized and start your learning journey
        </p>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <h5 className="section-title mt-4">Personal Information</h5>
          <div className="row g-3 mt-1">
            <div className="col-md-6">
              <label className="form-label">Full Name *</label>
              <input
                name="fullName"
                type="text"
                className="form-control register-input"
                placeholder="Arjun Verma"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email Address *</label>
              <input
                name="email"
                type="email"
                className="form-control register-input"
                placeholder="arjun@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password *</label>
              <input
                name="password"
                type="password"
                className="form-control register-input"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Confirm Password *</label>
              <input
                name="confirmPassword"
                type="password"
                className="form-control register-input"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <hr className="section-divider" />

          {/* Academic Information */}
          <h5 className="section-title">Academic Information</h5>

          <div className="row g-3 mt-1">
            <div className="col-md-6">
              <label className="form-label">Grade/Level *</label>
              <select
                name="grade"
                className="form-select register-input"
                value={form.grade}
                onChange={handleChange}
              >
                <option value="">Select your current grade/level</option>
                <option>High School</option>
                <option>Undergraduate</option>
                <option>Postgraduate</option>
                <option>Working Professional</option>
              </select>
            </div>
          </div>

          <div className="mt-3">
            <label className="form-label">
              Subjects of Interest * (Select all that apply)
            </label>
            <div className="register-pill-box">
              <div className="row">
                {subjects.map((subj) => (
                  <div key={subj} className="col-md-4 col-sm-6">
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={subj}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={subj}
                      >
                        {subj}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Goals */}
          <div className="mt-3">
            <label className="form-label">
              Learning Goals (Optional)
            </label>
            <textarea
              name="goals"
              rows="3"
              className="form-control register-input"
              placeholder="Tell us about your learning goals and what you hope to achieve with mentorship..."
              value={form.goals}
              onChange={handleChange}
            />
          </div>

          {/* Terms */}
          <div className="form-check mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="student-terms"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="student-terms">
              I agree to the{" "}
              <span className="link-inline">Terms and Conditions</span> and{" "}
              <span className="link-inline">Privacy Policy</span>
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn w-100 register-primary-btn mt-4"
          >
            👤 Create Account
          </button>

          <p className="text-center mt-3 mb-0 small-text">
            Already have an account?{" "}
            <Link to="/" className="link-inline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
