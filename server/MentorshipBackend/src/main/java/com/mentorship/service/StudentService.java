package com.mentorship.service;


import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mentorship.dto.FeedbackRequestDTO;
import com.mentorship.dto.FeedbackResponseDTO;
import com.mentorship.dto.MentorDTO;

import com.mentorship.dto.StudentDTO;
import com.mentorship.dto.StudentDashboardDTO;
import com.mentorship.dto.StudentSessionDTO;
import com.mentorship.dto.StudentSessionResponseDTO;
import com.mentorship.repository.FeedbackRepository;
import com.mentorship.repository.MentorRepository;
import com.mentorship.repository.SessionRepository;
import com.mentorship.repository.StudentRepository;
import com.mentorship.repository.UserRepository;

import jakarta.transaction.Transactional;
import com.mentorship.entities.*;

@Service
@Transactional
public class StudentService {

	@Autowired
	private StudentRepository studentRepository; 
	
	@Autowired 
	MentorRepository mentorRepository;
	
	@Autowired 
	private UserRepository userRepository;
	
	
	@Autowired
	private SessionRepository sessionRepository;
	
	@Autowired
	private FeedbackRepository feedbackRepository;
	
	public StudentDTO getStudentById(Long id) {
		Student student = studentRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Student not found"));
		return mapToDTO(student);	
	}
	

	public List<StudentDTO> getAllStudents() {
	return studentRepository.findAll()
	.stream()
	.map(this::mapToDTO)
	.collect(Collectors.toList());
	}
	
	
	public StudentDTO createStudent(StudentDTO dto) {


		Student student = new Student();
		student.setTargetDomain(dto.getTargetDomain());
		student.setQualification(dto.getQualification());


		// Fetch User from DB
		User user = userRepository.findById(dto.getUserId())
		.orElseThrow(() -> new RuntimeException("User not found"));


		student.setUserDetails(user);


		studentRepository.save(student);
		return mapToDTO(student);
		}
	
	
	public StudentDTO updateStudent(Long id, StudentDTO dto) {
		Student student = studentRepository.findById(id)
		.orElseThrow(() -> new RuntimeException("Student not found"));

		student.getUserDetails().setEmail(dto.getEmail());
		student.getUserDetails().setFirstName(dto.getFirstName());
		student.getUserDetails().setLastName(dto.getLastName());
		student.setTargetDomain(dto.getTargetDomain());
		student.setQualification(dto.getQualification());
		studentRepository.save(student);

		return mapToDTO(student);
		}
	

	public boolean deleteStudent(Long id) {

		System.out.println("Exists = " + studentRepository.existsById(id));
		
	    if (!studentRepository.existsById(id)) {
	        return false;   // Student not found
	    }

	    studentRepository.deleteById(id);
	    return true;
	}
	

	private StudentDTO mapToDTO(Student student) {
	StudentDTO dto = new StudentDTO();
	dto.setStudentId(student.getStudentId());
	if (student.getUserDetails() != null) {
	dto.setUserId(student.getUserDetails().getUserId());
	dto.setFirstName(student.getUserDetails().getFirstName());
	dto.setLastName(student.getUserDetails().getLastName());
	dto.setEmail(student.getUserDetails().getEmail());
	}
	dto.setTargetDomain(student.getTargetDomain());
	dto.setQualification(student.getQualification());
	return dto;
	}


	public List<MentorDTO> getVerifiedMentors(String domain) {

	    List<Mentor> mentors;

	    if (domain == null || domain.isEmpty()) {
	        mentors = mentorRepository.findByVerificationStatus(VerificationStatus.VERIFIED);
	    } else {
	        mentors = mentorRepository.findByVerificationStatusAndSpecializationContainingIgnoreCase(
	                VerificationStatus.VERIFIED, domain);
	    }

	    return mentors.stream().map(m -> {
	        MentorDTO dto = new MentorDTO();
	        dto.setMentorId(m.getMentorId());
	        dto.setName(m.getUserDetails().getFirstName() + " " + m.getUserDetails().getLastName());
	        dto.setSpecialization(m.getSpecialization());
	        dto.setRatePerSession(m.getRatePerSession());
	        dto.setEmail(m.getUserDetails().getEmail());
	        dto.setExperience(m.getExperience());
	        dto.setAbout(m.getSpecialization()); // Using specialization as about for now
	        dto.setExpertise(m.getSpecialization()); // Will be populated by expertise field
	        return dto;
	    }).toList();
	}

	// Get Mentor Details by ID
	public MentorDTO getMentorDetails(Long mentorId) {
	    Mentor mentor = mentorRepository.findById(mentorId)
	            .orElseThrow(() -> new RuntimeException("Mentor not found"));
	    
	    MentorDTO dto = new MentorDTO();
	    dto.setMentorId(mentor.getMentorId());
	    dto.setName(mentor.getUserDetails().getFirstName() + " " + mentor.getUserDetails().getLastName());
	    dto.setSpecialization(mentor.getSpecialization());
	    dto.setRatePerSession(mentor.getRatePerSession());
	    dto.setEmail(mentor.getUserDetails().getEmail());
	    dto.setExperience(mentor.getExperience());
	    dto.setAbout(mentor.getSpecialization());
	    dto.setExpertise(mentor.getSpecialization());
	    
	    return dto;
	}
	
