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

// Delete a session (hard delete)
export const deleteSession = (sessionId) => {
  return axios.delete(`${API_URL}/sessions/${sessionId}`);
};

// Get verified mentors
// Get verified mentors
export const getVerifiedMentors = (studentId, domain = null) => {
  const params = { studentId };
  if (domain) params.domain = domain;
  return axios.get(`${API_URL}/mentors`, { params });
};

// Check Active Subscription Status
export const getActiveSubscription = (studentId) => {
  return axios.get(`${API_URL}/subscription?studentId=${studentId}`);
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

// =======================
// STUDY TIMER API
// =======================

export const startStudySession = (studentId, taskName) => {
  return axios.post(`${API_URL}/${studentId}/study/start`, null, {
    params: { taskName }
  });
};

export const stopStudySession = (sessionId) => {
  return axios.post(`${API_URL}/study/stop/${sessionId}`);
};

export const deleteStudySession = (sessionId) => {
  return axios.delete(`${API_URL}/study/${sessionId}`);
};

export const getStudyHistory = (studentId) => {
  return axios.get(`${API_URL}/${studentId}/study/history`);
};

// =======================
// CHAT API (Student Side)
// =======================

const CHAT_API_URL = "http://localhost:8080/api/messages";

// Send message from student to mentor
export const sendMessageToMentor = (studentId, mentorId, content) => {
  return axios.post(`${CHAT_API_URL}/send`, {
    mentorId: mentorId,
    studentId: studentId,
    content: content,
    senderType: 'STUDENT'
  });
};

// Get conversation between student and mentor using entity IDs
export const getConversationWithMentor = (studentId, mentorId) => {
  return axios.get(`${CHAT_API_URL}/mentor/${mentorId}/student/${studentId}`);
};

// Mark messages as read using entity IDs (student marks MENTOR messages as read)
export const markMessagesAsReadByStudent = (studentId, mentorId) => {
  return axios.put(`${CHAT_API_URL}/student/${studentId}/mentor/${mentorId}/mark-read`);
};

// Get all student's conversations (with all mentors) using student entity ID
export const getStudentConversations = (studentId) => {
  return axios.get(`${CHAT_API_URL}/student/${studentId}/conversations`);
};
