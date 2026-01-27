package com.mentorship.mentordashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorProfileDTO {
    private Long mentorId;
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNo;
    private String specialization;
    private String experience;
    private Double ratePerSession;
    private Double discountPercent;
    private String verificationStatus;
    private Double averageRating;
    private Integer totalStudents;
    private Integer totalSessions;
}
