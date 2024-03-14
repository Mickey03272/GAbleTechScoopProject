package com.excercise.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excercise.app.model.Status;

public interface StatusRepository 
	extends JpaRepository<Status, Long> {

}
