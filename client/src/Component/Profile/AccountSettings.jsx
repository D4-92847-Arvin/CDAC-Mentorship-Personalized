import React, { useState } from "react";
import "./Profile.css";
import ChangePasswordModal from "./ChangePasswordModal";

const AccountSettings = () => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <>
      <div className="profile-card">
        <h4>Account Settings</h4>

        <div className="settings-item">
          <div>
            <strong>Password</strong>
            <p className="muted-text">Last changed 3 months ago</p>
          </div>
          <button 
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setIsChangePasswordOpen(true)}
          >
            Change Password
          </button>
        </div>

        <div className="settings-item">
          <div>
            <strong>Notifications</strong>
            <p className="muted-text">Manage your email preferences</p>
          </div>
          <button className="btn btn-outline-secondary btn-sm">
            Configure
          </button>
        </div>

        <div className="settings-item danger">
          <div>
            <strong>Danger Zone</strong>
            <p className="muted-text">Delete account and all data</p>
          </div>
          <button className="btn btn-danger btn-sm">
            Delete Account
          </button>
        </div>
      </div>
      <ChangePasswordModal 
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </>
  );
};

export default AccountSettings;
