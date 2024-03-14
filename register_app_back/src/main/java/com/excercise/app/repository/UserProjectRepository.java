package com.excercise.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excercise.app.model.UserProject;

public interface UserProjectRepository 
	extends JpaRepository<UserProject, Long>{

}
