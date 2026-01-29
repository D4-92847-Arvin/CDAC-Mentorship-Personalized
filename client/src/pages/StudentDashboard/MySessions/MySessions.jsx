import React, { useState, useEffect } from "react";
import "./MySessions.css";
import { getStudentSessions, cancelSession } from "../../../service/studentservice";
import { getStudentId } from "../../../service/authService";
import ScheduleSessionModal from "./ScheduleSessionModal";

const MySessions = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const studentId = getStudentId();
      
      if (!studentId) {
        setError("Student ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await getStudentSessions(studentId);
      const sessions = response.data || [];

      // Separate upcoming and past sessions
      const now = new Date();
      const upcoming = [];
      const past = [];

      sessions.forEach((session) => {
        const sessionDate = new Date(session.sessionDate);
        
        const sessionObj = {
          sessionId: session.sessionId,
          title: session.topic,
          mentor: session.mentorName,
          date: sessionDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          time: session.startTime,
          duration: calculateDuration(session.startTime, session.endTime),
          status: session.status,
          fee: session.sessionFee,
          description: session.description,
        };

        // Categorize sessions
        if (session.status === "CANCELLED") {
          // Cancelled sessions go to past sessions
          past.push(sessionObj);
        } else if (sessionDate > now && session.status !== "COMPLETED") {
          // Future sessions that are not completed go to upcoming
          upcoming.push(sessionObj);
        } else {
          // Completed or past sessions go to past
          past.push(sessionObj);
        }
      });

      // Sort by date
      upcoming.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      past.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setUpcomingSessions(upcoming);
      setPastSessions(past);
      setError(null);
    } catch (err) {
      console.error("Error fetching sessions:", err);
      setError(err.response?.data?.message || "Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  const calculateDuration = (startTime, endTime) => {
    try {
      const [startHour, startMin] = startTime.split(":").map(Number);
      const [endHour, endMin] = endTime.split(":").map(Number);

      const start = startHour * 60 + startMin;
      const end = endHour * 60 + endMin;

      const duration = end - start;
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;

      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    } catch (error) {
      return "N/A";
    }
  };

  const handleCancelSession = async (sessionId) => {
    if (!window.confirm("Are you sure you want to cancel this session?")) {
      return;
    }
    
    try {
      setLoading(true);
      await cancelSession(sessionId);
      alert("Session cancelled successfully");
      // Refresh sessions
      fetchSessions();
    } catch (err) {
      console.error("Error cancelling session:", err);
      setError(err.response?.data?.message || "Failed to cancel session");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="my-sessions-page">
        <h2>My Sessions</h2>
        <p>Loading your sessions...</p>
      </div>
    );
  }

  return (
    <div className="my-sessions-page">
      <h2>My Sessions</h2>
      <p>View and manage your mentorship sessions</p>

      <ScheduleSessionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSessionScheduled={fetchSessions}
      />
      
      {error && (
        <div className="error-message">
          <span>⚠️ {error}</span>
          <button onClick={fetchSessions}>Retry</button>
        </div>
      )}

      <div className="sessions-main-content">
        <div className="sessions-card">
          <div className="sessions-header">
            <span>
              Upcoming Sessions ({upcomingSessions.length})
            </span>
            <button 
              className="schedule-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <span role="img" aria-label="calendar">📅</span> Schedule New
            </button>
          </div>
          {upcomingSessions.length === 0 ? (
            <div className="no-sessions">
              <p>No upcoming sessions scheduled</p>
              <p className="text-muted">Book a session with a mentor to get started</p>
            </div>
          ) : (
            upcomingSessions.map((session, idx) => (
              <div className="session-row" key={session.sessionId || idx}>
                <div className="session-title">{session.title}</div>
                <div className="session-info">
                  <span>{session.mentor}</span>
                  <span>•</span>
                  <span>{session.date}</span>
                  <span>•</span>
                  <span>{session.time}</span>
                  <span>•</span>
                  <span>Duration: {session.duration}</span>
                </div>
                <div className="session-status">
                  <span
                    className={
                      session.status === "SCHEDULED"
                        ? "status-confirmed"
                        : session.status === "COMPLETED"
                        ? "status-completed"
                        : "status-pending"
                    }
                  >
                    {session.status}
                  </span>
                  <button
                    className="session-cancel-btn"
                    onClick={() => handleCancelSession(session.sessionId)}
                    title="Cancel Session"
                  >
                    <span role="img" aria-label="cancel">❌</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="sessions-card">
          <div className="sessions-header">
            Past Sessions ({pastSessions.length})
          </div>
          {pastSessions.length === 0 ? (
            <div className="no-sessions">
              <p>No past sessions</p>
            </div>
          ) : (
            pastSessions.map((session, idx) => (
              <div className="session-row" key={session.sessionId || idx}>
                <div className="session-title">{session.title}</div>
                <div className="session-info">
                  <span>{session.mentor}</span>
                  <span>•</span>
                  <span>{session.date}</span>
                  <span>•</span>
                  <span>{session.time}</span>
                </div>
                <div className="session-status">
                  <span
                    className={
                      session.status === "COMPLETED"
                        ? "status-completed"
                        : session.status === "CANCELLED"
                        ? "status-cancelled"
                        : "status-pending"
                    }
                  >
                    {session.status}
                  </span>
                  <span className="session-fee">₹{session.fee}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MySessions;
