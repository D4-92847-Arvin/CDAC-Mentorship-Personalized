import React from 'react'
import Sidebar from '../../../Component/MentorComponents/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardHome from '../DashboardHome/DashboardHome';
import Availability from '../Availability/Availability';
import MyStudents from '../MyStudents/MyStudents';
import Feedback from '../Feedback/Feedback';
import Earnings from '../Earnings/Earnings';
import MCQPractice from '../MCQPractice/MCQPractice';
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className='dashboard-layout'>
      <Sidebar/>
      <main className='main-content'>
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path='dashboard' element={<DashboardHome/>}/>
          <Route path='availability' element={<Availability/>}/>
          <Route path='students' element={<MyStudents/>}/>
          <Route path='feedback' element={<Feedback/>}/>
          <Route path='earnings' element={<Earnings/>}/>
          <Route path='mcq-practice/:studentId' element={<MCQPractice/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default Dashboard
