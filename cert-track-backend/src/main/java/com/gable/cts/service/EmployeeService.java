package com.gable.cts.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.cts.model.ERole;
import com.gable.cts.model.Employee;
import com.gable.cts.model.Role;
import com.gable.cts.model.User;
import com.gable.cts.repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository repo;

	private final UserService userservice;

	private final RoleService roleservice;

	public EmployeeService(UserService userservice, RoleService roleservice) {
		this.userservice = userservice;
		this.roleservice = roleservice;
	}

	// GET ALL EMPLOYEE
	public List<Employee> findAll() {
		return repo.findAll();
	}

	// GET ONLY ONE EMPLOYEE
	public Employee findOne(Long id) {
		return repo.findById(id).orElse(null);
	}

	// ADD NEW EMPLOYEE
	public Employee addEmployee(Employee employee) {
		Employee newEmployee = null;
		try {
			if (employee.getId() == null) {
				newEmployee = repo.save(employee);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return newEmployee;
	}
	
	public Employee updateEmployee(Employee employee) {
		Employee ret = null;
		try {
			if (repo.existsById(employee.getId())) {
				ret = repo.save(employee);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ret;
	}

//	public List<Employee> addAndUpdateEmployee(List<Employee> employee) {
//		return repo.saveAll(employee);
//	}
		
	public List<Employee> addAndUpdateEmployee(List<Employee> employees,List<User> users) {
		Iterator<Employee> it = employees.iterator();
		int count = 0;
		while(it.hasNext()) {
			List<Role> currentRole = new ArrayList<Role>();
			Employee currentEmployee = it.next();
			User currentUser = userservice.newUser(users.get(count));
			currentRole.add(roleservice.findOneByName(ERole.ROLE_USER));
			currentUser.setRoles(currentRole);
			currentEmployee.setUser(currentUser);
			currentEmployee.setImportDate(LocalDate.now());
			repo.save(currentEmployee);
			count++;
		}
	    return repo.findAll();
	}

	public Employee getEmployeeByUserId(Long userId) {
		try {
			if (userId != null) {
				return repo.findByUserId(userId);
			} else {
				System.out.println("User ID not found.");
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
