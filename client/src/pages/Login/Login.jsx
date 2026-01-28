import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { loginUser, decodeToken } from "../../API/authService";
import { useAuth } from "../../API/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectRole, setRedirectRole] = useState(null);

  const navigate = useNavigate();
  const { setAuthToken, isAuthenticated } = useAuth();

  // Redirect after auth context is updated
  useEffect(() => {
    if (isAuthenticated && redirectRole) {
      console.log("Redirecting based on role:", redirectRole);
      if (redirectRole === "ROLE_STUDENT") {
        navigate("/student-dashboard");
      } else if (redirectRole === "ROLE_MENTOR") {
        navigate("/mentor/dashboard");
      } else if (redirectRole === "ROLE_ADMIN") {
        navigate("/admin-dashboard");
      }
      setRedirectRole(null);
    }
  }, [isAuthenticated, redirectRole, navigate]);

  const onLogin = async () => {
    try {
      setError("");
      setLoading(true);

      // Validate inputs
      if (!email || !password) {
        setError("Please enter both email and password");
        setLoading(false);
        return;
      }

      // Call auth service to login
      const response = await loginUser(email, password);
      const token = response.jwt;

      // Store JWT token
      localStorage.setItem("token", token);

      // Decode JWT payload to get user roles
      const payload = decodeToken(token);
      const authorities = payload?.authorities || [];

      console.log("===== JWT DECODED =====");
      console.log("Full Payload:", JSON.stringify(payload, null, 2));
      console.log("Payload keys:", Object.keys(payload));
      console.log("payload.sub:", payload?.sub);
      console.log("payload.email:", payload?.email);
      console.log("payload.name:", payload?.name);
      console.log("payload.userId:", payload?.userId);
      console.log("payload.authorities:", authorities);
      console.log("========================");

      // Find the role (first ROLE_* authority, ignore other authorities like FACTOR_PASSWORD)
      const userRole = authorities.find(auth => auth.startsWith("ROLE_"));
      
      if (userRole) {
        // Update auth context with user data
        setAuthToken(token);
        // Set redirect role to trigger useEffect
        setRedirectRole(userRole);
      } else {
        setError("Your account does not have a valid role assigned");
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.error("Login error:", err);

      // Display specific error messages from backend
      if (err.message) {
        setError(err.message);
      } else if (err.errors) {
        // Handle validation errors from backend
        const errorMessages = Object.values(err.errors).join(", ");
        setError(errorMessages);
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onLogin();
    }
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

        {/* Email */}
        <div className="mb-3">
          <label className="login-label">Email</label>
          <input
            type="email"
            className="form-control login-input"
            placeholder="test1@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="login-label">Password</label>
          <input
            type="password"
            className="form-control login-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
        </div>

        {/* Error */}
        {error && <p className="text-danger text-center">{error}</p>}

        {/* Login Button */}
        <button
          className="btn w-100 login-primary-btn mb-3"
          onClick={onLogin}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Footer */}
        <div className="login-footer text-center mt-4">
          <p>
            Don't have an account?
            <span className="login-link-primary">
              <a href="/register/student"> Sign up as Student</a>
            </span>{" "}
            or
          </p>
          <span className="login-link-mentor">
            <a href="/register/mentor"> Apply as Mentor</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
