package com.excercise.app.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excercise.app.model.User;
import com.excercise.app.model.UserProject;
import com.excercise.app.repository.UserProjectRepository;
import com.excercise.app.repository.UserRepository;

@Service
public class UserProjectService {
	@Autowired
	private UserProjectRepository userProjectRepo;
	
	@Autowired
	private UserRepository userRepo;

	public List<UserProject> findAllUserProjects() {
		return userProjectRepo.findAll();
	}
	
	public UserProject findOneUserProject(Long id) {
		return userProjectRepo.findById(id).get();
	}
	
	public UserProject addUserProject(UserProject userProject) {
//		UserProject ret = null;
//		try {
//			findOneUserProject(UserProject.getId());
//		} catch (NoSuchElementException e) {
//			ret = userProjectRepo.save(UserProject);
//		}
//		return ret;
		
		String email = userProject.getUser().getEmail();
		System.out.println(email);
		
		User user =  userRepo.findByEmail(email);
		
		userProject.setUser(user);
		
		return userProjectRepo.save(userProject);
	}
	
	public UserProject updateUserProject(UserProject userProject) {
		UserProject ret = null;
		try {
			findOneUserProject(userProject.getId());
			ret = userProjectRepo.save(userProject);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
			System.out.println("UserProject_ID not found!");
		}
		return ret;
	}
	
	public void deleteUserProject(Long id) {
		if (userProjectRepo.existsById(id)) {
	        userProjectRepo.deleteById(id);
	    } else {
	        System.out.println("userProject with ID: " + id + " not found.");
	    }
	}
}
