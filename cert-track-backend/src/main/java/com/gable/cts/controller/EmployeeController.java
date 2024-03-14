package com.gable.cts.controller;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gable.cts.model.Employee;
import com.gable.cts.model.User;
import com.gable.cts.service.EmployeeService;

@CrossOrigin
@RestController
@RequestMapping(path = "/employee" )
public class EmployeeController {
	
	@Autowired
	private EmployeeService service;
	
	@GetMapping(path = "/")
	public List<Employee> findAll(){
		return service.findAll();
	}
	
	@GetMapping(path = "/{id}")
	public Employee findOne(@PathVariable Long id) {
		return service.findOne(id);
	}
	
	@PostMapping(path = "/")
	public Employee addEmployee(@RequestBody Employee employee) {
		return service.addEmployee(employee);
	}
	
	@PostMapping(path = "/addall")
	List<Employee> add_Add_Update_Employee(@RequestBody Map<String, List<?>> requestData) {
		ObjectMapper objectmapper = new ObjectMapper();
		
		List<Employee> employees = objectmapper.convertValue(requestData.get("employees"), new TypeReference<List<Employee>>() {});
	    List<User> users = objectmapper.convertValue(requestData.get("users"), new TypeReference<List<User>>() {});

	    Iterator<Employee> it = employees.iterator();
	    Iterator<User> it1 = users.iterator();

		while(it.hasNext()) {
			System.out.println(it.next());
			System.out.println(it1.next());
		}
	    return service.addAndUpdateEmployee(employees,users);
	}
	
	@PutMapping(path = "/{id}")
	public Employee updateEmployee(@RequestBody Employee employee) {
		return service.updateEmployee(employee);
	}
	
	@GetMapping(path = "/get-emp-by-user/{id}")
	public Employee GetEmployeeByUserId(@PathVariable Long id) {
		return service.getEmployeeByUserId(id);
	}
}
