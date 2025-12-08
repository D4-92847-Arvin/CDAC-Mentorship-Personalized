import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Overview from "./pages/AdminDashBoard/Overview/Overview";
import MentorRegister from "./pages/Register/MentorRegister";
import StudentRegister from "./pages/Register/StudentRegister";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/MentorDashBoard/Dashboard/Dashboard";
import StudentDashboard from "./pages/StudentDashboard/Main/StudentDashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />

        <Route path="/admin-dashboard" element={<Overview />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/register/mentor" element={<MentorRegister />} />
        <Route path="/register/student" element={<StudentRegister />} />        
        <Route path="/mentor/*" element={<Dashboard />} />

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
