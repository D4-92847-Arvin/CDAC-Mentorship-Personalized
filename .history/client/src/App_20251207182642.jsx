import { Route, Routes } from "react-router-dom";
import "./App.css";

import Overview from "./pages/AdminDashBoard/Overview/Overview";
import { ToastContainer } from "react-toastify";

import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";

import MyMentor from "./pages/StudentDashboard/MyMentor";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin-dashboard" element={<Overview />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/my-mentor" element={<MyMentor />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
