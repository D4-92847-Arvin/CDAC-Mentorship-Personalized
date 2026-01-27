package com.mentorship.mentordashboard.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mentorship.entities.Mentor;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Long> {

    // Find mentor by user ID
    Optional<Mentor> findByUserDetails_UserId(Long userId);

    // Find mentor by email
    @Query("SELECT m FROM Mentor m WHERE m.userDetails.email = :email")
    Optional<Mentor> findByEmail(@Param("email") String email);

    // Check if mentor exists by user ID
    boolean existsByUserDetails_UserId(Long userId);
}
