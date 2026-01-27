package com.mentorship.mentordashboard.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mentorship.entities.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Find student by user ID
    Optional<Student> findByUserDetails_UserId(Long userId);

    // Check if student exists by user ID
    boolean existsByUserDetails_UserId(Long userId);
}
