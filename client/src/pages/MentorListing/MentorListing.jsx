// src/pages/MentorListing/MentorListing.jsx
import React from "react";
import "./MentorListing.css";
import Navbar from "../../Component/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../providers/AuthProvider";

import { toast } from "react-toastify";

const MentorListing = () => {
//   const { user } = useAuth(); // if you store logged-in user here
const user = localStorage.getItem("user"); // temporary fake login check
  const navigate = useNavigate();

  const mentors = [
    {
      id: 1,
      name: "Dr. Ananya Iyer",
      subject: "Computer Science",
      rating: 4.9,
      reviews: 316,
      sessions: 340,
      price: 900,
      desc: "Ex-SDE at a top product company. Helps students master data structures, algorithms, and system design for SDE roles.",
      tags: ["Algorithms", "Data Structures", "System Design"],
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 2,
      name: "Prof. Rohan Mehta",
      subject: "Mathematics (JEE)",
      rating: 4.8,
      reviews: 278,
      sessions: 295,
      price: 800,
      desc: "15+ years of experience in JEE Maths. Special focus on calculus, algebra, and problem-solving strategies.",
      tags: ["Calculus", "Coordinate Geometry", "Algebra"],
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Dr. Kavya Menon",
      subject: "Physics (NEET & JEE)",
      rating: 4.9,
      reviews: 189,
      sessions: 260,
      price: 950,
      desc: "PhD in Physics, known for intuitive explanations of mechanics, optics and modern physics.",
      tags: ["Mechanics", "Electrodynamics", "Modern Physics"],
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 4,
      name: "Arjun Deshpande",
      subject: "UPSC General Studies",
      rating: 4.7,
      reviews: 211,
      sessions: 320,
      price: 1000,
      desc: "UPSC interview appeared candidate with deep focus on GS2 & GS3, current affairs and answer-writing practice.",
      tags: ["GS2", "GS3", "Answer Writing"],
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      id: 5,
      name: "Dr. Nidhi Tripathi",
      subject: "Biology (NEET)",
      rating: 4.8,
      reviews: 245,
      sessions: 310,
      price: 850,
      desc: "MBBS, passionate about simplifying NCERT and PYQs for NEET aspirants.",
      tags: ["NCERT Focus", "PYQ Strategy", "Diagrams"],
      avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      id: 6,
      name: "Sandeep Rao",
      subject: "CAT & MBA Prep",
      rating: 4.8,
      reviews: 198,
      sessions: 275,
      price: 1100,
      desc: "IIM graduate mentoring aspirants in LRDI, VARC, and interview preparation.",
      tags: ["CAT VARC", "LRDI", "PI Preparation"],
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    },
  ];

  const handleBookSession = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    navigate("/login"); // user must login first
    return;
  }

  // If user is logged in → Go to pricing
  navigate("/pricing");
};


  return (
    <div className="mentor-page-root">
      <Navbar />

      <section className="mentor-listing-section">
        <div className="container">
          {/* Header */}
          <div className="row mb-4">
            <div className="col-md-8">
              <h1 className="mentor-heading">Find Your Perfect Mentor</h1>
              <p className="mentor-subtitle">
                Browse verified mentors for UPSC, JEE, NEET, CAT and more.
              </p>
            </div>
          </div>

          {/* Search + Filters (static for now) */}
          <div className="mentor-filters mb-3">
            <div className="row g-3 align-items-center">
              <div className="col-md-5">
                <div className="search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search by name, exam, specialization..."
                  />
                </div>
              </div>
              <div className="col-md-7 d-flex flex-wrap gap-3 justify-content-md-end">
                <button className="btn filter-btn">
                  Filters: <span className="filter-label">All Exams</span>
                </button>
                <button className="btn filter-btn">
                  <span className="filter-label">All Specializations</span>
                </button>
                <button className="btn filter-btn">
                  <span className="filter-label">All Ratings</span>
                </button>
              </div>
            </div>
          </div>

          <p className="showing-text">
            Showing {mentors.length} mentors
          </p>

          {/* Mentor Cards */}
          <div className="row g-4">
            {mentors.map((m) => (
              <div className="col-md-6 col-lg-4" key={m.id}>
                <div className="mentor-card">
                  {/* Top part: avatar + name */}
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="mentor-avatar me-3"
                      />
                      <div>
                        <h5 className="mentor-name">{m.name}</h5>
                        <p className="mentor-subject">{m.subject}</p>
                        <div className="mentor-rating">
                          <span className="star">★</span>
                          <span className="rating-score">{m.rating}</span>
                          <span className="rating-details">
                            ({m.reviews}) · {m.sessions} sessions
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="badge-verified">Verified</span>
                  </div>

                  {/* Description */}
                  <p className="mentor-desc mt-3">{m.desc}</p>

                  {/* Tags */}
                  <div className="mentor-tags">
                    {m.tags.map((tag) => (
                      <span className="mentor-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price + button */}
                  <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                    <div className="mentor-price">₹{m.price}/hr</div>
                    <button
                      className="btn btn-sm mentor-book-btn"
                      onClick={handleBookSession}
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorListing;
