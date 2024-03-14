package com.gable.cts.service;

 
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.gable.cts.exception.ResourceNotFoundException;
import com.gable.cts.model.Role;
import com.gable.cts.repository.RoleRepository;

@Service
public class RoleService {

	@Autowired
	private RoleRepository roleRepo;

	public List<Role> findAll(){
		return roleRepo.findAll();
	}
	
	public Role findOne(Long id) {
		return roleRepo.findById(id).get();
	}

	public Role addRole(Role role) {
		Role ret = null;
		try {
			if (role.getId() == null) {
				ret = roleRepo.save(role);
			}
		}catch (Exception e) {
			e.printStackTrace();
			throw new ResourceNotFoundException("Role not found", role.getId());
		}
		return ret;
	}

	public Role updateRole(Role role, Long id) {
		Role ret = null;
		try {
			findOne(role.getId());
			ret = roleRepo.save(role);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}
		return ret;
	}
	
	
}
