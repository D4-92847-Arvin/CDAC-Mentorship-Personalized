package com.mentorship.mentordashboard.service;

import java.time.LocalDate;
import java.util.List;

import com.mentorship.mentordashboard.dto.SessionCreateDTO;
import com.mentorship.mentordashboard.dto.SessionDTO;

public interface SessionService {
    
    // Get all sessions for a mentor
    List<SessionDTO> getAllSessions(Long mentorId);
    
    // Get session by ID
    SessionDTO getSessionById(Long sessionId);
    
    // Get today's sessions
    List<SessionDTO> getTodaysSessions(Long mentorId);
    
    // Get upcoming sessions
    List<SessionDTO> getUpcomingSessions(Long mentorId);
    
    // Get sessions for a specific date
    List<SessionDTO> getSessionsForDate(Long mentorId, LocalDate date);
    
    // Get sessions between dates
    List<SessionDTO> getSessionsBetweenDates(Long mentorId, LocalDate startDate, LocalDate endDate);
    
    // Create a new session
    SessionDTO createSession(Long mentorId, SessionCreateDTO sessionDTO);
    
    // Update session
    SessionDTO updateSession(Long sessionId, SessionDTO sessionDTO);
    
    // Cancel session
    void cancelSession(Long sessionId);
    
    // Complete session
    void completeSession(Long sessionId, String notes);
    
    // Reschedule session
    SessionDTO rescheduleSession(Long sessionId, LocalDate newDate, String newTime);
}
