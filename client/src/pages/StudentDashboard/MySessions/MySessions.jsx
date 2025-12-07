import React from "react";
import "./MySessions.css";

const upcomingSessions = [
  {
    title: "Algorithm Design Review",
    date: "Oct 8, 2025",
    time: "2:00 PM",
    duration: "60 min",
    status: "Confirmed",
  },
  {
    title: "Career Guidance",
    date: "Oct 10, 2025",
    time: "4:00 PM",
    duration: "45 min",
    status: "Confirmed",
  },
  {
    title: "Code Review Session",
    date: "Oct 12, 2025",
    time: "3:00 PM",
    duration: "60 min",
    status: "Pending",
  },
];

const pastSessions = [
  {
    title: "Introduction to Algorithms",
    date: "Oct 3, 2025",
    time: "2:00 PM",
    rating: 5,
  },
  {
    title: "Data Structures Deep Dive",
    date: "Oct 1, 2025",
    time: "3:00 PM",
    rating: 5,
  },
  {
    title: "System Design Basics",
    date: "Sep 28, 2025",
    time: "4:00 PM",
    rating: 4,
  },
];

const MySessions = () => {
  return (
    <div className="my-sessions-page">
      <h2>My Sessions</h2>
      <p>View and manage your mentorship sessions</p>
      <div className="sessions-main-content">
        <div className="sessions-card">
          <div className="sessions-header">
            <span>Upcoming Sessions</span>
            <button className="schedule-btn"><span role="img" aria-label="calendar">📅</span> Schedule New</button>
          </div>
          {upcomingSessions.map((session, idx) => (
            <div className="session-row" key={idx}>
              <div className="session-title">{session.title}</div>
              <div className="session-info">
                <span>{session.date}</span>
                <span>•</span>
                <span>{session.time}</span>
                <span>•</span>
                <span>Duration: {session.duration}</span>
              </div>
              <div className="session-status">
                <span className={
                  session.status === "Confirmed"
                    ? "status-confirmed"
                    : "status-pending"
                }>{session.status}</span>
                <button className="session-chat-btn"><span role="img" aria-label="chat">💬</span></button>
              </div>
            </div>
          ))}
        </div>
        <div className="sessions-card">
          <div className="sessions-header">Past Sessions</div>
          {pastSessions.map((session, idx) => (
            <div className="session-row" key={idx}>
              <div className="session-title">{session.title}</div>
              <div className="session-info">
                <span>{session.date}</span>
                <span>•</span>
                <span>{session.time}</span>
              </div>
              <div className="session-rating">
                {Array.from({ length: session.rating }).map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
                {session.rating < 5 && (
                  <span className="star inactive">★</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySessions;
