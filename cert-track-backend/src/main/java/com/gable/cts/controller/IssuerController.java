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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gable.cts.model.Issuer;
import com.gable.cts.service.IssuerService;

@RestController
@RequestMapping(path = "/issuer")
public class IssuerController {

	@Autowired
	IssuerService service;

	@GetMapping("/")
    public List<Issuer> findAll() {
        return service.findAll();
    }

	@GetMapping("/{id}")
	public Issuer findOne(@PathVariable Long id) {
		return service.findOne(id);
	}

	@PostMapping("/")
	public Issuer addIssuer(@RequestBody Issuer issuer) {
		System.out.println(issuer);
		return service.addIssuer(issuer);
	}

	@PutMapping("/{id}")
	public Issuer updateIssuer(@RequestBody Issuer issuer, @PathVariable Long id) {
		System.out.println(issuer);
		return service.updateIssuer(issuer);
	}

//	@DeleteMapping("/{id}")
//	void deleteIssuer(@PathVariable Long id) {
//		service.deleteIssuer(id);
//	}
}
