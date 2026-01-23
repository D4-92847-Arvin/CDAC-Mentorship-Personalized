import React, { useState } from "react";
import "./UserManagement.css";

const UserManagementContent = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to save the mentor here
    console.log("New Mentor:", formData);
    setShowModal(false);
    setFormData({ name: "", email: "", password: "" });
  };

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
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add Mentor
          </button>
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

      {/* Add Mentor Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">Add New Mentor</h5>
              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    className="form-control"
                    value="Mentor"
                    disabled
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Mentor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementContent;
