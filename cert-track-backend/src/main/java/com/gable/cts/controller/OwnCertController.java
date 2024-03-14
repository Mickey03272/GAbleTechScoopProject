package com.gable.cts.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gable.cts.model.Employee;
import com.gable.cts.model.OwnCert;
import com.gable.cts.service.OwnCertService;

@RestController
@RequestMapping("/own-cert")
public class OwnCertController {
	
	@Autowired
	private OwnCertService ownCertService;

	@GetMapping("/")
	public List<OwnCert> findAllOwnCerts() {
		return ownCertService.findAllOwnCerts();
	}

	@GetMapping("/{id}")
	public OwnCert findOneOwnCert(@PathVariable Long id) {
		return ownCertService.findOneOwnCert(id);
	}

	@PostMapping("/")
	public OwnCert addOwnCert(@RequestBody OwnCert ownCert) {
		System.out.println("Received request to add ownCert: " + ownCert);
		return ownCertService.addOwnCert(ownCert);
	}
	
	@PostMapping("/addcert/{userid}")
	public OwnCert addOwnCertUser(@RequestBody OwnCert ownCert,@PathVariable Long userid) {
		System.out.println("Received request to add ownCert: " + ownCert);
		return ownCertService.addOwnCertUser(ownCert,userid);
	}

	// @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	@PutMapping("/{id}")
	public OwnCert updateOwnCert(@RequestBody OwnCert ownCert, @PathVariable Long id) {
		return ownCertService.updateOwnCert(ownCert);
	}

//	@DeleteMapping("/{id}")
//	void deleteOwnCert(@PathVariable Long id) {
//		ownCertService.deleteOwnCert(id);
//	}
	
	@GetMapping("/empByOwnCert/{id}")
	public List<Employee> empByOwnCert(@PathVariable Long id) {
		return ownCertService.empByOwnCert(id);
	}
}
