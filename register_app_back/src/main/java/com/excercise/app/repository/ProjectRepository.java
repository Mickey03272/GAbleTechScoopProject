package com.excercise.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excercise.app.model.Project;

public interface ProjectRepository 
	extends JpaRepository<Project, Long> {
	
}
