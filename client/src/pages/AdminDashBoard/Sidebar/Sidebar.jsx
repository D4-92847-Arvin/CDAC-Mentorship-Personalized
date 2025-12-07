import React from "react";
import "./Sidebar.css";

const Sidebar = ({ activeTab, onTabChange }) => {
  return (
    <div className="sidebar d-flex flex-column h-100">
      {/* Logo */}
      <div className="sidebar-logo d-flex align-items-center">
        <div className="logo-box">
          <div className="logo-circle">
            <div className="logo-dot" />
          </div>
        </div>
        <div>
          <div className="logo-title">Mentorship</div>
          <div className="logo-subtitle text-muted">Personalized</div>
        </div>
      </div>

      <nav className="sidebar-menu d-flex flex-row flex-lg-column gap-2 overflow-auto pb-2 pb-lg-0">
        <SidebarItem
          label="Overview"
          icon="🏠"
          isActive={activeTab === "overview"}
          onClick={() => onTabChange("overview")}
        />
        <SidebarItem
          label="Verification"
          icon="🛡️"
          isActive={activeTab === "verification"}
          onClick={() => onTabChange("verification")}
        />
        <SidebarItem
          label="User Management"
          icon="👥"
          isActive={activeTab === "users"}
          onClick={() => onTabChange("users")}
        />
        <SidebarItem
          label="Revenue"
          icon="💲"
          isActive={activeTab === "revenue"}
          onClick={() => onTabChange("revenue")}
        />
      </nav>

      <div className="sidebar-logout mt-auto d-none d-lg-block">
        <button className="btn btn-light w-100">Logout</button>
      </div>
    </div>
  );
};

const SidebarItem = ({ label, icon, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={
      "sidebar-item btn text-start d-inline-flex align-items-center" +
      (isActive ? " active" : "")
    }
  >
    <span className="me-2">{icon}</span>
    <span>{label}</span>
  </button>
);

export default Sidebar;
