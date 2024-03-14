package com.gable.cts.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gable.cts.model.Certificate;

public interface CertificateRepository extends JpaRepository<Certificate, Long>{
	@Query("SELECT DISTINCT e.name FROM Certificate e")
    List<Certificate> findDistinctNames();
	
	List<String> findNameById(Long id);

	Certificate findByName(String new_name);

}
