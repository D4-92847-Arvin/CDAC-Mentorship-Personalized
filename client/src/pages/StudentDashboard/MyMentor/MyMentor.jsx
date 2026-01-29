import React, { useState, useEffect } from "react";
import "./MyMentor.css";
import {
  getStudentSessions,
  getStudentFeedbacks,
  getVerifiedMentors,
  getMentorDetails,
} from "../../../service/studentservice";
import { getStudentId } from "../../../service/authService";

const MyMentor = () => {
  const [mentors, setMentors] = useState([]); // Changed to store ALL mentors
  const [selectedMentorId, setSelectedMentorId] = useState(null); // Track selected mentor for display
  const [verifiedMentors, setVerifiedMentors] = useState([]);
  const [sessionStats, setSessionStats] = useState({
    total: 0,
    completed: 0,
    avgRating: 0,
    nextSession: null,
  });
  const [loading, setLoading] = useState(true);
  const [mentorsLoading, setMentorsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [domainFilter, setDomainFilter] = useState(null);
  const [showBrowseMentors, setShowBrowseMentors] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showMentorModal, setShowMentorModal] = useState(false); // Modal state
  const [selectedVerifiedMentor, setSelectedVerifiedMentor] = useState(null); // Selected mentor for modal
  const [schedulingError, setSchedulingError] = useState(null);
  const [schedulingLoading, setSchedulingLoading] = useState(false);

  useEffect(() => {
    fetchMentorData();
  }, [refreshKey]);

  // Refresh mentor data when tab becomes active or after session is scheduled
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Re-fetch data when user returns to the tab
        setRefreshKey(prev => prev + 1);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const fetchVerifiedMentors = async (domain = null) => {
    try {
      setMentorsLoading(true);
      const response = await getVerifiedMentors(domain);
      setVerifiedMentors(response.data || []);
      setShowBrowseMentors(true);
    } catch (err) {
      console.error("Error fetching verified mentors:", err);
      setError("Failed to load verified mentors");
    } finally {
      setMentorsLoading(false);
    }
  };

  const fetchMentorData = async () => {
    try {
      setLoading(true);
      const studentId = getStudentId();

      if (!studentId) {
        setError("Student ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      // Fetch sessions to get mentor info
      const sessionsResponse = await getStudentSessions(studentId);
      const sessions = sessionsResponse.data || [];

      if (sessions.length === 0) {
        setMentors([]);
        setError("No mentor sessions found. Book a session to get started!");
        setLoading(false);
        return;
      }

      // Get UNIQUE mentors from ONLY ACTIVE (non-completed) sessions
      const activeSessions = sessions.filter(s => s.status !== "COMPLETED" && s.status !== "CANCELLED");
      const uniqueMentorIds = [...new Set(activeSessions.map(s => s.mentorId))];
      const mentorsList = [];

      // Fetch details for each unique mentor with active sessions
      for (const mentorId of uniqueMentorIds) {
        try {
          const mentorDetailsResponse = await getMentorDetails(mentorId);
          const mentorDetailsData = mentorDetailsResponse.data;
          
          // Find first session with this mentor to get additional info
          const mentorSession = sessions.find(s => s.mentorId === mentorId);

          const mentorInfo = {
            mentorId: mentorId,
            name: mentorDetailsData?.name || mentorSession?.mentorName,
            specialization: mentorDetailsData?.specialization || "N/A",
            experience: mentorDetailsData?.experience || "N/A",
            ratePerSession: mentorDetailsData?.ratePerSession || mentorSession?.sessionFee,
            rating: mentorDetailsData?.rating || 4.9,
            about: mentorDetailsData?.about || mentorDetailsData?.specialization || "Experienced mentor",
            expertise: mentorDetailsData?.expertise 
              ? [mentorDetailsData.expertise] 
              : [mentorDetailsData?.specialization || "General"],
            email: mentorDetailsData?.email || "N/A",
          };
          
          mentorsList.push(mentorInfo);
          console.log(`Loaded mentor ${mentorId}:`, mentorInfo);
        } catch (detailsErr) {
          console.warn(`Could not fetch detailed mentor info for ID ${mentorId}:`, detailsErr);
          // Fallback: Create mentor info from session data
          const mentorSession = sessions.find(s => s.mentorId === mentorId);
          if (mentorSession) {
            mentorsList.push({
              mentorId: mentorId,
              name: mentorSession.mentorName,
              specialization: "N/A",
              experience: "N/A",
              ratePerSession: mentorSession.sessionFee,
              rating: 4.9,
              about: "Experienced mentor",
              expertise: ["General"],
              email: "N/A",
            });
          }
        }
      }

      setMentors(mentorsList);
      
      // Set first mentor as selected by default
      if (mentorsList.length > 0) {
        setSelectedMentorId(mentorsList[0].mentorId);
      }

      // Calculate session statistics
      const completedSessions = sessions.filter(
        (s) => s.status === "COMPLETED"
      );
      const upcomingSessions = sessions.filter(
        (s) => s.status === "SCHEDULED"
      );

      // Fetch feedbacks to calculate average rating
      const feedbacksResponse = await getStudentFeedbacks(studentId);
      const feedbacks = feedbacksResponse.data || [];

      const avgRating =
        feedbacks.length > 0
          ? (
              feedbacks.reduce((sum, f) => sum + f.rating, 0) /
              feedbacks.length
            ).toFixed(1)
          : 4.9;

      setSessionStats({
        total: sessions.length,
        completed: completedSessions.length,
        avgRating: parseFloat(avgRating),
        nextSession:
          upcomingSessions.length > 0
            ? `${new Date(upcomingSessions[0].sessionDate).toLocaleDateString()}, ${upcomingSessions[0].startTime}`
            : "No upcoming sessions",
      });

      setError(null);
    } catch (err) {
      console.error("Error fetching mentor data:", err);
      setError(
        err.response?.data?.message || "Failed to load mentor information"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="my-mentor-page">
        <h2>Your Mentors</h2>
        <p>Loading mentor information...</p>
      </div>
    );
  }

  if (!mentors || mentors.length === 0) {
    return (
      <div className="my-mentor-page">
        <h2>Your Mentors</h2>
        <div className="error-message">
          {error || "No mentor assigned yet. Browse verified mentors to get started!"}
        </div>
        <button 
          className="browse-mentors-btn"
          onClick={() => fetchVerifiedMentors()}
        >
          🔍 Browse Verified Mentors
        </button>
      </div>
    );
  }

  // Get currently selected mentor for display
  const selectedMentor = mentors.find(m => m.mentorId === selectedMentorId) || mentors[0];

  return (
    <div className="my-mentor-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Your Mentors ({mentors.length})</h2>
        <button 
          className="refresh-btn"
          onClick={() => setRefreshKey(prev => prev + 1)}
          title="Refresh mentor information"
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🔄 Refresh
        </button>
      </div>
      <p>Connect with your mentors and schedule sessions</p>

      {/* Scrollable Mentor Cards */}
      {mentors.length > 1 && (
        <div className="scrollable-mentors-section" style={{
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid #ddd'
        }}>
          <h3 style={{ marginBottom: '15px' }}>Your Assigned Mentors</h3>
          <div className="scrollable-mentors-container" style={{
            display: 'flex',
            gap: '15px',
            overflowX: 'auto',
            overflowY: 'hidden',
            paddingBottom: '10px',
            scrollBehavior: 'smooth'
          }}>
            {mentors.map((m) => (
              <div
                key={m.mentorId}
                className={`scrollable-mentor-card ${selectedMentorId === m.mentorId ? 'selected' : ''}`}
                onClick={() => setSelectedMentorId(m.mentorId)}
                style={{
                  minWidth: '280px',
                  padding: '15px',
                  border: selectedMentorId === m.mentorId ? '3px solid #007bff' : '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: selectedMentorId === m.mentorId ? '#f0f8ff' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedMentorId === m.mentorId ? '0 4px 12px rgba(0,123,255,0.2)' : '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${m.name}&background=random&size=60`}
                    alt={m.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '4px'
                    }}>
                      {m.name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#666',
                      marginBottom: '4px'
                    }}>
                      {m.specialization}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#007bff',
                      fontWeight: '600'
                    }}>
                      ₹{m.ratePerSession}/session
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#666',
                  lineHeight: '1.4'
                }}>
                  <span style={{ color: '#ffc107' }}>⭐</span> {m.rating} | {m.experience}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mentor-main-content">
        <div className="mentor-profile-card">
          <div className="mentor-profile-header">Mentor Profile</div>
          <div className="mentor-profile-body">
            <img
              className="mentor-avatar"
              src={`https://ui-avatars.com/api/?name=${selectedMentor.name}&background=random`}
              alt={selectedMentor.name}
            />
            <div>
              <div className="mentor-name">{selectedMentor.name}</div>
              <div className="mentor-field">{selectedMentor.specialization}</div>
              <div className="mentor-rating">
                <span className="star">⭐</span> {selectedMentor.rating}{" "}
                <span className="sessions-completed">
                  {sessionStats.completed} sessions completed
                </span>
              </div>
              <div className="mentor-about">
                <b>About</b>
                <br />
                {selectedMentor.experience} experience in teaching{" "}
                {selectedMentor.specialization}. {selectedMentor.about}
              </div>
              <div className="mentor-expertise">
                <b>Expertise</b>
                <br />
                {selectedMentor.expertise.map((skill, idx) => (
                  <span key={idx} className="expertise-badge">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mentor-contact">
                <b>Contact</b>
                <br />
                {selectedMentor.email}
              </div>
            </div>
          </div>
        </div>
        <div className="mentor-session-stats">
          <div className="stats-title">Session Statistics</div>
          <div className="stats-box">
            <div className="stats-label">Total Sessions</div>
            <div className="stats-value">{sessionStats.total}</div>
          </div>
          <div className="stats-box">
            <div className="stats-label">Completed Sessions</div>
            <div className="stats-value">{sessionStats.completed}</div>
          </div>
          <div className="stats-box">
            <div className="stats-label">Average Rating</div>
            <div className="stats-value">
              <span className="star">⭐</span> {sessionStats.avgRating}
            </div>
          </div>
          <div className="stats-box">
            <div className="stats-label">Next Session</div>
            <div className="stats-value">{sessionStats.nextSession}</div>
          </div>
        </div>
      </div>

      {/* Browse Other Verified Mentors */}
      <div className="browse-mentors-section">
        <div className="browse-mentors-header">
          <h3>Browse Verified Mentors</h3>
          <button 
            className="browse-toggle-btn"
            onClick={() => {
              if (!showBrowseMentors) {
                fetchVerifiedMentors();
              } else {
                setShowBrowseMentors(false);
              }
            }}
          >
            {showBrowseMentors ? "Hide" : "Show"} Mentors
          </button>
        </div>

        {showBrowseMentors && (
          <div className="verified-mentors-container">
            {mentorsLoading && <p className="loading-text">Loading verified mentors...</p>}
            
            {!mentorsLoading && verifiedMentors.length === 0 && (
              <p className="no-mentors">No verified mentors available</p>
            )}

            {!mentorsLoading && verifiedMentors.length > 0 && (
              <div className="mentors-grid">
                {verifiedMentors.map((m) => (
                  <div key={m.mentorId} className="mentor-card">
                    <img
                      className="mentor-card-avatar"
                      src={`https://ui-avatars.com/api/?name=${m.name}&background=random`}
                      alt={m.name}
                    />
                    <div className="mentor-card-info">
                      <div className="mentor-card-name">
                        {m.name}
                      </div>
                      <div className="mentor-card-domain">{m.specialization}</div>
                      <div className="mentor-card-rating">
                        <span className="star">⭐</span> 
                        {m.rating ? parseFloat(m.rating).toFixed(1) : "N/A"}
                      </div>
                      <div className="mentor-card-fee">
                        ₹{m.ratePerSession || 500}/session
                      </div>
                    </div>
                    <button 
                      className="mentor-card-action-btn"
                      onClick={() => {
                        setSelectedVerifiedMentor(m);
                        setShowMentorModal(true);
                        setSchedulingError(null);
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mentor Profile Modal */}
      {showMentorModal && selectedVerifiedMentor && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}>
            {/* Close button */}
            <button
              onClick={() => {
                setShowMentorModal(false);
                setSelectedVerifiedMentor(null);
                setSchedulingError(null);
              }}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: '#f0f0f0',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#333',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                hover: { backgroundColor: '#e0e0e0' }
              }}
              title="Close"
            >
              ✕
            </button>

            {/* Modal Content */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img
                src={`https://ui-avatars.com/api/?name=${selectedVerifiedMentor.name}&background=random&size=100`}
                alt={selectedVerifiedMentor.name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  marginBottom: '15px'
                }}
              />
              <h2 style={{ marginBottom: '5px' }}>{selectedVerifiedMentor.name}</h2>
              <div style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>
                {selectedVerifiedMentor.specialization}
              </div>
              <div style={{ fontSize: '14px', color: '#007bff', fontWeight: '600', marginBottom: '15px' }}>
                <span style={{ color: '#ffc107' }}>⭐</span> {selectedVerifiedMentor.rating ? parseFloat(selectedVerifiedMentor.rating).toFixed(1) : "N/A"} | ₹{selectedVerifiedMentor.ratePerSession || 500}/session
              </div>
            </div>

            {/* Experience and About */}
            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd' }}>
              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ marginBottom: '8px' }}>Experience</h4>
                <p style={{ color: '#555', lineHeight: '1.5' }}>
                  {selectedVerifiedMentor.experience || 'N/A'}
                </p>
              </div>
              <div>
                <h4 style={{ marginBottom: '8px' }}>About</h4>
                <p style={{ color: '#555', lineHeight: '1.5' }}>
                  {selectedVerifiedMentor.about || selectedVerifiedMentor.specialization}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd' }}>
              <h4 style={{ marginBottom: '10px' }}>Contact</h4>
              <p style={{ color: '#555' }}>📧 {selectedVerifiedMentor.email || 'N/A'}</p>
            </div>

            {/* Error message */}
            {schedulingError && (
              <div style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '12px',
                borderRadius: '4px',
                marginBottom: '15px',
                border: '1px solid #f5c6cb'
              }}>
                {schedulingError}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMentor;
