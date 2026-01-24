// src/pages/Pricing/Pricing.jsx
import React, { useState, useMemo } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import { mentors, getMentorById } from "../../data/mentorData";
import "./Pricing.css";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' | 'annual'

  const selectedId = localStorage.getItem("selectedMentorId");
  const mentor = selectedId ? getMentorById(selectedId) : mentors[0]; // fallback

  const basePrice = mentor?.price ?? 900; // hourly rate from mentorsData

  // derive plan prices from mentor's base price
  const { payPerSession, monthlyPlan, annualPlan } = useMemo(() => {
    const perSession = basePrice;
    const monthly = basePrice * 4; // approx 4 sessions / month
    const annual = monthly * 12 * 0.8; // 20% off yearly
    return {
      payPerSession: perSession,
      monthlyPlan: billingCycle === "monthly" ? monthly : monthly * 12, // if user flips, just scale
      annualPlan: annual,
    };
  }, [basePrice, billingCycle]);

  const priceSuffix = billingCycle === "monthly" ? "/month" : "/year";

  const handlePrimarySelect = (planName) => {
    // later you can navigate to checkout/payment
    alert(
      `You chose the ${planName} with mentor ${mentor?.name || ""}. (Checkout coming soon)`
    );
  };

  return (
    <div className="pricing-root">
      <Navbar />

      <section className="pricing-section">
        <div className="container text-center">
          <h1 className="pricing-title">Choose Your Plan</h1>
          <p className="pricing-subtitle">
            Invest in your future with personalized mentorship
            {mentor && (
              <>
                {" "}
                with <strong>{mentor.name}</strong> (
                <span className="text-muted">{mentor.subject}</span>)
              </>
            )}
            .
          </p>

          {/* Billing toggle */}
          <div className="billing-toggle-wrapper">
            <button
              className={`billing-toggle-btn ${
                billingCycle === "monthly" ? "active" : ""
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`billing-toggle-btn ${
                billingCycle === "annual" ? "active" : ""
              }`}
              onClick={() => setBillingCycle("annual")}
            >
              Annual
            </button>
            {billingCycle === "annual" && (
              <span className="save-badge">Save 20%</span>
            )}
          </div>

          {/* Plan cards */}
          <div className="row g-4 mt-4 justify-content-center">
            {/* Pay Per Session */}
            <div className="col-md-4">
              <div className="plan-card">
                <div className="plan-icon">⚡</div>
                <h5 className="plan-name">Pay Per Session</h5>
                <p className="plan-price">
                  ₹{payPerSession}
                  <span className="plan-price-sub">{priceSuffix}</span>
                </p>
                <ul className="plan-features">
                  <li>Book individual sessions</li>
                  <li>Choose any verified mentor</li>
                  <li>Session recordings</li>
                  <li>Email support</li>
                  <li>Basic progress tracking</li>
                </ul>
                <button
                  className="btn plan-btn-outline"
                  onClick={() => handlePrimarySelect("Pay Per Session")}
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Monthly Plan – highlighted */}
            <div className="col-md-4">
              <div className="plan-card plan-card-featured">
                <div className="plan-badge">Most Popular</div>
                <div className="plan-icon">🎓</div>
                <h5 className="plan-name">Monthly Plan</h5>
                <p className="plan-price">
                  ₹{monthlyPlan}
                  <span className="plan-price-sub">{priceSuffix}</span>
                </p>
                <ul className="plan-features">
                  <li>Up to 4 sessions per month</li>
                  <li>Priority mentor selection</li>
                  <li>Session recordings</li>
                  <li>MCQ practice access</li>
                  <li>Advanced analytics</li>
                  <li>Priority support</li>
                  <li>Flexible scheduling</li>
                </ul>
                <button
                  className="btn plan-btn-primary"
                  onClick={() => handlePrimarySelect("Monthly Plan")}
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Annual Plan */}
            <div className="col-md-4">
              <div className="plan-card">
                <div className="plan-icon">👑</div>
                <h5 className="plan-name">Annual Plan</h5>
                <p className="plan-price">
                  ₹{annualPlan.toFixed(0)}
                  <span className="plan-price-sub">/year</span>
                </p>
                <ul className="plan-features">
                  <li>Unlimited sessions</li>
                  <li>Dedicated mentor assignment</li>
                  <li>Session recordings</li>
                  <li>Full MCQ library access</li>
                  <li>Premium analytics dashboard</li>
                  <li>24/7 priority support</li>
                  <li>Certificate of completion</li>
                  <li>Save 20% annually</li>
                </ul>
                <button
                  className="btn plan-btn-outline"
                  onClick={() => handlePrimarySelect("Annual Plan")}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Bottom feature strip */}
          <div className="row g-3 mt-5 justify-content-center">
            <div className="col-md-4">
              <div className="feature-strip-card">
                <div className="feature-strip-icon">✔</div>
                <h6>Verified Mentors</h6>
                <p>All mentors are carefully vetted and verified.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-strip-card">
                <div className="feature-strip-icon">✔</div>
                <h6>Progress Tracking</h6>
                <p>Monitor your learning journey with detailed analytics.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-strip-card">
                <div className="feature-strip-icon">✔</div>
                <h6>Flexible Scheduling</h6>
                <p>Book sessions at times that work for you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
