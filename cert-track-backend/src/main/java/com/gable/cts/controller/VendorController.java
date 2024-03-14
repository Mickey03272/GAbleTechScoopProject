package com.gable.cts.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gable.cts.model.Vendor;
import com.gable.cts.service.VendorService;

@CrossOrigin
@RestController
@RequestMapping("/vendor")
public class VendorController {
	
	@Autowired
	VendorService service;
 
	@GetMapping("/")
	List<Vendor> findAll(){
		return service.findAll();
	}
	
	@GetMapping("/{id}")
	Vendor findOne(@PathVariable Long id){
		return service.findOne(id);
	}
	
	@PostMapping("/")
	public Vendor newVendor(@RequestBody Vendor vendor) {
		return service.newVendor(vendor);
	}
	
	@PutMapping("/{id}")
	Vendor updateVendor(@RequestBody Vendor vendor,@PathVariable Long id) { 
	    return service.updateVendor(vendor, id);
	}
	

}