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

import com.gable.cts.model.Role;
import com.gable.cts.service.RoleService;
 
@RestController
@RequestMapping("/role")
public class RoleController {
	
	@Autowired
	RoleService service;
 
	@GetMapping("/")
	List<Role> findAll(){
		return service.findAll();
	}
	
	@GetMapping("/{id}")
	Role findOne(@PathVariable Long id){
		return service.findOne(id);
	}
	
	@PostMapping("/")
	public Role newRole(@RequestBody Role role) {
		return service.addRole(role);
	}
	
	@PutMapping("/{id}")
	Role updateRole(@RequestBody Role role,@PathVariable Long id) { 
	    return service.updateRole(role,id);
	}
	
}