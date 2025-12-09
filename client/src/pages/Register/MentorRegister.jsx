import React, { useState } from "react";
import "./Registration.css";
import { Link } from "react-router-dom";

const MentorRegister = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    experience: "",
    education: "",
    position: "",
    organization: "",
    bio: "",
    linkedin: "",
    portfolio: "",
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
    console.log("Mentor registration data:", form);
    alert("Mentor application submitted (mock)!");
  };

  const expertise = [
    "Algorithm Design",
    "Data Structures",
    "Web Development",
    "Mobile Development",
    "Machine Learning",
    "AI & Deep Learning",
    "Cloud Computing",
    "DevOps",
    "Cybersecurity",
    "Database Design",
    "System Design",
    "Career Guidance",
    "Interview Preparation",
    "Research & Publications",
    "Project Management",
  ];

  return (
    <div className="register-page d-flex align-items-center justify-content-center">
      <div className="register-card register-card-wide">
        <div className="register-icon-wrapper">
          <div className="register-icon register-icon-mentor">🎓</div>
        </div>

        <h1 className="register-title text-center">Become a Mentor</h1>
        <p className="register-subtitle text-center">
          Share your expertise and help shape the next generation of learners
        </p>

        <div className="info-banner">
          All applications are reviewed and verified by our admin team
        </div>

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
                placeholder="Dr. Sanju Sharma"
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
                placeholder="sanju.sharma@example.com"
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

          {/* Professional Information */}
          <h5 className="section-title">Professional Information</h5>
          <div className="row g-3 mt-1">
            <div className="col-md-6">
              <label className="form-label">Area of Specialization *</label>
              <select
                name="specialization"
                className="form-select register-input"
                value={form.specialization}
                onChange={handleChange}
              >
                <option value="">Select your specialization</option>
                <option>Computer Science</option>
                <option>Mathematics</option>
                <option>Data Science</option>
                <option>Career Guidance</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Years of Experience *</label>
              <select
                name="experience"
                className="form-select register-input"
                value={form.experience}
                onChange={handleChange}
              >
                <option value="">Select years of experience</option>
                <option>0–2 years</option>
                <option>3–5 years</option>
                <option>6–10 years</option>
                <option>10+ years</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Highest Education *</label>
              <select
                name="education"
                className="form-select register-input"
                value={form.education}
                onChange={handleChange}
              >
                <option value="">Select your highest education</option>
                <option>Bachelor&apos;s</option>
                <option>Master&apos;s</option>
                <option>PhD</option>
                <option>Other</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Current Position *</label>
              <input
                name="position"
                type="text"
                className="form-control register-input"
                placeholder="e.g., Senior Software Engineer"
                value={form.position}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Organization *</label>
              <input
                name="organization"
                type="text"
                className="form-control register-input"
                placeholder="e.g., Google, Stanford University"
                value={form.organization}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="form-label">Professional Bio *</label>
            <p className="small-text mb-1">
              Share your background, teaching philosophy, and what you can offer
              to students (minimum 50 characters)
            </p>
            <textarea
              name="bio"
              rows="4"
              className="form-control register-input"
              value={form.bio}
              onChange={handleChange}
            />
          </div>

          {/* Areas of Expertise */}
          <div className="mt-3">
            <label className="form-label">Areas of Expertise *</label>
            <p className="small-text mb-1">
              Select all areas where you can provide mentorship
            </p>
            <div className="register-pill-box">
              <div className="row">
                {expertise.map((area) => (
                  <div key={area} className="col-md-4 col-sm-6">
                    <div className="form-check mb-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={area}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={area}
                      >
                        {area}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <h5 className="section-title mt-4">
            Additional Information (Optional)
          </h5>
          <div className="row g-3 mt-1">
            <div className="col-md-6">
              <label className="form-label">LinkedIn Profile</label>
              <input
                name="linkedin"
                type="url"
                className="form-control register-input"
                placeholder="https://linkedin.com/in/yourprofile"
                value={form.linkedin}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Portfolio/Website</label>
              <input
                name="portfolio"
                type="url"
                className="form-control register-input"
                placeholder="https://yourportfolio.com"
                value={form.portfolio}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="upload-box mt-3">
            <p className="mb-1 fw-semibold">Upload Resume/CV (Optional)</p>
            <div className="upload-inner">
              <span className="upload-icon">⬆️</span>
              <p className="mb-0">
                Click to upload resume
                <br />
                <span className="small-text">PDF, DOC, DOCX (max 5MB)</span>
              </p>
            </div>
          </div>

          {/* Terms */}
          <div className="form-check mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="mentor-terms"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="mentor-terms">
              I agree to the{" "}
              <span className="link-inline">Terms and Conditions</span> and{" "}
              <span className="link-inline">Privacy Policy</span>. I understand
              that my application will be reviewed by the admin team for
              verification.
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn w-100 register-primary-btn mt-4"
          >
            📩 Submit Application
          </button>

          <p className="text-center mt-3 mb-0 small-text">
            Already have an account?{" "}
            <Link to="/login" className="link-inline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default MentorRegister;
 