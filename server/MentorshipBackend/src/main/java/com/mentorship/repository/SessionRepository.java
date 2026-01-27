package com.mentorship.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mentorship.entities.Session;

public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByStudentStudentId(Long studentId);
    
   // Total sessions
    @Query("SELECT COUNT(s) FROM Session s WHERE s.student.studentId = :studentId")
    Long countTotalSessions(@Param("studentId") Long studentId);

    // Upcoming sessions
    @Query("SELECT COUNT(s) FROM Session s WHERE s.student.studentId = :studentId AND s.status = 'SCHEDULED'")
    Long countUpcomingSessions(@Param("studentId") Long studentId);

    // Completed sessions
    @Query("SELECT COUNT(s) FROM Session s WHERE s.student.studentId = :studentId AND s.status = 'COMPLETED'")
    Long countCompletedSessions(@Param("studentId") Long studentId);

    // Total money spent
    @Query("SELECT COALESCE(SUM(s.sessionFee),0) FROM Session s WHERE s.student.studentId = :studentId AND s.status = 'COMPLETED'")
    Double sumTotalSpent(@Param("studentId") Long studentId);
    
}
