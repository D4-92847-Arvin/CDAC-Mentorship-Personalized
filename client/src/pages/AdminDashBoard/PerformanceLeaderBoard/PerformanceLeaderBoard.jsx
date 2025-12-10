import React from "react";
import "./PerformanceLeaderboards.css";

const TopListItem = ({
  idx,
  title,
  subtitle,
  meta,
  score,
  highlight,
  scoreClass,
}) => (
  <div className={`pl-item ${highlight ? "pl-item--highlight" : ""}`}>
    <div className="pl-item__left">
      <div className="pl-item__rank">{title}</div>
      <div className="pl-item__meta">
        <div className="pl-item__name">{subtitle}</div>
        <div className="pl-item__subtext">{meta}</div>
      </div>
    </div>
    <div className={`pl-item__score ${scoreClass || ""}`}>⭐ {score}</div>
  </div>
);

export const PerformanceLeaderboards = () => {
  const topMentors = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      rating: 4.9,
      sessions: 156,
      students: 42,
      badge: "🥇",
    },
    {
      id: 2,
      name: "Prof. James Wilson",
      rating: 4.8,
      sessions: 142,
      students: 38,
      badge: "🥈",
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      rating: 4.8,
      sessions: 128,
      students: 35,
      badge: "🥉",
    },
    {
      id: 4,
      name: "Dr. Michael Brown",
      rating: 4.7,
      sessions: 115,
      students: 32,
      badge: "",
    },
    {
      id: 5,
      name: "Prof. Lisa Anderson",
      rating: 4.7,
      sessions: 108,
      students: 29,
      badge: "",
    },
  ];

  const topStudents = [
    {
      id: 1,
      name: "Alex Thompson",
      completed: 48,
      rating: 5.0,
      hours: 96,
      badge: "🥇",
    },
    {
      id: 2,
      name: "Maria Garcia",
      completed: 45,
      rating: 4.9,
      hours: 90,
      badge: "🥈",
    },
    {
      id: 3,
      name: "John Davis",
      completed: 42,
      rating: 4.9,
      hours: 84,
      badge: "🥉",
    },
    {
      id: 4,
      name: "Sophie Lee",
      completed: 38,
      rating: 4.8,
      hours: 76,
      badge: "",
    },
    {
      id: 5,
      name: "Ryan Miller",
      completed: 35,
      rating: 4.8,
      hours: 70,
      badge: "",
    },
  ];

  const longestStreaks = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      streak: 42,
      type: "Mentor",
      lastActive: "Today",
    },
    {
      id: 2,
      name: "Alex Thompson",
      streak: 38,
      type: "Student",
      lastActive: "Today",
    },
    {
      id: 3,
      name: "Prof. James Wilson",
      streak: 35,
      type: "Mentor",
      lastActive: "Today",
    },
    {
      id: 4,
      name: "Maria Garcia",
      streak: 32,
      type: "Student",
      lastActive: "1 day ago",
    },
  ];

  return (
    <section className="pl-root p-4">
      <div className="pl-header mb-4">
        <h2 className="pl-title">Performance Leaderboards</h2>
        <p className="pl-subtitle">Top performers and active contributors</p>
      </div>

      <div className="row g-3">
        {/* Top Mentors */}
        <div className="col-lg-6">
          <div className="card shadow-sm pl-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-heading">🏆 Top Rated Mentors</h5>
                <span className="text-muted small">This Month</span>
              </div>

              <div className="pl-list">
                {topMentors.map((m, i) => (
                  <TopListItem
                    key={m.id}
                    idx={i}
                    title={m.badge || `#${i + 1}`}
                    subtitle={m.name}
                    meta={`${m.sessions} sessions • ${m.students} students`}
                    score={m.rating}
                    highlight={i < 3}
                    scoreClass="pl-score--yellow"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Students */}
        <div className="col-lg-6">
          <div className="card shadow-sm pl-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-heading">⭐ Most Active Students</h5>
                <span className="text-muted small">This Month</span>
              </div>

              <div className="pl-list">
                {topStudents.map((s, i) => (
                  <TopListItem
                    key={s.id}
                    idx={i}
                    title={s.badge || `#${i + 1}`}
                    subtitle={s.name}
                    meta={`${s.completed} sessions • ${s.hours}h total`}
                    score={s.rating}
                    highlight={i < 3}
                    scoreClass="pl-score--blue"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Longest Streaks */}
        <div className="col-12">
          <div className="card shadow-sm pl-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-heading">🔥 Longest Activity Streaks</h5>
                <span className="text-muted small">Consecutive Days</span>
              </div>

              <div className="row g-3">
                {longestStreaks.map((item) => (
                  <div key={item.id} className="col-md-3">
                    <div className="streak-card">
                      <div className="streak-value">{item.streak}</div>
                      <div className="streak-name">{item.name}</div>
                      <div
                        className={`streak-type ${
                          item.type === "Mentor"
                            ? "type-mentor"
                            : "type-student"
                        }`}
                      >
                        {item.type}
                      </div>
                      <div className="streak-last text-muted">
                        {item.lastActive}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceLeaderboards;
