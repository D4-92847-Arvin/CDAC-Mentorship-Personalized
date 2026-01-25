import React, { useState } from 'react'
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import "./Availability.css";

function Availability() {
  const [date, setDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState(['9:00 AM', '1:00 PM', '4:00 PM']);
  
  const slots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

  const toggleSlot = (slot) => {
    if (availableSlots.includes(slot)) {
      setAvailableSlots(availableSlots.filter(s => s !== slot));
    } else {
      setAvailableSlots([...availableSlots, slot]);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  return (
    <div className='availability-page'>
      <div className="page-header">
        <h1 className="page-title">Availability Management</h1>
        <p className="page-subtitle">Set your available time slots</p>
      </div>

      <div className="row">
        <div className="col-lg-5 mb-4">
          <div className="availability-card">
            <h5 className="section-title">Select Date</h5>
            <div className="calendar-wrapper">
              <Calendar value={date} onChange={setDate} />
            </div>
          </div>
        </div>

        <div className="col-lg-7 mb-4">
          <div className="availability-card">
            <h5 className="section-title">Time Slots for {formatDate(date)}</h5>
            <div className="time-slots-list">
              {slots.map((slot) => (
                <div className="time-slot-item" key={slot}>
                  <div className="time-slot-info">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span className="time-slot-time">{slot}</span>
                  </div>
                  <button 
                    className={`btn-slot ${availableSlots.includes(slot) ? 'available' : ''}`}
                    onClick={() => toggleSlot(slot)}
                  >
                    {availableSlots.includes(slot) ? 'Available' : 'Set Available'}
                  </button>
                </div>
              ))}
            </div>

            <div className="quick-actions-box">
              <h6 className="quick-actions-title">Quick Actions</h6>
              <div className="quick-actions-buttons">
                <button className="btn-action">Set Weekly Schedule</button>
                <button className="btn-action">Block Day</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Availability;
