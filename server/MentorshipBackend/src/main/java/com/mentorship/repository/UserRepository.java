package com.mentorship.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mentorship.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
