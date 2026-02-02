import React, { useState, useEffect } from "react";
import "./OverviewContent.css";
import { adminDashboardService } from "../../../service/adminDashboardService";

const OverviewContent = ({ chartData, activities, refreshTrigger }) => {
  const [stats, setStats] = useState(null);
  const [growth, setGrowth] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch each item individually with error handling
        let overviewData = null;
        let growthData = null;
        let activityData = null;

        try {
          const response = await adminDashboardService.getOverviewStats();
          console.log("Overview data received:", response);
          overviewData = response;
        } catch (err) {
          console.error("Error fetching overview:", err);
        }

        try {
          const response = await adminDashboardService.getPlatformGrowthData();
          console.log("Growth data received:", response);
          growthData = response;
        } catch (err) {
          console.error("Error fetching growth data:", err);
        }

        try {
          const response = await adminDashboardService.getRecentActivity();
          console.log("Activity data received:", response);
          activityData = response;
        } catch (err) {
          console.error("Error fetching activity:", err);
        }

        // Only use real data if it was successfully fetched
        if (overviewData) {
          setStats(overviewData);
        }
        if (growthData) {
          setGrowth(growthData);
        }
        if (activityData) {
          setActivity(activityData);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Use real data from API if available, otherwise use fallback
  const displayStats =
    stats !== null
      ? stats
      : {
          totalStudents: 580,
          studentGrowthPercent: 12,
          totalMentors: 50,
          mentorGrowthPercent: 8,
          activeSessions: 127,
          sessionGrowthPercent: 15,
          monthlyRevenue: 42500,
          revenueGrowthPercent: 23,
        };

  const displayGrowth = growth && growth.length > 0 ? growth : chartData;
  const displayActivity =
    activity && activity.length > 0 ? activity : activities;

  const formatCurrency = (value) => {
    if (value >= 1000) {
      return "₹" + (value / 1000).toFixed(1) + "K";
    }
    return "₹" + value.toFixed(0);
  };

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
                <h3 className="metric-value">{displayStats.totalStudents}</h3>
                <span className="badge-pill badge-success">
                  📈 +{displayStats.studentGrowthPercent?.toFixed(1)}%
                </span>
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
                <h3 className="metric-value">{displayStats.totalMentors}</h3>
                <span className="badge-pill badge-success">
                  📈 +{displayStats.mentorGrowthPercent?.toFixed(1)}%
                </span>
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
                <h3 className="metric-value">{displayStats.activeSessions}</h3>
                <span className="badge-pill badge-success">
                  📈 +{displayStats.sessionGrowthPercent?.toFixed(1)}%
                </span>
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
                <h3 className="metric-value">
                  {formatCurrency(displayStats.monthlyRevenue)}
                </h3>
                <span className="badge-pill badge-success">
                  📈 +{displayStats.revenueGrowthPercent?.toFixed(1)}%
                </span>
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
                points={displayGrowth
                  .map(
                    (d, i) =>
                      `${100 + i * 120},${340 - (d.students / 600) * 280}`,
                  )
                  .join(" ")}
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
              />
              {displayGrowth.map((d, i) => (
                <circle
                  key={i}
                  cx={100 + i * 120}
                  cy={340 - (d.students / 600) * 280}
                  r="5"
                  fill="#2563eb"
                />
              ))}

              <polyline
                points={displayGrowth
                  .map(
                    (d, i) =>
                      `${100 + i * 120},${340 - (d.mentors / 600) * 280}`,
                  )
                  .join(" ")}
                fill="none"
                stroke="#14b8a6"
                strokeWidth="3"
              />
              {displayGrowth.map((d, i) => (
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

            {displayActivity.map((activityItem, index) => (
              <div key={index} className="activity-item">
                <div className="d-flex align-items-center">
                  <div
                    className="activity-icon"
                    style={{ backgroundColor: "#3b5998" }}
                  >
                    {activityItem.activityType === "MENTOR_APPROVED" && "👤"}
                    {activityItem.activityType === "STUDENT_REGISTERED" && "👥"}
                    {activityItem.activityType === "REVENUE_MILESTONE" && "₹"}
                  </div>
                  <div>
                    <div className="activity-title">{activityItem.title}</div>
                    <div className="activity-subtitle">
                      {activityItem.description}
                    </div>
                  </div>
                </div>
                <div className="activity-time">{activityItem.timeAgo}</div>
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
