package com.excercise.app.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excercise.app.model.User;
import com.excercise.app.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepo;
	
	public List<User> findAllUsers() {
		return userRepo.findAll();
	}
	
	public User findOneUser(Long id) {
		return userRepo.findById(id).get();
	}
	
	public User addUser(User user) {
//		User ret = null;
//		try {
//			findOneUser(user.getId());
//		} catch (NoSuchElementException e) {
//			ret = userRepo.save(user);
//		}
//		return ret;
		return userRepo.save(user);
	}
	
	public User updateUser(User user) {
		User ret = null;
		try {
			findOneUser(user.getId());
			ret = userRepo.save(user);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
			System.out.println("User_ID not found!");
		}
		return ret;
	}
	
	public void deleteUser(Long id) {
		if (userRepo.existsById(id)) {
	        userRepo.deleteById(id);
	    } else {
	        System.out.println("user with ID: " + id + " not found.");
	    }
	}
	
}
