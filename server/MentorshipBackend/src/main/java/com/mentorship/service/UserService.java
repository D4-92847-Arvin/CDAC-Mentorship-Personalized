package com.mentorship.service;

import java.util.List;

import com.mentorship.dtos.UserResp;
import com.mentorship.entities.User;

public interface UserService {
	List<UserResp> getAllUsers();
}
