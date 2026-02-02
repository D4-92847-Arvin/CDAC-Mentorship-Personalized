import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import { toast } from "react-toastify";
import { useAuth } from "../../API/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectRole, setRedirectRole] = useState(null);

  const navigate = useNavigate();
  const { setAuthToken, isAuthenticated } = useAuth();

  // Redirect after auth context updates
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

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error("JWT Decode Error:", err);
      return null;
    }
  };

  const onLogin = async () => {
    try {
      setError("");
      if (!email || !password) {
        toast.error("Please enter both email and password");
        return;
      }

      setLoading(true);

      // API call
      const response = await api.post("/users/signin", {
        email,
        password,
      });

      if (response.data && response.data.jwt) {
        const token = response.data.jwt;

        // Store token
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", email);

        // Update Auth Context
        setAuthToken(token);

        // Decode JWT
        const payload = decodeJWT(token);
        console.log("JWT Payload:", payload);

        const authorities = payload?.authorities || [];
        const userRole = authorities.find((auth) => auth.startsWith("ROLE_"));

        // Store IDs
        if (payload?.userId) {
          localStorage.setItem("userId", payload.userId);
        }

        if (userRole === "ROLE_MENTOR" && payload?.mentorId) {
          localStorage.setItem("mentorId", payload.mentorId);
        }

        if (userRole === "ROLE_STUDENT" && payload?.studentId) {
          localStorage.setItem("studentId", payload.studentId);
        }

        if (!userRole) {
          toast.error("No valid role assigned to this account");
          localStorage.clear();
          return;
        }

        localStorage.setItem("userRole", userRole);

        toast.success("Login successful!");
        setRedirectRole(userRole);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(
        err?.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key
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
