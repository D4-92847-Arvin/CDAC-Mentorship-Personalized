import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import MyMentor from "../MyMentor/MyMentor";
import MySessions from "../MySessions/MySessions";
import MCQPractice from "../MCQPractice/MCQPractice";
import Subscriptions from "../Subscriptions/Subscriptions";
import Feedback from "../Feedback/Feedback";
import EditProfileModal from "./EditProfileModal";
import { getStudentDashboard } from "../../../service/studentservice";
import { getStudentId, clearStudentAuth } from "../../../service/authService";
import { useDarkMode } from "../../../context/DarkModeContext";

const sidebarItems = [
  { label: "Dashboard", icon: "🏠" },
  { label: "My Mentor", icon: "👩‍🏫" },
  { label: "My Sessions", icon: "📅" },
  { label: "MCQ Practice", icon: "📝" },
  { label: "Subscriptions", icon: "💳" },
  { label: "Feedback", icon: "💬" },
];

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const studentId = getStudentId();

    if (!studentId) {
      setError("Student ID not found. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    fetchDashboard(studentId);
  }, [navigate]);

  const fetchDashboard = async (studentId) => {
    try {
      setLoading(true);
      const res = await getStudentDashboard(studentId);
      console.log("Dashboard Response:", res.data);
      setDashboard(res.data);
      setError(null);
    } catch (err) {
      console.error("Dashboard Error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load dashboard. Please refresh."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearStudentAuth();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="student-dashboard">
        <div className="loading-container">
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !dashboard) {
    return (
      <div className="student-dashboard">
        <div className="error-container">
          <p>⚠️ {error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`student-dashboard ${isDarkMode ? 'dark-mode' : ''}`}>
      <aside className="sidebar student-sidebar">

        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-box">
            <div className="logo-circle">
              <div className="logo-dot" />
            </div>
          </div>
          <div>
            <div className="logo-title">Mentorship</div>
            <div className="logo-subtitle">Personalized</div>
          </div>
        </div>

        {/* Menu */}
        <nav className="sidebar-menu">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={"sidebar-item" + (activeTab === item.label ? " active" : "")}
              onClick={() => setActiveTab(item.label)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="sidebar-logout">
          <button 
            className="btn btn-dark-mode-toggle"
            onClick={toggleDarkMode}
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <button className="btn btn-light w-100" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-content">
        {error && (
          <div className="alert-banner">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === "Dashboard" && (
          <>
            <div className="dashboard-header">
              <div>
                <h1>Student Dashboard</h1>
                <p>Your session analytics</p>
              </div>
              <button 
                className="edit-profile-btn"
                onClick={() => setIsEditModalOpen(true)}
              >
                ✏️ Edit Profile
              </button>
            </div>

            {dashboard ? (
              <div className="stats-row">
                <div className="stat-box">
                  <div className="stat-label">Total Sessions</div>
                  <div className="stat-value">
                    {dashboard.totalSessions || 0}
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-label">Upcoming Sessions</div>
                  <div className="stat-value">
                    {dashboard.upcomingSessions || 0}
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-label">Completed Sessions</div>
                  <div className="stat-value">
                    {dashboard.completedSessions || 0}
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-label">Total Spent (₹)</div>
                  <div className="stat-value">
                    ₹ {dashboard.totalSpent || 0}
                  </div>
                </div>
              </div>
            ) : (
              <div className="stats-row">
                <p>Unable to load dashboard statistics.</p>
              </div>
            )}
          </>
        )}

        {activeTab === "My Mentor" && <MyMentor />}
        {activeTab === "My Sessions" && <MySessions />}
        {activeTab === "MCQ Practice" && (
          <MCQPractice onBackToDashboard={() => setActiveTab("Dashboard")} />
        )}
        {activeTab === "Subscriptions" && (
          <Subscriptions onBackToDashboard={() => setActiveTab("Dashboard")} />
        )}
        {activeTab === "Feedback" && <Feedback />}

        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onProfileUpdated={fetchDashboard}
        />
      </main>
    </div>
  );
};

export default StudentDashboard;
