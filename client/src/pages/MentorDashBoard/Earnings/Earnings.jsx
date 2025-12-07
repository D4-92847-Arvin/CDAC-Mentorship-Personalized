import "./Earnings.css";
import EarningsChart from "../../../components/MentorComponents/EarningsChart/EarningsChart";

const transactions = [
  { name: "Alex Thompson", date: "Oct 7, 2025", amount: "$140" },
  { name: "Emma Wilson", date: "Oct 6, 2025", amount: "$140" },
  { name: "Michael Chen", date: "Oct 5, 2025", amount: "$140" },
  { name: "Sarah Johnson", date: "Oct 4, 2025", amount: "$140" }
];

function Earnings() {
  return (
    <div className="earnings-page">
      <div className="page-header">
        <h1 className="page-title">Earnings</h1>
        <p className="page-subtitle">Track your earnings and revenue</p>
      </div>

      <div className="earnings-summary-cards">
        <div className="earnings-stat-card">
          <div className="earnings-stat-icon bg-green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div className="earnings-stat-info">
            <span className="earnings-stat-label">Total Earned</span>
            <span className="earnings-stat-value">$19,800</span>
          </div>
        </div>
        
        <div className="earnings-stat-card">
          <div className="earnings-stat-icon bg-blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
          </div>
          <div className="earnings-stat-info">
            <span className="earnings-stat-label">This Month</span>
            <span className="earnings-stat-value">$4,200</span>
          </div>
        </div>
        
        <div className="earnings-stat-card">
          <div className="earnings-stat-icon bg-purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div className="earnings-stat-info">
            <span className="earnings-stat-label">Avg/Session</span>
            <span className="earnings-stat-value">$140</span>
          </div>
        </div>
      </div>

      <div className="earnings-chart-card">
        <h5 className="section-title">Earnings History</h5>
        <EarningsChart showBadge={false} />
      </div>

      <div className="transactions-section">
        <h5 className="section-title">Recent Transactions</h5>
        <div className="transactions-list">
          {transactions.map((t, i) => (
            <div className="transaction-item" key={i}>
              <div className="transaction-info">
                <div className="transaction-name">{t.name}</div>
                <div className="transaction-details">Session Payment • {t.date}</div>
              </div>
              <span className="transaction-amount">{t.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Earnings;
