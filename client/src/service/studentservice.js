import axios from "axios";

const API_URL = "http://localhost:8080/api/student";

// Get student dashboard stats
export const getStudentDashboard = (studentId) => {
  return axios.get(`${API_URL}/${studentId}/dashboard`);
};

// Get all sessions for a student
export const getStudentSessions = (studentId) => {
  return axios.get(`${API_URL}/${studentId}/sessions`);
};

// Get student details
export const getStudentDetails = (studentId) => {
  return axios.get(`${API_URL}/${studentId}`);
};

// Book a session
export const bookSession = (studentId, sessionData) => {
  return axios.post(`${API_URL}/${studentId}/sessions`, sessionData);
};

// Cancel a session
export const cancelSession = (sessionId) => {
  return axios.patch(`${API_URL}/sessions/${sessionId}/cancel`);
};

// Get verified mentors
export const getVerifiedMentors = (domain = null) => {
  const params = domain ? { domain } : {};
  return axios.get(`${API_URL}/mentors`, { params });
};

// Get mentor details by ID
export const getMentorDetails = (mentorId) => {
  return axios.get(`${API_URL}/mentor/${mentorId}`);
};

// Submit feedback
export const submitFeedback = (studentId, feedbackData) => {
  return axios.post(`${API_URL}/${studentId}/feedback`, feedbackData);
};

// Get student feedbacks
export const getStudentFeedbacks = (studentId) => {
  return axios.get(`${API_URL}/${studentId}/feedback`);
};

// Get first assigned mentor from sessions
export const getAssignedMentor = (studentId) => {
  return getStudentSessions(studentId).then((response) => {
    const sessions = response.data || [];
    if (sessions.length > 0) {
      // Get the first mentor from sessions
      return {
        mentorId: sessions[0].mentorId,
        name: sessions[0].mentorName,
      };
    }
    return null;
  });
};

// Update student profile
export const updateStudentProfile = (studentId, profileData) => {
  return axios.put(`${API_URL}/${studentId}`, profileData);
};
