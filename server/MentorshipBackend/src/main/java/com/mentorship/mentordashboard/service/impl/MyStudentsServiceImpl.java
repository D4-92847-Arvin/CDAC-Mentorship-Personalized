package com.mentorship.mentordashboard.service.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mentorship.entities.Mentor;
import com.mentorship.entities.Student;
import com.mentorship.mentordashboard.dto.StudentCardDTO;
import com.mentorship.mentordashboard.entity.MentorStudent;
import com.mentorship.mentordashboard.entity.MentorStudentStatus;
import com.mentorship.mentordashboard.repository.MentorRepository;
import com.mentorship.mentordashboard.repository.MentorStudentRepository;
import com.mentorship.mentordashboard.repository.StudentRepository;
import com.mentorship.mentordashboard.service.MyStudentsService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MyStudentsServiceImpl implements MyStudentsService {

    private final MentorStudentRepository mentorStudentRepository;
    private final MentorRepository mentorRepository;
    private final StudentRepository studentRepository;

    @Override
    public List<StudentCardDTO> getAllStudents(Long mentorId) {
        List<MentorStudent> mentorStudents = mentorStudentRepository.findByMentor_MentorId(mentorId);
        return mentorStudents.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<StudentCardDTO> getActiveStudents(Long mentorId) {
        List<MentorStudent> mentorStudents = mentorStudentRepository
                .findByMentor_MentorIdAndStatus(mentorId, MentorStudentStatus.ACTIVE);
        return mentorStudents.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public StudentCardDTO getStudentDetails(Long mentorId, Long studentId) {
        MentorStudent mentorStudent = mentorStudentRepository
                .findByMentor_MentorIdAndStudent_StudentId(mentorId, studentId)
                .orElseThrow(() -> new RuntimeException("Student relationship not found"));
        return convertToDTO(mentorStudent);
    }

    @Override
    public void updateStudentProgress(Long mentorId, Long studentId, Integer progress) {
        MentorStudent mentorStudent = mentorStudentRepository
                .findByMentor_MentorIdAndStudent_StudentId(mentorId, studentId)
                .orElseThrow(() -> new RuntimeException("Student relationship not found"));
        
        mentorStudent.setProgressPercentage(progress);
        mentorStudentRepository.save(mentorStudent);
    }

    @Override
    public StudentCardDTO addStudent(Long mentorId, Long studentId) {
        // Check if relationship already exists
        if (mentorStudentRepository.existsByMentor_MentorIdAndStudent_StudentId(mentorId, studentId)) {
            throw new RuntimeException("Student is already assigned to this mentor");
        }

        Mentor mentor = mentorRepository.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found with id: " + mentorId));
        
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));

        MentorStudent mentorStudent = new MentorStudent();
        mentorStudent.setMentor(mentor);
        mentorStudent.setStudent(student);
        mentorStudent.setEnrollmentDate(LocalDate.now());
        mentorStudent.setStatus(MentorStudentStatus.ACTIVE);
        mentorStudent.setTotalSessions(0);
        mentorStudent.setProgressPercentage(0);

        MentorStudent saved = mentorStudentRepository.save(mentorStudent);
        return convertToDTO(saved);
    }

    @Override
    public void removeStudent(Long mentorId, Long studentId) {
        MentorStudent mentorStudent = mentorStudentRepository
                .findByMentor_MentorIdAndStudent_StudentId(mentorId, studentId)
                .orElseThrow(() -> new RuntimeException("Student relationship not found"));
        
        mentorStudent.setStatus(MentorStudentStatus.INACTIVE);
        mentorStudentRepository.save(mentorStudent);
    }

    @Override
    public Integer countActiveStudents(Long mentorId) {
        return mentorStudentRepository.countActiveStudents(mentorId);
    }

    private StudentCardDTO convertToDTO(MentorStudent ms) {
        String firstName = ms.getStudent().getUserDetails().getFirstName();
        String lastName = ms.getStudent().getUserDetails().getLastName();
        String fullName = firstName + " " + lastName;
        String initials = (firstName.substring(0, 1) + lastName.substring(0, 1)).toUpperCase();
        
        String nextSession = null;
        if (ms.getNextSessionDate() != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM d");
            nextSession = ms.getNextSessionDate().format(formatter);
            if (ms.getNextSessionTime() != null) {
                nextSession += ", " + ms.getNextSessionTime();
            }
        }

        return StudentCardDTO.builder()
                .studentId(ms.getStudent().getStudentId())
                .name(fullName)
                .initials(initials)
                .sessions(ms.getTotalSessions())
                .progress(ms.getProgressPercentage())
                .nextSession(nextSession)
                .email(ms.getStudent().getUserDetails().getEmail())
                .targetDomain(ms.getStudent().getTargetDomain())
                .status(ms.getStatus().name())
                .build();
    }
}
