package com.gable.cts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gable.cts.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
