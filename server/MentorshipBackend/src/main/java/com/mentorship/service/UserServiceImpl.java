package com.mentorship.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mentorship.dtos.UserResp;
import com.mentorship.entities.User;
import com.mentorship.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private UserRepository userRepository;
	private ModelMapper modelMapper;

	@Override
	public List<UserResp> getAllUsers() {
		
		return userRepository.findAll()
				.stream().map(user -> modelMapper.map(user,  UserResp.class))
				.toList();
	}
	
	

}
