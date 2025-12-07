import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Overview from "./pages/AdminDashBoard/Overview/Overview";
import MentorRegister from "./pages/Register/MentorRegister";
import StudentRegister from "./pages/Register/StudentRegister";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Routes>
         <Route path="/" element={<Login />} />

        <Route path="/admin-dashboard" element={<Overview />} />
        <Route path="/register/mentor" element={<MentorRegister />} />
        <Route path="/register/student" element={<StudentRegister />} />

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
