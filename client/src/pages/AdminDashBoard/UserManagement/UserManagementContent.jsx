import React from "react";
import "./UserManagement.css";

const UserManagementContent = () => {
  const users = [
    {
      id: 1,
      name: "Alice Cooper",
      email: "alice@example.com",
      role: "Mentor",
      status: "Active",
      joined: "Jan 15, 2024",
    },
    {
      id: 2,
      name: "Bob Martin",
      email: "bob@example.com",
      role: "Student",
      status: "Active",
      joined: "Feb 20, 2024",
    },
    {
      id: 3,
      name: "Carol White",
      email: "carol@example.com",
      role: "Mentor",
      status: "Active",
      joined: "Mar 10, 2024",
    },
    {
      id: 4,
      name: "David Lee",
      email: "david@example.com",
      role: "Student",
      status: "Inactive",
      joined: "Apr 5, 2024",
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <h2 className="page-title mb-1">User Management</h2>
        <p className="page-subtitle">Manage all users on the platform</p>
      </div>

      {/* Summary cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="summary-card h-100">
            <h6 className="text-muted mb-2 small">Total Users</h6>
            <h3 className="summary-value">630</h3>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="summary-card h-100">
            <h6 className="text-muted mb-2 small">Active Users</h6>
            <h3 className="summary-value">594</h3>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="summary-card h-100">
            <h6 className="text-muted mb-2 small">New This Month</h6>
            <h3 className="summary-value">47</h3>
          </div>
        </div>
      </div>

      {/* Users table */}
      <div className="card-box">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-header-title mb-0">All Users</h5>
          <button className="btn btn-primary">Add User</button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="fw-semibold">{user.name}</td>
                  <td className="text-muted">{user.email}</td>
                  <td>
                    <span
                      className={
                        "role-badge " +
                        (user.role === "Mentor"
                          ? "role-mentor"
                          : "role-student")
                      }
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        "status-badge " +
                        (user.status === "Active"
                          ? "status-active"
                          : "status-inactive")
                      }
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="text-muted">{user.joined}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementContent;
