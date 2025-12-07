import "./DashboardHome.css";
import { useState } from "react";
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import StatCard from '../../../components/MentorComponents/StatCard/StatCard';
import SessionItem from '../../../components/MentorComponents/SessionItem/SessionItem';
import StudentCard from '../../../components/MentorComponents/StudentCard/StudentCard';
import EarningsChart from '../../../components/MentorComponents/EarningsChart/EarningsChart';


function DashboardHome() {
  const [date, setDate] = useState(new Date());
  
  const sessions = [
    { time: "2:00 PM", student: "Alex Thompson", topic: "Algorithm Design" },
    { time: "3:30 PM", student: "Emma Wilson", topic: "Career Guidance" },
    { time: "5:00 PM", student: "Michael Chen", topic: "Code Review" }
  ];

  const students = [
    { name: "Alex Thompson", sessions: 12, progress: 85, next: "Oct 8, 2:00 PM" },
    { name: "Emma Wilson", sessions: 8, progress: 72, next: "Oct 9, 3:30 PM" },
    { name: "Michael Chen", sessions: 15, progress: 91, next: "Oct 10, 1:00 PM" }
  ];

  const UsersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );

  const CalendarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );

  const DollarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="6" x2="12" y2="18"/>
      <path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 0 4h-2a2 2 0 0 0 0 4h2a2 2 0 0 0 2-2"/>
    </svg>
  );

  const StarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );

  return (
    <div className="dashboard-home">
      <div className="page-header">
        <h1 className="page-title">Mentor Dashboard</h1>
        <p className="page-subtitle">Manage your students and sessions</p>
      </div>

      <div className="row">
        <StatCard 
          title="Active Students" 
          value="18" 
          icon={<UsersIcon />}
          iconBg="bg-teal"
        />
        <StatCard 
          title="Total Sessions" 
          value="142" 
          icon={<CalendarIcon />}
          iconBg="bg-teal"
        />
        <StatCard 
          title="This Month Earnings" 
          value="$4,200" 
          icon={<DollarIcon />}
          iconBg="bg-green"
        />
        <StatCard 
          title="Average Rating" 
          value="4.9" 
          icon={<StarIcon />}
          iconBg="bg-orange"
        />
      </div>

      <div className="row mt-4">
        <div className="col-lg-5 mb-4">
          <div className="section-card">
            <h5 className="section-title">Availability Calendar</h5>
            <div className="calendar-wrapper">
              <Calendar value={date} onChange={setDate} />
            </div>
          </div>

          <div className="section-card mt-4">
            <h5 className="section-title">Today's Sessions</h5>
            {sessions.map(s => (
              <SessionItem key={s.time} {...s} />
            ))}
          </div>
        </div>

        <div className="col-lg-7 mb-4">
          <div className="section-card">
            <h5 className="section-title">Earnings Overview</h5>
            <EarningsChart />
          </div>

          <div className="section-card earnings-summary-row mt-4">
            <div className="earnings-mini-card">
              <span className="earnings-mini-label">Total Earned</span>
              <span className="earnings-mini-value">$19,800</span>
            </div>
            <div className="earnings-mini-card">
              <span className="earnings-mini-label">This Month</span>
              <span className="earnings-mini-value">$4,200</span>
            </div>
            <div className="earnings-mini-card">
              <span className="earnings-mini-label">Avg/Session</span>
              <span className="earnings-mini-value">$140</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section-card">
        <h5 className="section-title mb-4">Assigned Students</h5>
        <div className="row">
          {students.map(s => (
            <StudentCard key={s.name} data={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
