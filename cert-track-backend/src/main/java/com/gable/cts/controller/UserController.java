package com.gable.cts.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gable.cts.model.User;
import com.gable.cts.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService service;
 
	@GetMapping("/")
	List<User> findAll(){
		return service.findAll();
	}
	
	@GetMapping("/{id}")
	User findOne(@PathVariable Long id){
		return service.findOne(id);
	}
		
	@PostMapping("/")
	public User newUser(@RequestBody User user) {
		return service.newUser(user);
	}
	
		
	@PutMapping("/{id}")
	User updateUser(@RequestBody User user,@PathVariable Long id) { 
	    return service.updateUser(user,id); 
	}
	

}