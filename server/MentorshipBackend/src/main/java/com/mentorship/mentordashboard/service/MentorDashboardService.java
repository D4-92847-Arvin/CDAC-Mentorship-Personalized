package com.mentorship.mentordashboard.service;

import java.time.LocalDate;
import java.util.List;

import com.mentorship.mentordashboard.dto.DashboardStatsDTO;
import com.mentorship.mentordashboard.dto.MentorProfileDTO;
import com.mentorship.mentordashboard.dto.SessionDTO;
import com.mentorship.mentordashboard.dto.StudentCardDTO;

public interface MentorDashboardService {
    
    // Get dashboard statistics
    DashboardStatsDTO getDashboardStats(Long mentorId);
    
    // Get mentor profile
    MentorProfileDTO getMentorProfile(Long mentorId);
    
    // Get today's sessions
    List<SessionDTO> getTodaysSessions(Long mentorId);
    
    // Get assigned students summary
    List<StudentCardDTO> getAssignedStudentsSummary(Long mentorId);
}
