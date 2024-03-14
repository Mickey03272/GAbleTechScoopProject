package com.excercise.app.controller;

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

import com.excercise.app.model.Status;
import com.excercise.app.service.StatusService;

@RestController
@RequestMapping(path = "/status")
@CrossOrigin
public class StatusController {
	private final StatusService statusService;

	@Autowired
	public StatusController(StatusService StatusService) {
		this.statusService = StatusService;
	}

	@GetMapping
	public List<Status> findAllStatuss() {
		return statusService.findAllStatuss();
	}

	@GetMapping("/{id}")
	public Status findOneStatus(@PathVariable Long id) {
		return statusService.findOneStatus(id);
	}

	@PostMapping("/")
	public Status addStatus(@RequestBody Status Status) {
		System.out.println(Status);
		return statusService.addStatus(Status);
	}

	// @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	@PutMapping("/{id}")
	public Status updateStatus(@RequestBody Status Status, @PathVariable Long id) {
		System.out.println(Status);
		return statusService.updateStatus(Status);
	}

	@DeleteMapping("/{id}")
	void deleteStatus(@PathVariable Long id) {
		statusService.deleteStatus(id);
	}
}
