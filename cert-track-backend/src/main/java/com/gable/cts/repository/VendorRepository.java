package com.gable.cts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gable.cts.model.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Long> {

	Vendor findByName(String vendorName);

}