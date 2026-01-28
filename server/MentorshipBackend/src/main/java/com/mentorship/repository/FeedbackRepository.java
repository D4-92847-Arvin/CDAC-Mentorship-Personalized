package com.mentorship.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.mentorship.entities.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findByMentorMentorId(Long mentorId);

    // Calculate average rating
    @Query("SELECT AVG(f.rating) FROM Feedback f WHERE f.mentor.mentorId = :mentorId")
    Double getAverageRating(Long mentorId);
}
