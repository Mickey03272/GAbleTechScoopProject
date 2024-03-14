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

import com.gable.cts.model.Organization;
import com.gable.cts.service.OrganizationService;

@RestController
@RequestMapping("/organization")
public class OrganizationController {
	
	@Autowired
	private OrganizationService organizationService;

	@GetMapping("/")
	public List<Organization> findAllOrganizations() {
		return organizationService.findAll();
	}

	@GetMapping("/{id}")
	public Organization findOneOrganization(@PathVariable Long id) {
		return organizationService.findOne(id);
	}

	@PostMapping("/")
	public Organization addOrganization(@RequestBody Organization organization) {
		System.out.println("Received request to add organization: " + organization);
		return organizationService.addOrganization(organization);
	}

	// @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	@PutMapping("/{id}")
	public Organization updateOrganization(@RequestBody Organization organization, @PathVariable Long id) {
		return organizationService.updateOrganization(organization);
	}

//	@DeleteMapping("/{id}")
//	void deleteOrganization(@PathVariable Long id) {
//		organizationService.deleteOrganization(id);
//	}
}
