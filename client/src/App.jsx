import { Route, Routes } from "react-router-dom";
import "./App.css";
import Overview from "./pages/AdminDashBoard/Overview";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/MentorDashBoard/Dashboard/Dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin-dashboard" element={<Overview />} />
        <Route path="/mentor/*" element={<Dashboard />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
