import React, { useState } from "react";
import "./Subscriptions.css";

const plans = [
  {
    name: "Pay Per Session",
    price: 49,
    period: "/month",
    icon: "⚡",
    features: [
      "Book individual sessions",
      "Choose any verified mentor",
      "Session recordings",
      "Email support",
      "Basic progress tracking",
    ],
    button: "Get Started",
    highlight: false,
  },
  {
    name: "Monthly Plan",
    price: 149,
    period: "/month",
    icon: "🎓",
    features: [
      "Up to 4 sessions per month",
      "Priority mentor selection",
      "Session recordings",
      "MCQ practice access",
      "Advanced analytics",
      "Priority support",
      "Flexible scheduling",
    ],
    button: "Get Started",
    highlight: true,
    tag: "Most Popular",
  },
  {
    name: "Annual Plan",
    price: 99,
    period: "/month",
    icon: "👑",
    features: [
      "Unlimited sessions",
      "Dedicated mentor assignment",
      "Session recordings",
      "Full MCQ library access",
      "Premium analytics dashboard",
      "24/7 priority support",
      "Career guidance sessions",
      "Certificate of completion",
      "Save 20% annually",
    ],
    button: "Get Started",
    highlight: false,
  },
];

const Subscriptions = ({ onBackToDashboard }) => {
  const [billing, setBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("Monthly Plan");
  return (
    <div className="subs-page">
      <button className="subs-back" onClick={onBackToDashboard}>&larr; Back to Dashboard</button>
      <h2 className="subs-title">Choose Your Plan</h2>
      <div className="subs-subtitle">Invest in your future with personalized mentorship</div>
      <div className="subs-billing-toggle">
        <span className={billing === "monthly" ? "active" : ""} onClick={() => {
          setBilling("monthly");
          setSelectedPlan("Monthly Plan");
        }}>Monthly</span>
        <span className="toggle-switch">
          <input type="checkbox" id="billing-toggle" checked={billing === "annual"} onChange={() => {
            const newBilling = billing === "monthly" ? "annual" : "monthly";
            setBilling(newBilling);
            setSelectedPlan(newBilling === "annual" ? "Annual Plan" : "Monthly Plan");
          }} />
          <label htmlFor="billing-toggle"></label>
        </span>
        <span className={billing === "annual" ? "active" : ""} onClick={() => {
          setBilling("annual");
          setSelectedPlan("Annual Plan");
        }}>Annual <span className="save-badge">Save 20%</span></span>
      </div>
      <div className="subs-plans-row">
        {plans.map((plan, idx) => {
          const isSelected = (billing === "annual" && plan.name === "Annual Plan") || (billing === "monthly" && plan.name === "Monthly Plan");
          return (
            <div
              key={plan.name}
              className={"subs-plan-card" + (isSelected ? " highlight" : "")}
            >
              <div className="subs-plan-icon">{plan.icon}</div>
              {plan.tag && <div className="subs-plan-tag">{plan.tag}</div>}
              <div className="subs-plan-name">{plan.name}</div>
              <div className="subs-plan-price">${plan.price}<span className="subs-plan-period">{plan.period}</span></div>
              <ul className="subs-plan-features">
                {plan.features.map((f, i) => (
                  <li key={i}><span className="check">✔</span> {f}</li>
                ))}
              </ul>
              <button
                className={"subs-plan-btn" + (isSelected ? " primary" : "")}
                onClick={() => {
                  if (plan.name === "Annual Plan") {
                    setBilling("annual");
                    setSelectedPlan("Annual Plan");
                  } else if (plan.name === "Monthly Plan") {
                    setBilling("monthly");
                    setSelectedPlan("Monthly Plan");
                  }
                }}
              >
                {plan.button}
              </button>
            </div>
          );
        })}
      </div>
      <div className="subs-includes-row">
        <div className="subs-includes-card">
          <div className="subs-includes-item"><span className="includes-icon">✔</span> <b>Verified Mentors</b><br /><span className="includes-desc">All mentors are carefully vetted and verified</span></div>
          <div className="subs-includes-item"><span className="includes-icon">✔</span> <b>Progress Tracking</b><br /><span className="includes-desc">Monitor your learning journey with detailed analytics</span></div>
          <div className="subs-includes-item"><span className="includes-icon">✔</span> <b>Flexible Scheduling</b><br /><span className="includes-desc">Book sessions at your convenience</span></div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
