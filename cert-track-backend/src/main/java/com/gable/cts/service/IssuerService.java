package com.gable.cts.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.cts.repository.IssuerRepository;
import com.gable.cts.model.Issuer;

@Service
public class IssuerService {
	
	@Autowired
	IssuerRepository repo;

	public List<Issuer> findAll() {

		return repo.findAll();
	}

	public Issuer findOne(Long id) {

		return repo.findById(id).get();

	}

	public Issuer addIssuer(Issuer issuer) {
		Issuer ret = null;
		try {
			if (issuer.getId() == null) {
				ret = repo.save(issuer);
			}			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ret;
	}

	public Issuer updateIssuer(Issuer issuer) {
		Issuer ret = null;
		try {
			findOne(issuer.getId());
			ret = repo.save(issuer);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}
		return ret;
	}
 
//	public void deleteIssuer(Long id) {
//		if (repo.existsById(id)) {
//	        repo.deleteById(id);
//	    } else {
//	        System.out.println("Issuer with ID: " + id + " not found.");
//	    }
//	}
//
}
