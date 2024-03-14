package com.gable.cts.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.cts.exception.ResourceNotFoundException;
import com.gable.cts.model.User;
import com.gable.cts.repository.UserRepository;

@Service

public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	public List<User> findAll(){
		return userRepo.findAll();
	}
	
	public User findOne(Long id) {
		return userRepo.findById(id).get();
	}
	
	public User newUser(User user) {
		User ret = null;
		try {
			if (user.getId() == null) {
				ret = userRepo.save(user);	
			}else {
				throw new ResourceNotFoundException("User", user.getId());
			}
			
		}catch (ResourceNotFoundException re) {
			throw re;
		}catch (Exception e) {
			throw new ResourceNotFoundException("User", user.getId());
		}
		
		return ret;
	}
	

	public User updateUser(User user, Long id) {
		User ret = null;
		try {
			findOne(user.getId());
			ret = userRepo.save(user);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}
		return ret;
	}


}
