package com.mentorship.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentorship.entities.Mentor;
import com.mentorship.entities.VerificationStatus;

public interface MentorRepository extends JpaRepository<Mentor, Long> {
	 List<Mentor> findByVerificationStatus(VerificationStatus status);

	    // Get verified mentors by specialization (case-insensitive, partial match)
	    List<Mentor> findByVerificationStatusAndSpecializationContainingIgnoreCase(
	            VerificationStatus status,String specialization);
}
