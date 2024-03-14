package com.excercise.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excercise.app.model.HR;

public interface HRRepository 
	extends JpaRepository<HR, Long> {
	
}