	// Book Session
	public StudentSessionDTO bookSession(Long studentId, StudentSessionDTO dto) {

	    Student student = studentRepository.findById(studentId)
	            .orElseThrow(() -> new RuntimeException("Student not found"));

	    Mentor mentor = mentorRepository.findById(dto.getMentorId())
	            .orElseThrow(() -> new RuntimeException("Mentor not found"));

	    Session session = new Session();
	    session.setStudent(student);
	    session.setMentor(mentor);
	    session.setSessionDate(dto.getSessionDate());
	    session.setStartTime(dto.getStartTime());
	    session.setEndTime(dto.getEndTime());
	    session.setTopic(dto.getTopic());
	    session.setDescription(dto.getDescription());
	    session.setStatus(SessionStatus.SCHEDULED);
	    session.setSessionFee(mentor.getRatePerSession()); // auto fee
	    sessionRepository.save(session);

	    return dto;
	}

	
	// get student booked sessions
	public List<StudentSessionResponseDTO> getStudentSessions(Long studentId) {

	    List<Session> sessions = sessionRepository.findByStudentStudentId(studentId);

	    return sessions.stream().map(s -> {
	        StudentSessionResponseDTO dto = new StudentSessionResponseDTO();

	        dto.setSessionId(s.getSessionId());
	        dto.setMentorId(s.getMentor().getMentorId());
	        dto.setMentorName(
	            s.getMentor().getUserDetails().getFirstName() + " " +
	            s.getMentor().getUserDetails().getLastName()
	        );

	        dto.setSessionDate(s.getSessionDate());
	        dto.setStartTime(s.getStartTime());
	        dto.setEndTime(s.getEndTime());
	        dto.setTopic(s.getTopic());
	        dto.setDescription(s.getDescription());
	        dto.setStatus(s.getStatus().name());
	        dto.setSessionFee(s.getSessionFee());

	        return dto;
	    }).toList();
	}
	
	public StudentDashboardDTO getStudentDashboard(Long studentId) {

	    StudentDashboardDTO dto = new StudentDashboardDTO();

	    dto.setTotalSessions(sessionRepository.countTotalSessions(studentId));
	    dto.setUpcomingSessions(sessionRepository.countUpcomingSessions(studentId));
	    dto.setCompletedSessions(sessionRepository.countCompletedSessions(studentId));
	    dto.setTotalSpent(sessionRepository.sumTotalSpent(studentId));

	    return dto;
	}
	
	
	public void cancelSession(Long sessionId) {

	    Session session = sessionRepository.findById(sessionId)
	            .orElseThrow(() -> new RuntimeException("Session not found"));

	    // Only scheduled sessions can be cancelled
	    if (session.getStatus() == SessionStatus.COMPLETED) {
	        throw new RuntimeException("Completed session cannot be cancelled");
	    }

	    session.setStatus(SessionStatus.CANCELLED);
	    sessionRepository.save(session);
	}
	
	public FeedbackResponseDTO giveFeedback(Long studentId, FeedbackRequestDTO dto) {

	    Student student = studentRepository.findById(studentId)
	            .orElseThrow(() -> new RuntimeException("Student not found"));

	    Mentor mentor = mentorRepository.findById(dto.getMentorId())
	            .orElseThrow(() -> new RuntimeException("Mentor not found"));

	    Session session = sessionRepository.findById(dto.getSessionId())
	            .orElseThrow(() -> new RuntimeException("Session not found"));

	    // Only completed sessions allowed
	    if (session.getStatus() != SessionStatus.COMPLETED) {
	        throw new RuntimeException("Feedback allowed only after session completion");
	    }

	    Feedback feedback = new Feedback();
	    feedback.setStudent(student);
	    feedback.setMentor(mentor);
	    feedback.setSession(session);
	    feedback.setRating(dto.getRating());
	    feedback.setMessage(dto.getMessage());
	    feedback.setFeedbackDate(LocalDate.now());

	    feedbackRepository.save(feedback);

	    FeedbackResponseDTO res = new FeedbackResponseDTO();
	    res.setFeedbackId(feedback.getFeedbackId());
	    res.setStudentId(studentId);
	    res.setMentorId(dto.getMentorId());
	    res.setSessionId(dto.getSessionId());
	    res.setRating(dto.getRating());
	    res.setMessage(dto.getMessage());
	    res.setFeedbackDate(feedback.getFeedbackDate());

	    return res;
	}
	
	// get feedback given by student
	public List<FeedbackResponseDTO> getStudentFeedbacks(Long studentId) {

	    return feedbackRepository.findAll().stream()
	            .filter(f -> f.getStudent().getStudentId().equals(studentId))
	            .map(f -> {
	                FeedbackResponseDTO dto = new FeedbackResponseDTO();
	                dto.setFeedbackId(f.getFeedbackId());
	                dto.setMentorId(f.getMentor().getMentorId());
	                dto.setStudentId(f.getStudent().getStudentId());
	                dto.setSessionId(f.getSession().getSessionId());
	                dto.setRating(f.getRating());
	                dto.setMessage(f.getMessage());
	                dto.setFeedbackDate(f.getFeedbackDate());
	                return dto;
	            }).toList();
	}


	
}
