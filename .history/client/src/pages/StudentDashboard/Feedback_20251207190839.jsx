import React, { useState } from "react";
import "./Feedback.css";

const feedbackOptions = [
  { label: "Communication", icon: "👍" },
  { label: "Expertise", icon: "👍" },
  { label: "Flexibility", icon: "👍" },
  { label: "Responsiveness", icon: "👍" },
  { label: "Teaching Style", icon: "👍" },
  { label: "Resources", icon: "👍" },
];

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [text, setText] = useState("");

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="feedback-page">
      <h2>Feedback</h2>
      <p>Share feedback about your mentorship experience</p>
      <div className="feedback-card">
        <div className="feedback-section-title">Share Your Feedback</div>
        <div className="feedback-rating-row">
          <div className="feedback-label">How would you rate your mentorship experience?</div>
          <div className="feedback-stars">
            {[1,2,3,4,5].map((star) => (
              <span
                key={star}
                className={"star" + (hover >= star || rating >= star ? " filled" : "")}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
                role="button"
                tabIndex={0}
              >★</span>
            ))}
          </div>
        </div>
        <div className="feedback-label">Tell us about your experience</div>
        <textarea
          className="feedback-textarea"
          placeholder="Share your thoughts, suggestions, or any feedback about your mentorship sessions..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="feedback-label">What did you like the most?</div>
        <div className="feedback-options-row">
          {feedbackOptions.map((opt, idx) => (
            <button
              key={opt.label}
              className={
                "feedback-option-btn" + (selectedOptions.includes(opt.label) ? " selected" : "")
              }
              onClick={() => toggleOption(opt.label)}
            >
              <span className="feedback-option-icon">{opt.icon}</span> {opt.label}
            </button>
          ))}
        </div>
        <button className="feedback-submit-btn">
          <span className="send-icon">✈️</span> Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedback;
