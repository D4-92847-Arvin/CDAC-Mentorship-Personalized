package com.mentorship.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
	
	private final JavaMailSender mailSender;

    public void sendPasswordResetEmail(String toEmail, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        
        // This is the link the user will click in their email
        String resetUrl = "http://localhost:3000/reset-password?token=" + token;

        message.setFrom("arvinbhat.ab@gmail.com"); 
        message.setTo(toEmail);
        message.setSubject("Password Reset Request - Mentorship Platform");
        message.setText("Hello,\n\n" +
                "You requested to reset your password. Click the link below to proceed:\n" +
                resetUrl + "\n\n" +
                "This link will expire in 15 minutes.\n" +
                "If you did not request this, please ignore this email.");

        mailSender.send(message);
    }

}
