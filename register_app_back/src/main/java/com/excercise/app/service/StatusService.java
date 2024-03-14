package com.excercise.app.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excercise.app.model.Status;
import com.excercise.app.repository.StatusRepository;

@Service
public class StatusService {
	@Autowired
	private StatusRepository statusRepo;
	
	public List<Status> findAllStatuss() {
		return statusRepo.findAll();
	}
	
	public Status findOneStatus(Long id) {
		return statusRepo.findById(id).get();
	}
	
	public Status addStatus(Status status) {
//		Status ret = null;
//		try {
//			findOneStatus(status.getId());
//		} catch (NoSuchElementException e) {
//			ret = statusRepo.save(status);
//		}
//		return ret;
		return statusRepo.save(status);
	}
	
	public Status updateStatus(Status status) {
		Status ret = null;
		try {
			findOneStatus(status.getId());
			ret = statusRepo.save(status);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
			System.out.println("Status_ID not found!");
		}
		return ret;
	}
	
	public void deleteStatus(Long id) {
		if (statusRepo.existsById(id)) {
	        statusRepo.deleteById(id);
	    } else {
	        System.out.println("status with ID: " + id + " not found.");
	    }
	}
}
