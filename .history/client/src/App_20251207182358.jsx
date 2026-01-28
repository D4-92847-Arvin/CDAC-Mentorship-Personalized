import { Route, Routes } from "react-router-dom";
import "./App.css";

import Overview from "./pages/AdminDashBoard/Overview/Overview";
import { ToastContainer } from "react-toastify";

import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin-dashboard" element={<Overview />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        {/* Future routes for other dashboards/pages */}
        {/* <Route path="/mentor-dashboard" element={<MentorDashboard />} /> */}
        {/* <Route path="/sessions" element={<SessionsPage />} /> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
