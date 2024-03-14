package com.gable.cts.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gable.cts.model.User;


public interface UserRepository extends JpaRepository<User, Long> {

	List<User> findByUsername(String name) ;

	
}
