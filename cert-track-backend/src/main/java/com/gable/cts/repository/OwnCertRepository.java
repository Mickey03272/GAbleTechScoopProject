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

//	// Custom query to get OwnCert by month and year
//    @Query("SELECT oc FROM OwnCert oc WHERE YEAR(oc.createDate) = :year AND MONTH(oc.createDate) = :month")
//    List<OwnCert> findAllByCreateDateYearMonth(Integer year, Integer month);
    
//	@Query("SELECT oc FROM OwnCert oc WHERE oc.cert.name = :ownCertName AND "
//			+ "oc.employee.user.username = :userName AND oc.isActive = true")
//	OwnCert findByOwnCertName(String ownCertName, String userName);
	
    @Query("SELECT oc FROM OwnCert oc JOIN oc.employee e " +
    "WHERE e.organization.manager.id = :managerId AND e.organization.divn =" +
    "(SELECT e2.organization.divn FROM Employee e2 WHERE e2.id = :managerId)")
    List<OwnCert> findAllByManager(Long managerId);
}
