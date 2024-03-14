package com.gable.cts.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.cts.model.Certificate;
import com.gable.cts.repository.CertificateRepository;

@Service
public class CertificateService {
	
	@Autowired
	CertificateRepository repo;
	
	//GET ALL CERTIFICATION THAT HAVE IN LIST (DISTINT)
	public List<Certificate> findAll() {
		return repo.findAll();
	}

		
	//GET ONLY ONE EMPLOYEE
	public  Certificate findOne(Long id) {
		return repo.findById(id).get();
	}
		
	//ADD NEW CERTIFICATE
	//public Certificate addNewCertificate(Certificate certificate) {
	//	Certificate new_certificate = null;
	//	if (!repo.existsById(certificate.getId())) {
	//		new_certificate = certificate;
	//	}
	//	return repo.save(new_certificate);
	//}
	
	public Certificate addCertificate(Certificate certificate) {
		Certificate ret = null;
		try {
			if (certificate.getId() == null) {
				ret = repo.save(certificate);
			}
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		return ret;
	}
		
	//UPDATE&EDIT EMPLOYEE
	public Certificate updateCertificate(Certificate certificate) {
		Certificate ret = null;
		
		try {
			if(repo.existsById(certificate.getId())) {
				ret = repo.save(certificate);
			}
		}catch( Exception ex) {
			ex.printStackTrace();

		}
		return ret;
	}

}
