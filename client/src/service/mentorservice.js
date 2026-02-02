import api from "../API/api";

export const getMyMentorProfile = () => {
  return api.get(`/mentors/me`);
};

export const updateMentorProfile = (profileData) => {
  return api.patch(`/mentors/profile`, profileData);
};

export const uploadResume = (resumeFile) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  return api.post(`/mentors/resume`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Chat and messaging functions
export const sendMessage = (mentorId, studentId, messageData) => {
  return api.post(
    `/api/mentors/${mentorId}/messages/${studentId}`,
    messageData,
  );
};

export const getConversation = (mentorId, studentId) => {
  return api.get(`/api/mentors/${mentorId}/conversation/${studentId}`);
};

export const markMessagesAsRead = (mentorId, studentId) => {
  return api.patch(`/api/mentors/${mentorId}/messages/${studentId}/read`);
};

export const getMentorConversations = (mentorId) => {
  return api.get(`/api/mentors/${mentorId}/conversations`);
};

// Student and earnings functions
export const getMyStudents = (mentorId) => {
  return api.get(`/api/mentors/${mentorId}/students`);
};

export const getMonthlyEarnings = (mentorId) => {
  return api.get(`/api/mentors/${mentorId}/earnings/monthly`);
};

export const getEarningsSummary = (mentorId) => {
  return api.get(`/api/mentors/${mentorId}/earnings/summary`);
};

export const getTransactionHistory = (mentorId) => {
  return api.get(`/api/mentors/${mentorId}/transactions`);
};

// Availability functions
export const getAvailabilityForDate = (mentorId, date) => {
  return api.get(`/api/mentors/${mentorId}/availability/${date}`);
};

export const toggleSlotAvailability = (mentorId, availabilityId) => {
  return api.patch(
    `/api/mentors/${mentorId}/availability/${availabilityId}/toggle`,
  );
};

export const blockDay = (mentorId, blockData) => {
  return api.post(`/api/mentors/${mentorId}/availability/block`, blockData);
};

// Dashboard functions
export const getDashboardStats = (mentorId) => {
  return api.get(`/api/mentors/${mentorId}/dashboard/stats`);
};

export const getTodaySessions = (mentorId) => {
  return api.get(`/api/mentors/${mentorId}/sessions/today`);
};

// Feedback functions
export const getFeedback = (mentorId) => {
  return api.get(`/api/mentors/${mentorId}/feedback`);
};

export const getAverageRating = (mentorId) => {
  return api.get(`/api/mentors/${mentorId}/feedback/average-rating`);
};
