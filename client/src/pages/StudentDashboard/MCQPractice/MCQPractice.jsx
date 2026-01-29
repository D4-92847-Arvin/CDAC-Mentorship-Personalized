import React, { useState, useEffect } from "react";
import "./MCQPractice.css";

// Comprehensive MCQ Bank (50 questions)
const MCQ_BANK = [
  // Data Structures
  {
    id: 1,
    topic: "Data Structures",
    question: "What is the time complexity of binary search in a sorted array?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: 1,
  },
  {
    id: 2,
    topic: "Data Structures",
    question: "What is the space complexity of a binary search tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 2,
  },
  {
    id: 3,
    topic: "Data Structures",
    question: "Which data structure uses LIFO (Last In First Out)?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    answer: 1,
  },
  {
    id: 4,
    topic: "Data Structures",
    question: "What is the time complexity of insertion in a hash table?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    answer: 2,
  },
  {
    id: 5,
    topic: "Data Structures",
    question: "Which of the following is NOT a linear data structure?",
    options: ["Array", "Queue", "Tree", "Stack"],
    answer: 2,
  },

  // Algorithms
  {
    id: 6,
    topic: "Algorithms",
    question: "What is the time complexity of quicksort in the best case?",
    options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
    answer: 1,
  },
  {
    id: 7,
    topic: "Algorithms",
    question: "Which sorting algorithm has the best average time complexity?",
    options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
    answer: 1,
  },
  {
    id: 8,
    topic: "Algorithms",
    question: "What is the time complexity of linear search?",
    options: ["O(log n)", "O(n log n)", "O(n)", "O(1)"],
    answer: 2,
  },
  {
    id: 9,
    topic: "Algorithms",
    question: "Which algorithm uses the 'divide and conquer' approach?",
    options: ["Linear Search", "Merge Sort", "Bubble Sort", "Sequential Search"],
    answer: 1,
  },
  {
    id: 10,
    topic: "Algorithms",
    question: "What is the space complexity of merge sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 2,
  },

  // Graph Theory
  {
    id: 11,
    topic: "Graph Theory",
    question: "Which algorithm is used to find the shortest path in a graph?",
    options: ["DFS", "BFS", "Dijkstra", "Both B and C"],
    answer: 3,
  },
  {
    id: 12,
    topic: "Graph Theory",
    question: "What is the time complexity of BFS?",
    options: ["O(V²)", "O(V + E)", "O(log V)", "O(V * E)"],
    answer: 1,
  },
  {
    id: 13,
    topic: "Graph Theory",
    question: "Which graph traversal method uses a stack?",
    options: ["BFS", "DFS", "Dijkstra", "Bellman-Ford"],
    answer: 1,
  },
  {
    id: 14,
    topic: "Graph Theory",
    question: "What is a bipartite graph?",
    options: ["A graph with only 2 nodes", "A graph that can be colored with 2 colors", "A directed graph", "A weighted graph"],
    answer: 1,
  },
  {
    id: 15,
    topic: "Graph Theory",
    question: "Which of the following is used for topological sorting?",
    options: ["BFS", "DFS", "Dijkstra", "Prim's Algorithm"],
    answer: 1,
  },

  // Dynamic Programming
  {
    id: 16,
    topic: "Dynamic Programming",
    question: "What is the time complexity of the classic fibonacci using DP?",
    options: ["O(2ⁿ)", "O(n²)", "O(n)", "O(log n)"],
    answer: 2,
  },
  {
    id: 17,
    topic: "Dynamic Programming",
    question: "What is the main principle behind dynamic programming?",
    options: ["Brute force", "Optimal substructure and memoization", "Greedy approach", "Backtracking"],
    answer: 1,
  },
  {
    id: 18,
    topic: "Dynamic Programming",
    question: "Which problem uses DP and can be solved by 0/1 knapsack?",
    options: ["Sorting", "Searching", "Resource allocation", "Traversal"],
    answer: 2,
  },
  {
    id: 19,
    topic: "Dynamic Programming",
    question: "What is the space complexity of tabulation in DP?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 2,
  },
  {
    id: 20,
    topic: "Dynamic Programming",
    question: "Which of the following is NOT a DP problem?",
    options: ["Longest Common Subsequence", "Edit Distance", "Linear Search", "Coin Change"],
    answer: 2,
  },

  // Database & SQL
  {
    id: 21,
    topic: "Database",
    question: "What is a primary key in a database?",
    options: ["A key that is optional", "A unique identifier for a record", "A key that references another table", "A key that can be null"],
    answer: 1,
  },
  {
    id: 22,
    topic: "Database",
    question: "What does ACID stand for in databases?",
    options: ["Atomicity, Consistency, Isolation, Durability", "All, Code, Input, Data", "Atomicity, Concurrency, Isolation, Duration", "None of the above"],
    answer: 0,
  },
  {
    id: 23,
    topic: "Database",
    question: "What is normalization in databases?",
    options: ["Adding duplicate data", "Organizing data to minimize redundancy", "Creating new tables", "Deleting data"],
    answer: 1,
  },
  {
    id: 24,
    topic: "Database",
    question: "Which of the following is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
    answer: 2,
  },
  {
    id: 25,
    topic: "Database",
    question: "What is an index in a database?",
    options: ["A list of all records", "A data structure to speed up query retrieval", "A backup of the table", "A copy of the table"],
    answer: 1,
  },

  // Object-Oriented Programming
  {
    id: 26,
    topic: "OOP",
    question: "What is encapsulation?",
    options: ["Combining methods and data into one unit", "Hiding internal implementation details", "Inheriting from parent classes", "Both A and B"],
    answer: 3,
  },
  {
    id: 27,
    topic: "OOP",
    question: "What is polymorphism?",
    options: ["One object can have many forms", "One method can have multiple implementations", "Using one interface for different types", "All of the above"],
    answer: 3,
  },
  {
    id: 28,
    topic: "OOP",
    question: "What is the purpose of an interface?",
    options: ["To provide implementation", "To define a contract", "To inherit code", "To create objects"],
    answer: 1,
  },
  {
    id: 29,
    topic: "OOP",
    question: "Which principle states that a class should have only one reason to change?",
    options: ["Open/Closed Principle", "Single Responsibility Principle", "Liskov Substitution", "Dependency Inversion"],
    answer: 1,
  },
  {
    id: 30,
    topic: "OOP",
    question: "What is inheritance?",
    options: ["Creating a copy of a class", "Deriving a new class from an existing class", "Storing data in variables", "Creating objects"],
    answer: 1,
  },

  // Web Development
  {
    id: 31,
    topic: "Web Development",
    question: "What is the difference between GET and POST?",
    options: ["GET is faster", "POST is more secure", "GET is idempotent, POST is not", "They are the same"],
    answer: 2,
  },
  {
    id: 32,
    topic: "Web Development",
    question: "What does REST stand for?",
    options: ["Representational State Transfer", "Remote Electronic Service Transfer", "Resource Exchange Specification Transfer", "None of the above"],
    answer: 0,
  },
  {
    id: 33,
    topic: "Web Development",
    question: "What is a JWT token used for?",
    options: ["Data storage", "Authentication and authorization", "CSS styling", "HTML structure"],
    answer: 1,
  },
  {
    id: 34,
    topic: "Web Development",
    question: "What is CORS?",
    options: ["A database tool", "A security feature for cross-origin requests", "A programming language", "A web server"],
    answer: 1,
  },
  {
    id: 35,
    topic: "Web Development",
    question: "Which HTTP status code indicates 'Not Found'?",
    options: ["200", "301", "404", "500"],
    answer: 2,
  },

  // Design Patterns
  {
    id: 36,
    topic: "Design Patterns",
    question: "What is the Singleton design pattern?",
    options: ["A pattern with one method", "A class with only one instance", "A pattern for single inheritance", "A pattern for single interfaces"],
    answer: 1,
  },
  {
    id: 37,
    topic: "Design Patterns",
    question: "What is the Factory design pattern?",
    options: ["A pattern for creating objects without specifying exact classes", "A pattern for mass production", "A pattern for inheritance", "A pattern for polymorphism"],
    answer: 0,
  },
  {
    id: 38,
    topic: "Design Patterns",
    question: "What is the Observer design pattern used for?",
    options: ["Watching code execution", "Notifying multiple objects about state changes", "Observing database queries", "Monitoring performance"],
    answer: 1,
  },
  {
    id: 39,
    topic: "Design Patterns",
    question: "What is the purpose of the Decorator pattern?",
    options: ["Adding new functionality to objects dynamically", "Decorating UI elements", "Creating new classes", "Managing inheritance"],
    answer: 0,
  },
  {
    id: 40,
    topic: "Design Patterns",
    question: "Which pattern uses the 'strategy' approach?",
    options: ["Factory", "Singleton", "Strategy", "Observer"],
    answer: 2,
  },

  // System Design
  {
    id: 41,
    topic: "System Design",
    question: "What is horizontal scaling?",
    options: ["Increasing power of existing servers", "Adding more servers", "Upgrading CPU", "Reducing servers"],
    answer: 1,
  },
  {
    id: 42,
    topic: "System Design",
    question: "What is a cache used for?",
    options: ["Storing large files", "Improving data retrieval speed", "Backup", "Security"],
    answer: 1,
  },
  {
    id: 43,
    topic: "System Design",
    question: "What is load balancing?",
    options: ["Balancing database records", "Distributing client requests across servers", "Balancing code", "Balancing memory"],
    answer: 1,
  },
  {
    id: 44,
    topic: "System Design",
    question: "What is eventual consistency?",
    options: ["Data is always consistent", "Data becomes consistent over time", "Consistency is not guaranteed", "Immediate consistency"],
    answer: 1,
  },
  {
    id: 45,
    topic: "System Design",
    question: "What is sharding in databases?",
    options: ["Splitting data into shards distributed across servers", "Sharing data", "Removing data", "Duplicating data"],
    answer: 0,
  },

  // Additional Mixed Topics
  {
    id: 46,
    topic: "Miscellaneous",
    question: "What is time complexity?",
    options: ["Time to execute code", "Number of operations as a function of input size", "Speed of processor", "Duration of program"],
    answer: 1,
  },
  {
    id: 47,
    topic: "Miscellaneous",
    question: "What is Big O notation?",
    options: ["A measure of time", "Notation to describe algorithm complexity", "Computer brand", "Programming language"],
    answer: 1,
  },
  {
    id: 48,
    topic: "Miscellaneous",
    question: "What is recursion?",
    options: ["A loop", "A function calling itself", "A data structure", "A sorting algorithm"],
    answer: 1,
  },
  {
    id: 49,
    topic: "Miscellaneous",
    question: "What is a pointer?",
    options: ["A variable storing memory address", "A direction indicator", "A cursor", "A reference"],
    answer: 0,
  },
  {
    id: 50,
    topic: "Miscellaneous",
    question: "What is garbage collection?",
    options: ["Deleting files", "Automatic memory deallocation", "Cleaning code", "Removing variables"],
    answer: 1,
  },
];

