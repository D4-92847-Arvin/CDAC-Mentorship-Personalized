import { Route, Routes } from "react-router-dom";
import "./App.css";

import Overview from "./pages/AdminDashBoard/Overview/Overview";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin-dashboard" element={<Overview />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
