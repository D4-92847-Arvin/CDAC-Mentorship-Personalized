package com.mentorship.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentorship.entities.Mentor;
import com.mentorship.entities.VerificationStatus;

public interface MentorRepository extends JpaRepository<Mentor, Long> {
	List<Mentor> findByVerificationStatus(VerificationStatus status);

    List<Mentor> findByVerificationStatusAndSpecializationContainingIgnoreCase(
            VerificationStatus status, String specialization);
    
    Optional<Mentor> findByUserDetails_UserId(Long userId);
}
