package com.mentorship.mentordashboard.service;

import java.util.List;

import com.mentorship.mentordashboard.dto.StudentCardDTO;

public interface MyStudentsService {
    
    // Get all students for a mentor
    List<StudentCardDTO> getAllStudents(Long mentorId);
    
    // Get active students
    List<StudentCardDTO> getActiveStudents(Long mentorId);
    
    // Get student details
    StudentCardDTO getStudentDetails(Long mentorId, Long studentId);
    
    // Update student progress
    void updateStudentProgress(Long mentorId, Long studentId, Integer progress);
    
    // Add student to mentor
    StudentCardDTO addStudent(Long mentorId, Long studentId);
    
    // Remove student from mentor
    void removeStudent(Long mentorId, Long studentId);
    
    // Count active students
    Integer countActiveStudents(Long mentorId);
}