const MCQPractice = ({ onBackToDashboard }) => {
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize and shuffle MCQs
  const startTest = () => {
    const shuffled = MCQ_BANK.sort(() => Math.random() - 0.5).slice(0, 10);
    setCurrentQuestions(shuffled);
    setTestStarted(true);
    setAnswers({});
    setCurrent(0);
    setTimeLeft(600);
    setTestSubmitted(false);
  };

  // Timer effect
  useEffect(() => {
    if (!testStarted || testSubmitted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          submitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [testStarted, testSubmitted]);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle answer selection
  const handleSelectAnswer = (optionIdx) => {
    setAnswers({
      ...answers,
      [currentQuestions[current].id]: optionIdx,
    });
  };

  // Navigate questions
  const handleNext = () => {
    if (current < currentQuestions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  // Submit test
  const submitTest = () => {
    let correctCount = 0;
    currentQuestions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setTestSubmitted(true);
  };

  // Retake test
  const retakeTest = () => {
    startTest();
  };

  if (!testStarted) {
    return (
      <div className="mcq-practice-page">
        <div className="mcq-start-container">
          <h2>📝 MCQ Practice Test</h2>
          <div className="mcq-start-info">
            <div className="info-item">
              <span className="info-icon">❓</span>
              <div>
                <div className="info-label">Total Questions</div>
                <div className="info-value">10</div>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <div>
                <div className="info-label">Time Limit</div>
                <div className="info-value">10 Minutes</div>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">⭐</span>
              <div>
                <div className="info-label">Topics</div>
                <div className="info-value">DSA, Design Patterns & More</div>
              </div>
            </div>
          </div>
          <div className="mcq-instructions">
            <h3>Instructions:</h3>
            <ul>
              <li>You will have 10 questions randomly selected from the MCQ bank</li>
              <li>Total time available: 10 minutes</li>
              <li>Cannot pause the timer once started</li>
              <li>You can navigate between questions</li>
              <li>Submit your answers before time expires</li>
              <li>Results will be shown immediately after submission</li>
            </ul>
          </div>
          <div className="mcq-button-row">
            <button className="mcq-start-btn" onClick={startTest}>
              🚀 Start Test
            </button>
            <button className="back-link" onClick={onBackToDashboard}>
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (testSubmitted) {
    return (
      <div className="mcq-practice-page">
        <div className="mcq-results-container">
          <div className="results-header">
            <h2>Test Results</h2>
            <button className="back-link" onClick={onBackToDashboard}>
              ← Back to Dashboard
            </button>
          </div>

          <div className="results-score">
            <div className="score-circle">
              <div className="score-value">{score}/10</div>
              <div className="score-label">Score</div>
            </div>
            <div className="score-percentage">
              {((score / 10) * 100).toFixed(0)}%
            </div>
            <div className="score-feedback">
              {score >= 8
                ? "🎉 Excellent! Keep it up!"
                : score >= 6
                ? "👍 Good job! Review weak areas."
                : score >= 4
                ? "📚 Fair performance. Practice more!"
                : "💪 Keep learning and improve!"}
            </div>
          </div>

          <div className="results-details">
            <h3>Review Your Answers</h3>
            {currentQuestions.map((q, idx) => {
              const isCorrect = answers[q.id] === q.answer;
              const selectedOption = answers[q.id];
              return (
                <div key={q.id} className="review-item">
                  <div className="review-question">
                    <span className="review-number">Q{idx + 1}.</span>
                    <span className={isCorrect ? "correct-q" : "wrong-q"}>
                      {q.question}
                    </span>
                  </div>
                  <div className="review-options">
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`review-option ${
                          optIdx === q.answer ? "correct-answer" : ""
                        } ${
                          optIdx === selectedOption && !isCorrect
                            ? "wrong-answer"
                            : ""
                        }`}
                      >
                        <span className="option-letter">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="option-text">{opt}</span>
                        {optIdx === q.answer && <span className="correct-badge">✓ Correct</span>}
                        {optIdx === selectedOption && !isCorrect && (
                          <span className="wrong-badge">✗ Your Answer</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="results-actions">
            <button className="retake-btn" onClick={retakeTest}>
              🔄 Retake Test
            </button>
            <button className="back-btn" onClick={onBackToDashboard}>
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mcq-practice-page">
      <div className="mcq-header-row">
        <button className="back-link" onClick={onBackToDashboard}>
          ← Back to Dashboard
        </button>
        <div className={`timer ${timeLeft < 120 ? "timer-critical" : ""}`}>
          ⏱️ {formatTime(timeLeft)}
        </div>
      </div>

      <div className="mcq-card">
        <div className="mcq-title-row">
          <span className="mcq-title">Question {current + 1} of {currentQuestions.length}</span>
          <span className="mcq-topic">{currentQuestions[current]?.topic}</span>
        </div>

        <div className="mcq-progress-bar">
          <div
            className="mcq-progress"
            style={{
              width: `${((current + 1) / currentQuestions.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="mcq-question">
          {currentQuestions[current]?.question}
        </div>

        <div className="mcq-options">
          {currentQuestions[current]?.options.map((opt, idx) => (
            <button
              key={idx}
              className={
                "mcq-option" +
                (answers[currentQuestions[current].id] === idx
                  ? " selected"
                  : "")
              }
              onClick={() => handleSelectAnswer(idx)}
            >
              <span className="mcq-option-label">
                {String.fromCharCode(65 + idx)}
              </span>
              {opt}
            </button>
          ))}
        </div>

        <div className="mcq-footer-row">
          <button
            className="mcq-nav-btn"
            onClick={handlePrevious}
            disabled={current === 0}
          >
            ← Previous
          </button>
          <div className="mcq-dots">
            {currentQuestions.map((_, idx) => (
              <span
                key={idx}
                className={
                  "mcq-dot" +
                  (idx === current ? " active" : "") +
                  (answers[currentQuestions[idx].id] !== undefined
                    ? " answered"
                    : "")
                }
                onClick={() => setCurrent(idx)}
              ></span>
            ))}
          </div>
          {current === currentQuestions.length - 1 ? (
            <button className="mcq-nav-btn submit-btn" onClick={submitTest}>
              Submit Test ✓
            </button>
          ) : (
            <button className="mcq-nav-btn next" onClick={handleNext}>
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MCQPractice;
