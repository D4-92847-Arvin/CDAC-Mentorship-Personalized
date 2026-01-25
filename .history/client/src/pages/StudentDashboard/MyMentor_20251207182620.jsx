import React from "react";
import "./MyMentor.css";

const MyMentor = () => {
  return (
    <div className="my-mentor-page">
      <aside className="sidebar">
        <div className="logo">Mentorship Personalized</div>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li className="active">My Mentor</li>
            <li>My Sessions</li>
            <li>MCQ Practice</li>
            <li>Subscriptions</li>
            <li>Feedback</li>
          </ul>
        </nav>
      </aside>
      <main className="mentor-content">
        <h1>My Mentor</h1>
        <section className="mentor-profile">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Mentor" className="mentor-img" />
          <div className="mentor-details">
            <div className="mentor-name">Dr. Sarah Mitchell</div>
            <div className="mentor-field">Computer Science</div>
            <div className="mentor-rating">Rating: <span>4.9</span> | Sessions: <span>12</span></div>
            <button className="message-btn">Send Message</button>
          </div>
        </section>
        <section className="mentor-bio">
          <h2>About Mentor</h2>
          <p>Dr. Sarah Mitchell is a passionate educator with 15+ years of experience in Computer Science. She specializes in algorithms, data structures, and career guidance for students.</p>
        </section>
        <section className="mentor-sessions">
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
      </main>
    </div>
  );
};

export default MyMentor;
