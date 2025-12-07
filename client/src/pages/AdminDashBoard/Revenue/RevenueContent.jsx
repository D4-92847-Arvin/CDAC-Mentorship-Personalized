import React from "react";
import "./RevenueContent.css";

const RevenueContent = () => {
  const revenueData = [
    { month: "January", revenue: 28500, transactions: 142 },
    { month: "February", revenue: 31200, transactions: 156 },
    { month: "March", revenue: 35800, transactions: 179 },
    { month: "April", revenue: 38400, transactions: 192 },
    { month: "May", revenue: 40100, transactions: 201 },
    { month: "June", revenue: 42500, transactions: 213 },
  ];

  return (
    <div>
      <div className="mb-4">
        <h2 className="page-title mb-1">Revenue</h2>
        <p className="page-subtitle">Track revenue and financial metrics</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-3">
          <div className="revenue-card h-100">
            <div className="revenue-stat-title">Total Revenue</div>
            <div className="revenue-stat-value">$216.5K</div>
            <span className="revenue-growth">+23%</span>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="revenue-card h-100">
            <div className="revenue-stat-title">This Month</div>
            <div className="revenue-stat-value">$42.5K</div>
            <span className="revenue-growth">+6%</span>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="revenue-card h-100">
            <div className="revenue-stat-title">Avg. Transaction</div>
            <div className="revenue-stat-value">$200</div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="revenue-card h-100">
            <div className="revenue-stat-title">Total Transactions</div>
            <div className="revenue-stat-value">1,083</div>
          </div>
        </div>
      </div>

      <div className="revenue-table-card">
        <h5 className="card-header-title mb-3">Monthly Revenue</h5>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue</th>
                <th>Transactions</th>
                <th>Avg. per Transaction</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((item, index) => (
                <tr key={index}>
                  <td className="fw-semibold">{item.month}</td>
                  <td className="text-teal fw-semibold">
                    ${item.revenue.toLocaleString()}
                  </td>
                  <td>{item.transactions}</td>
                  <td>${Math.round(item.revenue / item.transactions)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueContent;
