package com.gable.cts.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.cts.model.Organization;
import com.gable.cts.repository.OrganizationRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class OrganizationService {
	@Autowired
	private OrganizationRepository organizationRepo;

	public List<Organization> findAll() {
		return organizationRepo.findAll();
	}

	public Organization findOne(Long id) {
		return organizationRepo.findById(id).get();
	}

	public Organization addOrganization(Organization organization) {
		Organization ret = null;
		try {
			if (organization.getId() == null) { 
				ret = organizationRepo.save(organization);
			}			 
			 
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return ret;
	}

	public Organization updateOrganization(Organization organization) {
		try {
			findOne(organization.getId());
			log.info("Organization is updated" + organization);
			
			return organizationRepo.save(organization);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("organization_id not found!" , e);
			return null;
		}
	}

//	public void deleteOrganization(Long id) {
//		if (organizationRepo.existsById(id)) {
//			organizationRepo.deleteById(id);
//			System.out.println("deleted organization_id: " + id);
//		} else {
//			System.out.println("deleting error: organization with ID: " + id + " not found.");
//		}
//	}
}
