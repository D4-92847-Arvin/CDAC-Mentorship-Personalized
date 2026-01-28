import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import MyMentor from "../MyMentor/MyMentor";
import MySessions from "../MySessions/MySessions";
import MCQPractice from "../MCQPractice/MCQPractice";
import Subscriptions from "../Subscriptions/Subscriptions";
import Feedback from "../Feedback/Feedback";

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
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="student-dashboard">
      <aside className="sidebar student-sidebar">
        {/* Logo section */}
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
              type="button"
              className={
                "sidebar-item" + (activeTab === item.label ? " active" : "")
              }
              onClick={() => setActiveTab(item.label)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        {/* Logout button */}
        <div className="sidebar-logout">
          <button className="btn btn-light w-100" onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <main className="dashboard-content">
        {activeTab === "Dashboard" && (
          <>
            <h1>Welcome back, Alex!</h1>
            <p>Here's your learning progress overview</p>
            <div className="stats-row">
              <div className="stat-box">
                <div className="stat-label">Total Study Hours</div>
                <div className="stat-value">127</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Sessions Attended</div>
                <div className="stat-value">12</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">MCQ Tests</div>
                <div className="stat-value">24</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Average Score</div>
                <div className="stat-value">86%</div>
              </div>
            </div>
            <div className="dashboard-widgets">
              <section className="mentor-section">
                <h2>Your Mentor</h2>
                <div className="mentor-info">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Mentor" className="mentor-img" />
                  <div>
                    <div className="mentor-name">Dr. Sarah Mitchell</div>
                    <div className="mentor-field">Computer Science</div>
                    <div className="mentor-rating">Rating: <span>4.9</span> | Sessions: <span>12</span></div>
                    <button className="message-btn">Send Message</button>
                  </div>
                </div>
              </section>
              <section className="weekly-study-section">
                <h2>Weekly Study Hours</h2>
                <div className="bar-chart">
                  {/* Simple bar chart mockup */}
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, idx) => (
                    <div key={day} className="bar-item">
                      <div className="bar" style={{height: `${[2,3,1,4,2,3,2][idx]*20}px`}}></div>
                      <span>{day}</span>
                    </div>
                  ))}
                </div>
              </section>
              <section className="upcoming-section">
                <h2>Upcoming Sessions</h2>
                <div className="session-card">
                  <div>Algorithm Design Review</div>
                  <div>Oct 8, 2025 | 2:00 PM - 60 min</div>
                </div>
                <div className="session-card">
                  <div>Career Guidance</div>
                  <div>Oct 10, 2025 | 4:00 PM - 45 min</div>
                </div>
                <button className="view-all-btn">View All Sessions</button>
              </section>
              <section className="performance-section">
                <h2>MCQ Performance</h2>
                <div className="performance-bars">
                  <div className="performance-bar"><span>Math</span><div className="bar" style={{width: '85%'}}></div><span>85%</span></div>
                  <div className="performance-bar"><span>CS</span><div className="bar" style={{width: '92%'}}></div><span>92%</span></div>
                  <div className="performance-bar"><span>Physics</span><div className="bar" style={{width: '78%'}}></div><span>78%</span></div>
                  <div className="performance-bar"><span>English</span><div className="bar" style={{width: '88%'}}></div><span>88%</span></div>
                </div>
              </section>
              <section className="activity-section">
                <h2>Activity Distribution</h2>
                <div className="activity-chart">
                  {/* Simple donut chart mockup */}
                  <svg width="100" height="100" viewBox="0 0 32 32">
                    <circle r="16" cx="16" cy="16" fill="#eee" />
                    <path d="M16 16 L16 0 A16 16 0 0 1 29.2 8.8 Z" fill="#1e40af" />
                    <path d="M16 16 L29.2 8.8 A16 16 0 0 1 24.8 29.2 Z" fill="#22c55e" />
                    <path d="M16 16 L24.8 29.2 A16 16 0 0 1 16 32 Z" fill="#f59e42" />
                  </svg>
                  <ul className="activity-legend">
                    <li><span className="dot" style={{background: '#1e40af'}}></span>Study Time 45%</li>
                    <li><span className="dot" style={{background: '#22c55e'}}></span>Practice 30%</li>
                    <li><span className="dot" style={{background: '#f59e42'}}></span>Sessions 25%</li>
                  </ul>
                </div>
              </section>
            </div>
          </>
        )}
        {activeTab === "My Mentor" && <MyMentor />}
        {activeTab === "My Sessions" && <MySessions />}
        {activeTab === "MCQ Practice" && <MCQPractice onBackToDashboard={() => setActiveTab("Dashboard")} />}
        {activeTab === "Subscriptions" && <Subscriptions onBackToDashboard={() => setActiveTab("Dashboard")} />}
        {activeTab === "Feedback" && <Feedback />}
      </main>
    </div>
  );
};

export default StudentDashboard;
