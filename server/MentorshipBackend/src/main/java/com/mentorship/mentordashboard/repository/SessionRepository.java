package com.mentorship.mentordashboard.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mentorship.mentordashboard.entity.Session;
import com.mentorship.mentordashboard.entity.SessionStatus;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    // Find sessions by mentor ID
    List<Session> findByMentor_MentorId(Long mentorId);

    // Find sessions by mentor ID and date
    List<Session> findByMentor_MentorIdAndSessionDate(Long mentorId, LocalDate sessionDate);

    // Find sessions by mentor ID and status
    List<Session> findByMentor_MentorIdAndStatus(Long mentorId, SessionStatus status);

    // Find today's sessions for a mentor
    @Query("SELECT s FROM Session s WHERE s.mentor.mentorId = :mentorId AND s.sessionDate = :today ORDER BY s.startTime")
    List<Session> findTodaysSessions(@Param("mentorId") Long mentorId, @Param("today") LocalDate today);

    // Find upcoming sessions for a mentor
    @Query("SELECT s FROM Session s WHERE s.mentor.mentorId = :mentorId AND s.sessionDate >= :today AND s.status = 'SCHEDULED' ORDER BY s.sessionDate, s.startTime")
    List<Session> findUpcomingSessions(@Param("mentorId") Long mentorId, @Param("today") LocalDate today);

    // Count total sessions for a mentor
    @Query("SELECT COUNT(s) FROM Session s WHERE s.mentor.mentorId = :mentorId")
    Integer countTotalSessionsByMentor(@Param("mentorId") Long mentorId);

    // Count completed sessions for a mentor
    @Query("SELECT COUNT(s) FROM Session s WHERE s.mentor.mentorId = :mentorId AND s.status = 'COMPLETED'")
    Integer countCompletedSessionsByMentor(@Param("mentorId") Long mentorId);

    // Count upcoming sessions for a mentor
    @Query("SELECT COUNT(s) FROM Session s WHERE s.mentor.mentorId = :mentorId AND s.sessionDate >= :today AND s.status = 'SCHEDULED'")
    Integer countUpcomingSessionsByMentor(@Param("mentorId") Long mentorId, @Param("today") LocalDate today);

    // Find sessions between dates for a mentor
    @Query("SELECT s FROM Session s WHERE s.mentor.mentorId = :mentorId AND s.sessionDate BETWEEN :startDate AND :endDate ORDER BY s.sessionDate, s.startTime")
    List<Session> findSessionsBetweenDates(@Param("mentorId") Long mentorId, 
                                            @Param("startDate") LocalDate startDate, 
                                            @Param("endDate") LocalDate endDate);

    // Find sessions by student and mentor
    List<Session> findByMentor_MentorIdAndStudent_StudentId(Long mentorId, Long studentId);

    // Count sessions by mentor and student
    @Query("SELECT COUNT(s) FROM Session s WHERE s.mentor.mentorId = :mentorId AND s.student.studentId = :studentId")
    Integer countSessionsByMentorAndStudent(@Param("mentorId") Long mentorId, @Param("studentId") Long studentId);
}
