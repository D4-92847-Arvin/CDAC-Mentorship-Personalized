package com.mentorship.service;

import org.springframework.web.multipart.MultipartFile;

import com.mentorship.dto.MentorDTO;
import com.mentorship.dtos.UpdateMentorProfileRequest;

public interface MentorService {
	void uploadResume(Long userId, MultipartFile resume);
	
	void partialUpdateProfile(Long userId,UpdateMentorProfileRequest dto);

	MentorDTO getMentorById(Long userId);
}
