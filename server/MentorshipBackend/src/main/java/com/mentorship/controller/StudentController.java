package com.mentorship.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mentorship.dto.FeedbackRequestDTO;
import com.mentorship.dto.FeedbackResponseDTO;
import com.mentorship.dto.MentorDTO;
import com.mentorship.dto.StudentDTO;
import com.mentorship.dto.StudentSessionDTO;
import com.mentorship.dto.StudentSessionResponseDTO;
import com.mentorship.service.StudentService;

@RestController
@RequestMapping("/api/student")
public class StudentController {
	
	@Autowired
	private StudentService studentService;
	
    // get student by id 
	@GetMapping("/{id}")
	public ResponseEntity<StudentDTO> getStudent(@PathVariable Long id) {
	return ResponseEntity.ok(studentService.getStudentById(id));
	}

	// get all students
	@GetMapping
	public List<StudentDTO> getAllStudents() {
	return studentService.getAllStudents();
	}
	
	// insert student
	@PostMapping
	public StudentDTO createStudent(@RequestBody StudentDTO dto) {
	return studentService.createStudent(dto);
	}

	// Update Student Profile
	@PutMapping("/{id}")
	public ResponseEntity<StudentDTO> updateStudent(@PathVariable Long id,@RequestBody StudentDTO dto) {
	return ResponseEntity.ok(studentService.updateStudent(id, dto));
	}

	// delete student by id
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable Long id) {

	    if (studentService.deleteStudent(id)) {
	        return ResponseEntity.ok("Student with ID " + id + " deleted successfully");
	    }

	    return ResponseEntity.status(HttpStatus.NOT_FOUND)
	            .body("Student not found");
	}
	

	// Browse Verified Mentors
	@GetMapping("/mentors")
	public ResponseEntity<List<MentorDTO>> getVerifiedMentors(
	@RequestParam(required = false) String domain) {
	return ResponseEntity.ok(studentService.getVerifiedMentors(domain));
	}

	//  Book Session
	@PostMapping("/{studentId}/sessions")
	public ResponseEntity<StudentSessionDTO> bookSession(
	        @PathVariable Long studentId,
	        @RequestBody StudentSessionDTO dto) {

	    return new ResponseEntity<>(studentService.bookSession(studentId, dto),
	            HttpStatus.CREATED);
	}

	// GET student sessions
	@GetMapping("/{studentId}/sessions")
	public ResponseEntity<List<StudentSessionResponseDTO>> getStudentSessions(
	        @PathVariable Long studentId) {

	    return ResponseEntity.ok(studentService.getStudentSessions(studentId));
	}


	// Cancel Session
	@PatchMapping("/sessions/{sessionId}/cancel")
	public ResponseEntity<String> cancelSession(@PathVariable Long sessionId) {

	    studentService.cancelSession(sessionId);
	    return ResponseEntity.ok("Session cancelled successfully");
	}

	

	// Student Dashboard
	@GetMapping("/{studentId}/dashboard")
	public ResponseEntity<?> getDashboard(@PathVariable Long studentId) {
	return ResponseEntity.ok(studentService.getStudentDashboard(studentId));
	}
	
	// Student gives feedback
	@PostMapping("/{studentId}/feedback")
	public ResponseEntity<FeedbackResponseDTO> giveFeedback(
	        @PathVariable Long studentId,
	        @RequestBody FeedbackRequestDTO dto) {

	    return new ResponseEntity<>(studentService.giveFeedback(studentId, dto),
	            HttpStatus.CREATED);
	}

	// Student sees his feedbacks
	@GetMapping("/{studentId}/feedback")
	public ResponseEntity<List<FeedbackResponseDTO>> getFeedbacks(@PathVariable Long studentId) {
	    return ResponseEntity.ok(studentService.getStudentFeedbacks(studentId));
	}

		
}	
		
