import React from "react";
import "./MyMentor.css";

const MyMentor = () => {
  return (
    <div className="my-mentor-page">
      <h2>Your Mentor</h2>
      <p>Connect with your mentor and schedule sessions</p>
      <div className="mentor-main-content">
        <div className="mentor-profile-card">
          <div className="mentor-profile-header">Mentor Profile</div>
          <div className="mentor-profile-body">
            <img className="mentor-avatar" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Dr. Sarah Mitchell" />
            <div>
              <div className="mentor-name">Dr. Sarah Mitchell</div>
              <div className="mentor-field">Computer Science</div>
              <div className="mentor-rating">
                <span className="star">⭐</span> 4.9 <span className="sessions-completed">12 sessions completed</span>
              </div>
              <div className="mentor-about">
                <b>About</b><br />
                10+ years experience in teaching algorithms and data structures. Passionate about helping students reach their full potential.
              </div>
              <div className="mentor-expertise">
                <b>Expertise</b><br />
                <span className="expertise-badge">Algorithms</span>
                <span className="expertise-badge">Data Structures</span>
                <span className="expertise-badge">System Design</span>
                <span className="expertise-badge">Career Guidance</span>
              </div>
              <div className="mentor-contact">
                <b>Contact</b><br />
                sarah.mitchell@mentorship.com
              </div>
            </div>
          </div>
          <div className="mentor-actions">
            <button className="send-message-btn"><span role="img" aria-label="message">💬</span> Send Message</button>
            <button className="schedule-session-btn"><span role="img" aria-label="calendar">📅</span> Schedule Session</button>
          </div>
        </div>
        <div className="mentor-session-stats">
          <div className="stats-title">Session Statistics</div>
          <div className="stats-box">
            <div className="stats-label">Total Sessions</div>
            <div className="stats-value">12</div>
          </div>
          <div className="stats-box">
            <div className="stats-label">Average Rating</div>
            <div className="stats-value"><span className="star">⭐</span> 4.9</div>
          </div>
          <div className="stats-box">
            <div className="stats-label">Next Session</div>
            <div className="stats-value">Oct 8, 2:00 PM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMentor;
