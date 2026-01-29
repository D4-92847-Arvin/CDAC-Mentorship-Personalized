import React, { useState } from "react";
import "./Subscriptions.css";

const plans = [
  { id: 1, name: "Pay Per Session", price: 49, period: "/session", icon: "⚡" },
  { id: 2, name: "Monthly Plan", price: 149, period: "/month", icon: "🎓", tag: "Most Popular" },
  { id: 3, name: "Annual Plan", price: 999, period: "/year", icon: "👑" },
];

const Subscriptions = ({ onBackToDashboard }) => {
  const [billing, setBilling] = useState("monthly");
  const [loading, setLoading] = useState(false);

  const studentId = 1; // TODO: Get from JWT later
  const PAYMENT_API = "http://localhost:5000/api/payment";

  // ==============================
  // PAYMENT FUNCTION
  // ==============================
  const handleSubscribe = async (plan) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Check index.html script!");
      return;
    }

    try {
      setLoading(true);
      console.log("Creating order...");

      // STEP 1: Create Razorpay Order
      const res = await fetch(`${PAYMENT_API}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          planId: plan.id,
          amount: plan.price,
        }),
      });

      if (!res.ok) throw new Error("Order creation failed");

      const data = await res.json();
      console.log("Order Created:", data);

      // STEP 2: Open Razorpay Popup
      const options = {
        key: data.razorpayKey,
        amount: plan.price * 100,
        currency: "INR",
        name: "Mentorship Platform",
        description: plan.name,
        order_id: data.orderId,

        handler: async function (response) {
          console.log("Payment Success:", response);

          // STEP 3: Save Subscription
          await fetch(`${PAYMENT_API}/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              studentId,
              planId: plan.id,
              amount: plan.price,
              razorpayOrderId: data.orderId,
              razorpayPaymentId: response.razorpay_payment_id,
            }),
          });

          alert("✅ Subscription Activated Successfully!");
        },

        modal: {
          ondismiss: function () {
            alert("❌ Payment Cancelled");
          },
        },

        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("❌ Payment Failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  // Filter plans by billing toggle (optional logic)
  const visiblePlans =
    billing === "annual"
      ? plans.filter((p) => p.id === 3)
      : plans.filter((p) => p.id !== 3);

  return (
    <div className="subs-page">
      <button className="subs-back" onClick={onBackToDashboard}>
        ← Back to Dashboard
      </button>

      <h2 className="subs-title">Choose Your Plan</h2>
      <div className="subs-subtitle">
        Invest in your future with personalized mentorship
      </div>

      {/* Billing Toggle */}
      <div className="subs-billing-toggle">
        <span className={billing === "monthly" ? "active" : ""} onClick={() => setBilling("monthly")}>
          Monthly
        </span>

        <span className="toggle-switch">
          <input
            type="checkbox"
            id="billing-toggle"
            checked={billing === "annual"}
            onChange={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
          />
          <label htmlFor="billing-toggle"></label>
        </span>

        <span className={billing === "annual" ? "active" : ""} onClick={() => setBilling("annual")}>
          Annual <span className="save-badge">Save 20%</span>
        </span>
      </div>

      {/* Plans */}
      <div className="subs-plans-row">
        {visiblePlans.map((plan) => (
          <div key={plan.id} className="subs-plan-card">
            <div className="subs-plan-icon">{plan.icon}</div>
            {plan.tag && <div className="subs-plan-tag">{plan.tag}</div>}

            <div className="subs-plan-name">{plan.name}</div>
            <div className="subs-plan-price">
              ₹{plan.price}
              <span className="subs-plan-period">{plan.period}</span>
            </div>

            <button
              className="subs-plan-btn primary"
              onClick={() => handleSubscribe(plan)}
              disabled={loading}
            >
              {loading ? "Processing..." : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
