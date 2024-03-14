package com.gable.cts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gable.cts.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{
	Employee findByUserId(Long userId);
	
	boolean existsByEmployeeID(String employeeID);

	Long findIdByEmployeeID(String employeeID);
}
