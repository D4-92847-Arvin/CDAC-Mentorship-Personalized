package com.mentorship.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentorship.entities.Mentor;

public interface MentorRepository extends JpaRepository<Mentor, Long> {

}
