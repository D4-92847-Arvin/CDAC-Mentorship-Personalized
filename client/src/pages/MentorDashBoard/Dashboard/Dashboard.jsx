import React from 'react'
import Sidebar from '../../../components/MentorComponents/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom'
import DashboardHome from '../DashboardHome/DashboardHome';
import Availability from '../Availability/Availability';
import MyStudents from '../MyStudents/MyStudents';
import Feedback from '../Feedback/Feedback';
import Earnings from '../Earnings/Earnings';
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className='dashboard-layout'>
      <Sidebar/>
      <main className='main-content'>
        <Routes>
          <Route index element={<DashboardHome/>}/>
          <Route path='availability' element={<Availability/>}/>
          <Route path='students' element={<MyStudents/>}/>
          <Route path='feedback' element={<Feedback/>}/>
          <Route path='earnings' element={<Earnings/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default Dashboard
