package com.mentorship.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mentorship.entities.Mentor;
import com.mentorship.entities.VerificationStatus;

public interface MentorRepository extends JpaRepository<Mentor, Long> {
    
    @Query("SELECT m FROM Mentor m WHERE m.userDetails.userId = :userId")
    Optional<Mentor> findByUserId(@Param("userId") Long userId);
    
    List<Mentor> findByVerificationStatus(VerificationStatus status);
    
    List<Mentor> findByVerificationStatusAndSpecializationContainingIgnoreCase(
        VerificationStatus status, String specialization);
}