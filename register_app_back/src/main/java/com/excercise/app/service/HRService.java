package com.excercise.app.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excercise.app.model.HR;
import com.excercise.app.repository.HRRepository;

@Service
public class HRService {
	@Autowired
	private HRRepository HRRepo;

	
	public List<HR> findAllHRs() {
		return HRRepo.findAll();
	}
	
	public HR findOneHR(Long id) {
		return HRRepo.findById(id).get();
	}
	
	public HR addHR(HR hr) {
//		HR ret = null;
//		try {
//			findOneHR(hr.getId());
//		} catch (NoSuchElementException e) {
//			ret = HRRepo.save(hr);
//		}
//		return ret;
		return HRRepo.save(hr);
	}
	
	public HR updateHR(HR hr) {
		HR ret = null;
		try {
			findOneHR(hr.getId());
			ret = HRRepo.save(hr);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
			System.out.println("HR_ID not found!");
		}
		return ret;
	}
	
	public void deleteHR(Long id) {
		if (HRRepo.existsById(id)) {
	        HRRepo.deleteById(id);
	    } else {
	        System.out.println("HR with ID: " + id + " not found.");
	    }
	}
}
