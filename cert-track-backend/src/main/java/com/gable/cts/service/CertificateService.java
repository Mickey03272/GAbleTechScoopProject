package com.gable.cts.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

import com.gable.cts.model.Certificate;
import com.gable.cts.model.OwnCert;
import com.gable.cts.repository.CertificateRepository;

@Service
public class CertificateService {

	@Autowired
	private CertificateRepository repo;

	// GET ALL CERTIFICATION THAT HAVE IN LIST (DISTINT)
	public List<Certificate> findAll() {
		return repo.findAll();
	}

	// GET ONLY ONE EMPLOYEE
	public Certificate findOne(Long id) {
		return repo.findById(id).get();
	}

	// ADD NEW CERTIFICATE
	// public Certificate addNewCertificate(Certificate certificate) {
	// Certificate new_certificate = null;
	// if (!repo.existsById(certificate.getId())) {
	// new_certificate = certificate;
	// }
	// return repo.save(new_certificate);
	// }

	public Certificate addCertificate(Certificate certificate) {
		Certificate ret = null;
		try {
			if (certificate.getId() == null) {
				ret = repo.save(certificate);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return ret;
	}

	// UPDATE&EDIT EMPLOYEE
	public Certificate updateCertificate(Certificate certificate) {
		Certificate ret = null;

		try {
			if (repo.existsById(certificate.getId())) {
				ret = repo.save(certificate);
			}
		} catch (Exception ex) {
			ex.printStackTrace();

		}
		return ret;
	}

	public Certificate findByCertName(String certName) {
		return repo.findByCertName(certName);
	}

	public List<Certificate> findByPartialCertName(String certName) {
		return repo.findByPartialCertName(certName);
	}

	public byte[] jsonStringToByteArray(String jsonString) {
		jsonString = jsonString.substring(1, jsonString.length() - 1);

		String[] parts = jsonString.split(",");
		List<Byte> byteList = new ArrayList<>();
		for (String part : parts) {
			int intValue = Integer.parseInt(part.trim());
			byteList.add((byte) intValue);
		}

		byte[] byteArray = new byte[byteList.size()];
		for (int i = 0; i < byteList.size(); i++) {
			byteArray[i] = byteList.get(i);
		}

		return byteArray;
	}
	
	public Certificate updateCertIsActive(Long certId) {
		try {
	        Optional<Certificate> optionalCert = repo.findById(certId);
	        if (optionalCert.isPresent()) {
	            Certificate updatedCert = optionalCert.get();
	            updatedCert.setIsActive(!updatedCert.getIsActive());
	            return repo.save(updatedCert);
	        }  else {
	            throw new NoSuchElementException("Certificate with ID " + certId + " not found");
	        }
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
