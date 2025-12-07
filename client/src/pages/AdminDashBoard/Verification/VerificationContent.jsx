import React from "react";
import "./VerificationContent.css";

const VerificationContent = () => {
  const pendingVerifications = [
    {
      id: 1,
      name: "John Doe",
      type: "Mentor",
      submitted: "2 days ago",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      type: "Student",
      submitted: "1 day ago",
      status: "Pending",
    },
    {
      id: 3,
      name: "Mike Johnson",
      type: "Mentor",
      submitted: "3 hours ago",
      status: "Pending",
    },
    {
      id: 4,
      name: "Sarah Williams",
      type: "Student",
      submitted: "5 hours ago",
      status: "Pending",
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <h2 className="page-title mb-1">Verification</h2>
        <p className="page-subtitle">
          Review and approve pending verifications
        </p>
      </div>

      <div className="card-box">
        <h5 className="card-header-title mb-3">Pending Verifications</h5>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingVerifications.map((item) => (
                <tr key={item.id}>
                  <td className="fw-semibold">{item.name}</td>
                  <td>
                    <span
                      className={
                        "badge-type " +
                        (item.type === "Mentor"
                          ? "badge-type-mentor"
                          : "badge-type-student")
                      }
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="text-muted">{item.submitted}</td>
                  <td>
                    <span className="badge-pending">{item.status}</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-success me-2">
                      Approve
                    </button>
                    <button className="btn btn-sm btn-danger">Reject</button>
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

export default VerificationContent;
