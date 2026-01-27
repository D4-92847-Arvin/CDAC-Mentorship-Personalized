package com.mentorship.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentorship.dtos.ApiResponse;
import com.mentorship.dtos.AuthRequest;
import com.mentorship.dtos.AuthResponse;
import com.mentorship.dtos.MentorSignupRequest;
import com.mentorship.dtos.StudentSignupRequest;
import com.mentorship.dtos.UserResp;
import com.mentorship.security.JwtUtils;
import com.mentorship.service.AuthServiceImpl;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class AuthController {
	
	private AuthServiceImpl authService;
	private AuthenticationManager authenticationManager;
	private JwtUtils jwtUtils;
	
	@PostMapping("/signin")
	public ResponseEntity<?> signin(@RequestBody @Valid AuthRequest request) {
		System.out.println("in sign in" +request);
		Authentication authToken = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
		//check
		System.out.println("before - "+authToken.isAuthenticated());
		
		Authentication validAuth = authenticationManager.authenticate(authToken);
		
		//check
		System.out.println("after - "+validAuth.isAuthenticated());
		System.out.println(validAuth);
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new AuthResponse("Successful login !",
						jwtUtils.generateJwtToken(validAuth)));
	}
	
	@PostMapping("/signup/student")
	public ResponseEntity<?> registerStudent(@RequestBody @Valid StudentSignupRequest dto) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(authService.registerStudent(dto));
		
	}

	@PostMapping("/signup/mentor")
	public UserResp registerMentor(@RequestBody MentorSignupRequest dto) {
		return null;
		
	}
	
	
}
