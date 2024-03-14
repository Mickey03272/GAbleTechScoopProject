package com.gable.cts.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.cts.model.Employee;
import com.gable.cts.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository repo;
	
	//GET ALL EMPLOYEE
	public List<Employee> findAll() {
		return repo.findAll();
	}
	
	//GET ONLY ONE EMPLOYEE
	public  Employee findOne(Long id) {
		return repo.findById(id).orElse(null);
	}
	
	//ADD NEW EMPLOYEE
	public Employee addEmployee(Employee employee) {
		Employee newEmployee = null;
		try {
			if (employee.getId() == null) {
				newEmployee =  repo.save(employee);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return newEmployee;
		
	}
	
	//UPDATE&EDIT EMPLOYEE

	public Employee updateEmployee(Employee employee) {
		Employee ret = null;
		try {
			if(repo.existsById(employee.getId())) {
				ret = repo.save(employee);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return ret;
	}

	public List<Employee> addAndUpdateEmployee(List<Employee> employee) {
		return repo.saveAll(employee);
	}

}
