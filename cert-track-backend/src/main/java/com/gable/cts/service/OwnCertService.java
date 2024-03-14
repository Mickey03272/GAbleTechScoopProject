package com.gable.cts.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.cts.model.Certificate;
import com.gable.cts.model.Employee;
import com.gable.cts.model.OwnCert;
import com.gable.cts.repository.CertificateRepository;
import com.gable.cts.repository.EmployeeRepository;
import com.gable.cts.repository.OwnCertRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class OwnCertService {
	@Autowired
	private OwnCertRepository ownCertRepo;
	
	@Autowired
	private CertificateRepository certificateRepo;
	
	@Autowired
	private EmployeeRepository employeeRepo;

	public List<OwnCert> findAllOwnCerts() {
		return ownCertRepo.findAll();
	}

	public OwnCert findOneOwnCert(Long id) {
		return ownCertRepo.findById(id).get();
	}

	public OwnCert addOwnCert(OwnCert ownCert) {
		OwnCert ret = null;
		try {
			if (ownCert.getId() == null) {
				ownCert.setStatus(OwnCert.STATUS_CREATE);
				ownCertRepo.save(ownCert);
			}
		}catch(Exception e) {
			
		}
		return ret; 
	}

	public OwnCert updateOwnCert(OwnCert ownCert) {
		try {
			findOneOwnCert(ownCert.getId());
			log.info("OwnCert is updated" + ownCert);
			return ownCertRepo.save(ownCert);
		} catch (Exception e) {
			e.printStackTrace();			
			log.error("ownCert_id not found!" ,e);
			return null;
		}
	}

//	public void deleteOwnCert(Long id) {
//		if (ownCertRepo.existsById(id)) {
//			ownCertRepo.deleteById(id);
//			System.out.println("deleted ownCert_id: " + id);
//		} else {
//			System.out.println("deleting error: ownCert with ID: " + id + " not found.");
//		}
//	}
	public void deleteOwnCert(Long id) {
		if (ownCertRepo.existsById(id)) {
			ownCertRepo.deleteById(id);
			System.out.println("deleted ownCert_id: " + id);
		} else {
			System.out.println("deleting error: ownCert with ID: " + id + " not found.");
		}
	}

	public OwnCert addOwnCertUser(OwnCert ownCert, Long userid) {
		try {
			String ownCert_Name = ownCert.getCert().getName();
			Certificate ownCert_NameCert = certificateRepo.findByName(ownCert_Name);
			Employee ownCert_Employee = employeeRepo.findById(userid).get();
			if(ownCert.getExpireDate().isBefore(ownCert.getCreateDate())) {
				ownCert.setIsActive(true);
			}
			else if(ownCert.getExpireDate().isAfter(ownCert.getCreateDate())) {
				ownCert.setIsActive(false);
			}
			else {
				System.out.println("Please check your Date is not null");
			}
			ownCert.setCert(ownCert_NameCert);
			ownCert.setEmployee(ownCert_Employee);
			ownCert.setStatus(OwnCert.STATUS_CREATE);
			System.out.println("Your Certificate has been add");
			return ownCertRepo.save(ownCert);
		}catch (NoSuchElementException e) {
			System.out.println("Your certificate are not in current field");
			return null;
		}
	}
	
	//Get Employee by certificate
	public List<Employee> empByOwnCert(Long id) {
		return ownCertRepo.empByOwnCert(id);
	}
	
}
