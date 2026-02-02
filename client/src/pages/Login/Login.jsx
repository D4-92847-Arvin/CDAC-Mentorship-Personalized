import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import { toast } from "react-toastify";

const Login = () => {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const onLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/users/signin", {
        email,
        password,
      });

      if (response.data && response.data.jwt) {
        // Store JWT token
        localStorage.setItem("authToken", response.data.jwt);
        localStorage.setItem("userRole", role);
        localStorage.setItem("user", email);

        // Decode JWT to extract userId and mentorId
        try {
          const base64Url = response.data.jwt.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join(""),
          );
          const payload = JSON.parse(jsonPayload);
          console.log("JWT Payload:", payload);
          console.log("Authorities:", payload.authorities);

          if (payload.userId) {
            localStorage.setItem("userId", payload.userId);
            console.log("Stored userId:", payload.userId);
          }

          // For mentors, also store mentorId if available
          if (role === "mentor" && payload.mentorId) {
            localStorage.setItem("mentorId", payload.mentorId);
            console.log("Stored mentorId:", payload.mentorId);
          }

          // For students, also store studentId if available
          if (role === "student" && payload.studentId) {
            localStorage.setItem("studentId", payload.studentId);
            console.log("Stored studentId:", payload.studentId);
          }
        } catch (decodeError) {
          console.error("Error decoding JWT:", decodeError);
        }

        toast.success("Login successful!");

        // Navigate based on role
        if (role === "student") navigate("/student-dashboard");
        if (role === "mentor") navigate("/mentor/dashboard");
        if (role === "admin") navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.message || "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  const onDemoLogin = () => {
    // Demo login without authentication
    localStorage.setItem("userRole", role);
    localStorage.setItem("user", "demo-user");

    if (role === "student") navigate("/student-dashboard");
    if (role === "mentor") navigate("/mentor/dashboard");
    if (role === "admin") navigate("/admin-dashboard");
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow-lg">
        {/* Icon */}
        <div className="login-icon-wrapper">
          <div className="login-icon">🎓</div>
        </div>

        {/* Title */}
        <h1 className="login-title text-center">
          Welcome to Mentorship <br /> Personalized
        </h1>
        <p className="login-subtitle text-center">
          Sign in to continue your learning journey
        </p>

        {/* Role Buttons */}
        <div className="login-role-toggle d-flex mb-4 ">
          {["student", "mentor", "admin"].map((r) => (
            <button
              key={r}
              type="button"
              className={`login-role-pill btn flex-fill ${
                role === r ? "active" : ""
              }`}
              onClick={() => setRole(r)}
            >
              {capitalize(r)}
            </button>
          ))}
        </div>

        {/* Static Inputs */}
        <div className="mb-3">
          <label className="login-label">Email</label>
          <input
            type="email"
            className="form-control login-input"
            placeholder={`${role}@example.com`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="login-label">Password</label>
          <input
            type="password"
            className="form-control login-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <button
          className="btn w-100 login-primary-btn mb-3"
          onClick={onLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : `Sign In as ${capitalize(role)}`}
        </button>

        <button className="btn w-100 login-demo-btn" onClick={onDemoLogin}>
          Try Demo ({capitalize(role)})
        </button>

        {/* Footer */}
        <div className="login-footer text-center mt-4">
          <p>
            Don't have an account?
            <span className="login-link-primary">
              <a href="/register/student">Sign up as Student</a>
            </span>{" "}
            or
          </p>
          <span className="login-link-mentor">
            <a href="/register/mentor">Apply as Mentor</a>{" "}
          </span>

          <div className="mt-3">
            <span className="login-back-link">
              <a href="/">← Back to Home</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
