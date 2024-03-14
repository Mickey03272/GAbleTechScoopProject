package com.gable.cts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gable.cts.model.Employee;
import com.gable.cts.model.OwnCert;

@Repository // is this annotation necessary?
public interface OwnCertRepository extends JpaRepository<OwnCert, Long>{
	
	@Query ("SELECT employee FROM OwnCert where certificate_id = :id")
	List<Employee> empByOwnCert(Long id);

}
