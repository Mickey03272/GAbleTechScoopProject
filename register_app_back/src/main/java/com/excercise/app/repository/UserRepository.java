package com.excercise.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excercise.app.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByEmail(String email);
	
}
