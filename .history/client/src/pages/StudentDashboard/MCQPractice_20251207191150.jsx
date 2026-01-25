import React, { useState } from "react";
import "./MCQPractice.css";

const questions = [
  {
    question: "What is the time complexity of binary search in a sorted array?",
    options: [
      "O(n)",
      "O(log n)",
      "O(n log n)",
      "O(1)"
    ],
    answer: 1,
  },
  // Add more questions as needed
];

const MCQPractice = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);

  return (
    <div className="mcq-practice-page">
      <div className="mcq-header-row">
        <a href="#" className="back-link">&larr; Back to Dashboard</a>
        <div className="timer">⏲️ 10:00</div>
      </div>
      <div className="mcq-card">
        <div className="mcq-title-row">
          <span className="mcq-title">Computer Science MCQ Practice</span>
          <span className="mcq-qno">Question {current + 1} of {questions.length}</span>
        </div>
        <div className="mcq-progress-bar">
          <div className="mcq-progress" style={{ width: `${((current + 1) / questions.length) * 100}%` }}></div>
        </div>
        <div className="mcq-question">{questions[current].question}</div>
        <div className="mcq-options">
          {questions[current].options.map((opt, idx) => (
            <button
              key={idx}
              className={
                "mcq-option" + (selected === idx ? " selected" : "")
              }
              onClick={() => setSelected(idx)}
            >
              <span className="mcq-option-label">{String.fromCharCode(65 + idx)}</span>
              {opt}
            </button>
          ))}
        </div>
        <div className="mcq-footer-row">
          <button className="mcq-nav-btn" disabled>Previous</button>
          <div className="mcq-dots">
            {questions.map((_, idx) => (
              <span key={idx} className={"mcq-dot" + (idx === current ? " active" : "")}></span>
            ))}
          </div>
          <button className="mcq-nav-btn next">Next</button>
        </div>
      </div>
    </div>
  );
};

export default MCQPractice;
