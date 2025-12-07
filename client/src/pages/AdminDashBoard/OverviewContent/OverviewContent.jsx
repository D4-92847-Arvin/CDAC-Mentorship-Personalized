import React from "react";
import "./OverviewContent.css";

const OverviewContent = ({ chartData, activities }) => {
  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h2 className="page-title mb-1">Platform Overview</h2>
        <p className="page-subtitle">
          Monitor platform performance and key metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {/* Total Students */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="metric-card h-100">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="text-muted small mb-1">Total Students</div>
                <h3 className="metric-value">580</h3>
                <span className="badge-pill badge-success">📈 +12%</span>
              </div>
              <div className="metric-icon bg-students">
                <span>👥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Mentors */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="metric-card h-100">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="text-muted small mb-1">Total Mentors</div>
                <h3 className="metric-value">50</h3>
                <span className="badge-pill badge-success">📈 +8%</span>
              </div>
              <div className="metric-icon bg-mentors">
                <span>👤</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="metric-card h-100">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="text-muted small mb-1">Active Sessions</div>
                <h3 className="metric-value">127</h3>
                <span className="badge-pill badge-success">📈 +15%</span>
              </div>
              <div className="metric-icon bg-sessions">
                <span>📈</span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="metric-card h-100">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="text-muted small mb-1">Monthly Revenue</div>
                <h3 className="metric-value">$42.5K</h3>
                <span className="badge-pill badge-success">📈 +23%</span>
              </div>
              <div className="metric-icon bg-revenue">
                <span>💲</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Activity */}
      <div className="row g-3">
        <div className="col-12 col-lg-8">
          <div className="custom-card h-100">
            <h5 className="card-header-title mb-3">Platform Growth</h5>

            <svg viewBox="0 0 800 400" className="svg-chart">
              {/* Grid lines */}
              {[0, 150, 300, 450, 600].map((val, i) => (
                <g key={i}>
                  <line
                    x1="60"
                    y1={340 - (val / 600) * 280}
                    x2="760"
                    y2={340 - (val / 600) * 280}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <text
                    x="30"
                    y={345 - (val / 600) * 280}
                    className="chart-label"
                  >
                    {val}
                  </text>
                </g>
              ))}

              {chartData.map((d, i) => (
                <text
                  key={i}
                  x={100 + i * 120}
                  y="370"
                  className="chart-label"
                  textAnchor="middle"
                >
                  {d.month}
                </text>
              ))}

              <polyline
                points={chartData
                  .map(
                    (d, i) =>
                      `${100 + i * 120},${340 - (d.students / 600) * 280}`
                  )
                  .join(" ")}
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
              />
              {chartData.map((d, i) => (
                <circle
                  key={i}
                  cx={100 + i * 120}
                  cy={340 - (d.students / 600) * 280}
                  r="5"
                  fill="#2563eb"
                />
              ))}

              <polyline
                points={chartData
                  .map(
                    (d, i) =>
                      `${100 + i * 120},${340 - (d.mentors / 600) * 280}`
                  )
                  .join(" ")}
                fill="none"
                stroke="#14b8a6"
                strokeWidth="3"
              />
              {chartData.map((d, i) => (
                <circle
                  key={i}
                  cx={100 + i * 120}
                  cy={340 - (d.mentors / 600) * 280}
                  r="5"
                  fill="#14b8a6"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-12 col-lg-4">
          <div className="custom-card h-100">
            <h5 className="card-header-title mb-3">Recent Activity</h5>

            {activities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="d-flex align-items-center">
                  <div
                    className="activity-icon"
                    style={{ backgroundColor: activity.bg }}
                  >
                    {activity.icon}
                  </div>
                  <div>
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-subtitle">{activity.subtitle}</div>
                  </div>
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="row g-3 mt-3">
        <div className="col-12">
          <div className="custom-card d-flex justify-content-between align-items-center">
            <h5 className="card-header-title mb-0">Pending Verifications</h5>
            <button className="btn btn-link text-decoration-none p-0">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
