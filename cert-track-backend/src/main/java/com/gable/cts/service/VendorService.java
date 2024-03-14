package com.gable.cts.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.cts.model.Certificate;
import com.gable.cts.model.Vendor;
import com.gable.cts.repository.CertificateRepository;
import com.gable.cts.repository.VendorRepository;

@Service
public class VendorService {

	@Autowired
	private VendorRepository vendorRepo;
	
	@Autowired
	private CertificateRepository certRepo;
	
	public List<Vendor> findAll() {
		return vendorRepo.findAll();
	}

	public Vendor findOne(Long id) {
		return vendorRepo.findById(id).get();
	}
		

	public Vendor newVendor(Vendor vendor) {
		Vendor ret = null;
		try {
			if (vendor.getId() == null) {
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
			Vendor v = findOne(vendor.getId());
			
			List<Certificate> l =  vendor.getRequireCert();
			List<Certificate> newl = new ArrayList<>();
			for (Certificate certificate : l) {
				Certificate ldb = certRepo.findById(certificate.getId()).get();
				newl.add(ldb);
				ldb.setVendor(vendor);
			}
			
			
			vendor.setRequireCert(newl);
			
			ret = vendorRepo.save(vendor);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}
		return ret;
	}
 

}

