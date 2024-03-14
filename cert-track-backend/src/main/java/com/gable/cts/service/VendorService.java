package com.gable.cts.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.cts.model.Vendor;
import com.gable.cts.repository.VendorRepository;

@Service

public class VendorService {

	@Autowired
	private VendorRepository vendorRepo;
	
	
	public List<Vendor> findAll() {
		return vendorRepo.findAll();
	}

	public Vendor findOne(Long id) {
		return vendorRepo.findById(id).get();
	}
		

	public Vendor newVendor(Vendor vendor) {
		Vendor ret = null;
		try {
			if (ret.getId() == null) {
				ret = vendorRepo.save(vendor);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return ret;
	}

	public Vendor updateVendor(Vendor vendor, Long id) {
		Vendor ret = null;
		try {
			findOne(vendor.getId());
			ret = vendorRepo.save(vendor);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}
		return ret;
	}
 

}

