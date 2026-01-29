package com.mentorship.dto;


import lombok.Data;

@Data
public class MentorDTO {

    private Long mentorId;
    private String name;
    private String specialization;
    private double ratePerSession;
    private String email;
    private String experience;
    private String about;
    private String expertise;
}
