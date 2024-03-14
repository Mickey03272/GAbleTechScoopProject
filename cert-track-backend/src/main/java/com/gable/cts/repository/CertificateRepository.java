package com.gable.cts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gable.cts.model.Certificate;

public interface CertificateRepository extends JpaRepository<Certificate, Long>{
	@Query("SELECT DISTINCT e.name FROM Certificate e")
    List<Certificate> findDistinctNames();
	
	List<String> findNameById(Long id);

	Certificate findByName(String new_name);
	
	@Query("SELECT c FROM Certificate c WHERE c.name = :certName")
	Certificate findByCertName(String certName);

	@Query("SELECT c FROM Certificate c WHERE c.name LIKE %:certName%")
	List<Certificate> findByPartialCertName(String certName);
	
	@Query("SELECT c FROM Certificate c WHERE c.isActive = true")
	List<Certificate> findActiveCerts();

}
