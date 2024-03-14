package com.gable.cts.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gable.cts.model.Certificate;
import com.gable.cts.service.CertificateService;

@RestController
@RequestMapping(path = "/certificate")
public class CertificateController {
	
	@Autowired
	CertificateService service;
	
	@GetMapping(path = "/")
	List<Certificate> findAll(){
		return service.findAll();
	}
	
	@GetMapping(path = "/{id}")
	Certificate findOne(@PathVariable Long id) {
		return service.findOne(id);
	}
	
	@PostMapping(path = "/")
	Certificate addCerticate(@RequestBody Certificate certificate) {
		return service.addCertificate(certificate);
	}
	

	@PutMapping(path = "/{id}")
	Certificate updateCertificate(@RequestBody Certificate certificate) {
		return service.updateCertificate(certificate);
	}
}
