import React, { useState, useEffect } from "react";
import "../../../Component/Modal.css"; // Using a standard modal CSS
import { bookSession } from "../../../service/studentservice";
import { getVerifiedMentors } from "../../../service/studentservice";
import { getStudentId } from "../../../service/authService";

const ScheduleSessionModal = ({ isOpen, onClose, onSessionScheduled }) => {
  const [mentors, setMentors] = useState([]);
  const [formData, setFormData] = useState({
    mentorId: "",
    sessionDate: "",
    startTime: "",
    endTime: "",
    topic: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mentorLoading, setMentorLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchMentors();
      resetForm();
    }
  }, [isOpen]);

  const fetchMentors = async () => {
    try {
      setMentorLoading(true);
      const response = await getVerifiedMentors();
      setMentors(response.data || []);
      setError("");
    } catch (err) {
      console.error("Error fetching mentors:", err);
      setError("Failed to load mentors. Please try again.");
    } finally {
      setMentorLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      mentorId: "",
      sessionDate: "",
      startTime: "",
      endTime: "",
      topic: "",
      description: "",
    });
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.mentorId) {
      setError("Please select a mentor");
      return false;
    }
    if (!formData.sessionDate) {
      setError("Please select a session date");
      return false;
    }
    if (!formData.startTime) {
      setError("Please select a start time");
      return false;
    }
    if (!formData.endTime) {
      setError("Please select an end time");
      return false;
    }
    if (!formData.topic) {
      setError("Please enter a topic");
      return false;
    }

    // Validate end time is after start time
    if (formData.startTime >= formData.endTime) {
      setError("End time must be after start time");
      return false;
    }

    // Validate date is not in the past
    const selectedDate = new Date(formData.sessionDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError("Session date cannot be in the past");
      return false;
    }

    return true;
  };

  const handleScheduleSession = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const studentId = getStudentId();
      if (!studentId) {
        setError("Student ID not found. Please log in again.");
        return;
      }

      const sessionData = {
        mentorId: parseInt(formData.mentorId),
        sessionDate: formData.sessionDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        topic: formData.topic,
        description: formData.description || "",
      };

      await bookSession(studentId, sessionData);

      // Show success message and close modal
      alert("Session scheduled successfully!");
      onSessionScheduled();
      onClose();
    } catch (err) {
      console.error("Error scheduling session:", err);
      setError(
        err.response?.data?.message ||
          "Failed to schedule session. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Schedule New Session</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleScheduleSession}>
            {error && (
              <div className="form-error-message">
                <span>⚠️ {error}</span>
              </div>
            )}

            <div className="form-group">
              <label>Select Mentor *</label>
              <select
                name="mentorId"
                value={formData.mentorId}
                onChange={handleInputChange}
                disabled={mentorLoading || loading}
              >
                <option value="">Choose a mentor...</option>
                {mentors.map((mentor) => (
                  <option key={mentor.mentorId} value={mentor.mentorId}>
                    {mentor.name} - {mentor.domain || "General"}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Session Date *</label>
              <input
                type="date"
                name="sessionDate"
                value={formData.sessionDate}
                onChange={handleInputChange}
                disabled={loading}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>End Time *</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Topic *</label>
              <input
                type="text"
                name="topic"
                placeholder="e.g., React Fundamentals"
                value={formData.topic}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Description (Optional)</label>
              <textarea
                name="description"
                placeholder="Add any additional details about your session..."
                value={formData.description}
                onChange={handleInputChange}
                disabled={loading}
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-schedule"
                disabled={loading || mentorLoading}
              >
                {loading ? "Scheduling..." : "Schedule Session"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSessionModal;
