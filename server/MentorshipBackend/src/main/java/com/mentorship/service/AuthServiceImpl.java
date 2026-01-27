package com.mentorship.service;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentorship.custom_exceptions.ApiException;
import com.mentorship.dtos.ApiResponse;
import com.mentorship.dtos.MentorSignupRequest;
import com.mentorship.dtos.StudentSignupRequest;
import com.mentorship.entities.Mentor;
import com.mentorship.entities.Student;
import com.mentorship.entities.User;
import com.mentorship.entities.UserRole;
import com.mentorship.entities.VerificationStatus;
import com.mentorship.repository.MentorRepository;
import com.mentorship.repository.StudentRepository;
import com.mentorship.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AuthServiceImpl implements AuthService{

	private final UserRepository userRepository;
	private final StudentRepository studentRepository;
	private final MentorRepository mentorRepository;
	private final PasswordEncoder passwordEncoder;
	private final ModelMapper modelMapper;
	
	@Override
    public ApiResponse registerStudent(StudentSignupRequest dto) {
		
		if(userRepository.existsByEmail(dto.getEmail())) {
			throw new ApiException("Email already registered");
		}
		
		User user = modelMapper.map(dto, User.class);
		
		user.setUserRole(UserRole.STUDENT);
		user.setPassword(passwordEncoder.encode(dto.getPassword()));
		
		Student student = new Student();
		student.setUserDetails(user);
		student.setTargetDomain(dto.getTargetDomain());
		student.setQualification(dto.getQualification());
		
		studentRepository.save(student);
		return new ApiResponse("Student registered successfully", null);
		
		
	}

	@Override
	public ApiResponse registerMentor(MentorSignupRequest dto) {
		if (userRepository.existsByEmail(dto.getEmail())) {
            throw new ApiException("Email already registered");
        }

        // 2. Map DTO → User entity
        User user = modelMapper.map(dto, User.class);

        // 3. Set role & encrypt password
        user.setUserRole(UserRole.MENTOR);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        // 4. Create Mentor entity
        Mentor mentor = new Mentor();
        mentor.setUserDetails(user);
        mentor.setSpecialization(dto.getSpecialization());
        mentor.setExperience(dto.getExperience());
        mentor.setRatePerSession(dto.getRatePerSession());
        mentor.setDiscountPercent(dto.getDiscountPercent());

        // Admin-controlled fields
        mentor.setVerificationStatus(VerificationStatus.PENDING);
        mentor.setVerifiedBy(null);

        // 5. Save mentor (cascade saves User)
        mentorRepository.save(mentor);

        return new ApiResponse("Mentor registered successfully. Awaiting verification.", null);
	}
}
