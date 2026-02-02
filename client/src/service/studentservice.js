import api from "../API/api";

const API_URL = "http://localhost:8080/api/student";

// Get student dashboard stats
export const getStudentDashboard = (studentId) => {
  return api.get(`/api/student/${studentId}/dashboard`);
};

// Get all sessions for a student
export const getStudentSessions = (studentId) => {
  return api.get(`/api/student/${studentId}/sessions`);
};

// Get student details
export const getStudentDetails = (studentId) => {
  return api.get(`/api/student/${studentId}`);
};

// Get student details by user ID
export const getStudentDetailsByUserId = (userId) => {
  return api.get(`/api/student/user/${userId}`);
};

// Book a session
export const bookSession = (studentId, sessionData) => {
  return api.post(`/api/student/${studentId}/sessions`, sessionData);
};

// Cancel a session
export const cancelSession = (sessionId) => {
  return api.patch(`/api/student/sessions/${sessionId}/cancel`);
};

// Delete a session
export const deleteSession = (sessionId) => {
  return api.delete(`/api/student/sessions/${sessionId}`);
};

// Get active subscription for a student
export const getActiveSubscription = (studentId) => {
  return api.get(`/api/student/${studentId}/subscription/active`);
};

// Get verified mentors
export const getVerifiedMentors = (domain = null) => {
  const params = domain ? { domain } : {};
  return api.get(`/api/student/mentors`, { params });
};

// Get mentor details by ID
export const getMentorDetails = (mentorId) => {
  return api.get(`/api/student/mentor/${mentorId}`);
};

// Submit feedback
export const submitFeedback = (studentId, feedbackData) => {
  return api.post(`/api/student/${studentId}/feedback`, feedbackData);
};

// Get student feedbacks
export const getStudentFeedbacks = (studentId) => {
  return api.get(`/api/student/${studentId}/feedback`);
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
  return api.put(`/api/student/${studentId}`, profileData);
};
