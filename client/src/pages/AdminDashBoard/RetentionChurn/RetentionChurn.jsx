import React from "react";
import "./RetentionChurn.css";

const ProgressBar = ({ percent }) => (
  <div className="rc-progress">
    <div className="rc-progress__bar" style={{ width: `${percent}%` }} />
  </div>
);

export const RetentionChurn = () => {
  const retentionData = [
    { period: "Week 1", retained: 95, churned: 5 },
    { period: "Week 2", retained: 88, churned: 12 },
    { period: "Week 3", retained: 82, churned: 18 },
    { period: "Week 4", retained: 78, churned: 22 },
    { period: "Month 2", retained: 72, churned: 28 },
    { period: "Month 3", retained: 68, churned: 32 },
  ];

  const churnReasons = [
    { reason: "Lack of time", count: 42, percentage: 35 },
    { reason: "Found alternative", count: 28, percentage: 23 },
    { reason: "Cost concerns", count: 24, percentage: 20 },
    { reason: "Technical issues", count: 15, percentage: 12 },
    { reason: "Other", count: 12, percentage: 10 },
  ];

  const cohortAnalysis = [
    { cohort: "Jan 2024", month1: 100, month2: 85, month3: 72, month4: 68 },
    { cohort: "Feb 2024", month1: 100, month2: 88, month3: 75, month4: 70 },
    { cohort: "Mar 2024", month1: 100, month2: 90, month3: 78, month4: 72 },
    { cohort: "Apr 2024", month1: 100, month2: 92, month3: 80, month4: null },
  ];

  return (
    <section className="rc-root p-4">
      <div className="rc-header mb-4">
        <h2 className="rc-title">User Retention &amp; Churn</h2>
        <p className="rc-subtitle">
          Track user engagement and retention metrics
        </p>
      </div>

      {/* Key metrics */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="rc-card">
            <div className="rc-card__title">Monthly Active Users</div>
            <div className="rc-card__value">594</div>
            <div className="rc-card__badge rc-positive">+8%</div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="rc-card">
            <div className="rc-card__title">Retention Rate</div>
            <div className="rc-card__value">78%</div>
            <div className="rc-card__badge rc-positive">+3%</div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="rc-card">
            <div className="rc-card__title">Churn Rate</div>
            <div className="rc-card__value">22%</div>
            <div className="rc-card__badge rc-negative">-2%</div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="rc-card">
            <div className="rc-card__title">Avg. Lifetime (Days)</div>
            <div className="rc-card__value">127</div>
            <div className="rc-card__badge rc-positive">+12</div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {/* Retention chart area (SVG) */}
        <div className="col-lg-8">
          <div className="card shadow-sm rc-card--large">
            <div className="card-body">
              <h5 className="card-heading mb-3">Retention Over Time</h5>

              <svg viewBox="0 0 800 350" className="rc-svg">
                {[0, 25, 50, 75, 100].map((val, i) => (
                  <g key={i}>
                    <line
                      x1="60"
                      y1={300 - val * 2.4}
                      x2="760"
                      y2={300 - val * 2.4}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                    <text
                      x="30"
                      y={305 - val * 2.4}
                      fill="#9ca3af"
                      fontSize="14"
                    >
                      {val}%
                    </text>
                  </g>
                ))}

                {retentionData.map((d, i) => (
                  <text
                    key={i}
                    x={100 + i * 120}
                    y="330"
                    fill="#9ca3af"
                    fontSize="13"
                    textAnchor="middle"
                  >
                    {d.period}
                  </text>
                ))}

                {/* lines */}
                <polyline
                  points={retentionData
                    .map((d, i) => `${100 + i * 120},${300 - d.retained * 2.4}`)
                    .join(" ")}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                />
                {retentionData.map((d, i) => (
                  <circle
                    key={`r-${i}`}
                    cx={100 + i * 120}
                    cy={300 - d.retained * 2.4}
                    r="5"
                    fill="#10b981"
                  />
                ))}

                <polyline
                  points={retentionData
                    .map((d, i) => `${100 + i * 120},${300 - d.churned * 2.4}`)
                    .join(" ")}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                />
                {retentionData.map((d, i) => (
                  <circle
                    key={`c-${i}`}
                    cx={100 + i * 120}
                    cy={300 - d.churned * 2.4}
                    r="5"
                    fill="#ef4444"
                  />
                ))}

                {/* legend */}
                <g>
                  <circle cx="620" cy="30" r="5" fill="#10b981" />
                  <text x="635" y="35" fill="#4b5563" fontSize="14">
                    Retained
                  </text>
                  <circle cx="720" cy="30" r="5" fill="#ef4444" />
                  <text x="735" y="35" fill="#4b5563" fontSize="14">
                    Churned
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Churn Reasons */}
        <div className="col-lg-4">
          <div className="card shadow-sm rc-card--large">
            <div className="card-body">
              <h5 className="card-heading mb-3">Churn Reasons</h5>

              {churnReasons.map((item, idx) => (
                <div key={idx} className="rc-churn-reason mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">{item.reason}</span>
                    <span className="text-muted small">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <ProgressBar percent={item.percentage} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cohort Analysis */}
        <div className="col-12">
          <div className="card shadow-sm rc-card--large">
            <div className="card-body">
              <h5 className="card-heading mb-3">Cohort Retention Analysis</h5>

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Cohort</th>
                      <th>Month 1</th>
                      <th>Month 2</th>
                      <th>Month 3</th>
                      <th>Month 4</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cohortAnalysis.map((c, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{c.cohort}</td>
                        <td>
                          <span className="rc-pill rc-pill--good">
                            {c.month1}%
                          </span>
                        </td>
                        <td>
                          <span
                            className={`rc-pill ${
                              c.month2 >= 85 ? "rc-pill--good" : "rc-pill--warn"
                            }`}
                          >
                            {c.month2}%
                          </span>
                        </td>
                        <td>
                          <span
                            className={`rc-pill ${
                              c.month3 >= 75 ? "rc-pill--warn" : "rc-pill--bad"
                            }`}
                          >
                            {c.month3}%
                          </span>
                        </td>
                        <td>
                          {c.month4 ? (
                            <span
                              className={`rc-pill ${
                                c.month4 >= 70
                                  ? "rc-pill--warn"
                                  : "rc-pill--bad"
                              }`}
                            >
                              {c.month4}%
                            </span>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RetentionChurn;
