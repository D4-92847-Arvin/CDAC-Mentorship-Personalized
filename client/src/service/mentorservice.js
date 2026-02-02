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
