import "./Feedback.css";

const feedback = [
  { 
    name: "Alex Thompson", 
    initials: "AT",
    date: "Oct 5, 2025", 
    msg: "Excellent mentor! Very patient and knowledgeable. Helped me understand complex algorithms.", 
    rating: 5 
  },
  { 
    name: "Emma Wilson", 
    initials: "EW",
    date: "Oct 3, 2025", 
    msg: "Great career guidance session. Really appreciate the practical advice.", 
    rating: 5 
  },
  { 
    name: "Michael Chen", 
    initials: "MC",
    date: "Oct 1, 2025", 
    msg: "Very helpful code review. Learned a lot about best practices.", 
    rating: 4 
  }
];

function Feedback() {
  return (
    <div className="feedback-page">
      <div className="page-header">
        <h1 className="page-title">Student Feedback</h1>
        <p className="page-subtitle">Review feedback from your students</p>
      </div>

      <div className="feedback-list">
        {feedback.map((f, i) => (
          <div className="feedback-card" key={i}>
            <div className="feedback-header">
              <div className="feedback-user">
                <div className="feedback-avatar">{f.initials}</div>
                <div className="feedback-user-info">
                  <div className="feedback-name">{f.name}</div>
                  <div className="feedback-date">{f.date}</div>
                </div>
              </div>
              <div className="feedback-rating">
                {[...Array(5)].map((_, idx) => (
                  <span key={idx} className={`star ${idx < f.rating ? 'filled' : ''}`}>★</span>
                ))}
              </div>
            </div>
            <p className="feedback-msg">{f.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feedback;
