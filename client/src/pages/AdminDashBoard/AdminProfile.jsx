import React from "react";
import ProfileCard from "../../Component/Profile/ProfileCard";
import AccountSettings from "../../Component/Profile/AccountSettings";

const AdminProfile = () => {
  const user = {
    role: "admin",
    fullName: "Admin User",
    email: "admin@mentorship.com",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    location: "Head Office, India",
    specialization: "Platform Administration",
    bio: "Managing mentors, students, and platform operations.",
  };

  return (
    <>
      <ProfileCard user={user} />
      <AccountSettings />
    </>
  );
};

export default AdminProfile;
