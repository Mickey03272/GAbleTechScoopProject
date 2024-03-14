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

import com.excercise.app.model.Project;
import com.excercise.app.service.ProjectService;

@RestController
@RequestMapping(path = "/project")
@CrossOrigin
//(origins = "http://localhost:5173")
public class ProjectController {

	private final ProjectService projectService;

	@Autowired
	public ProjectController(ProjectService projectService) {
		this.projectService = projectService;
	}

	@GetMapping
	public List<Project> findAllProjects() {
		return projectService.findAllProjects();
	}

	@GetMapping("/{id}")
	public Project findOneProject(@PathVariable Long id) {
		return projectService.findOneProject(id);
	}

	@PostMapping("/")
	public Project addProject(@RequestBody Project project) {
		System.out.println("Received request to add project: " + project);
		return projectService.addProject(project);
	}

	// @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	@PutMapping("/{id}")
	public Project updateProject(@RequestBody Project project, @PathVariable Long id) {
		System.out.println("Project is updated" + project);
		return projectService.updateProject(project);
	}

	@DeleteMapping("/{id}")
	void deleteProject(@PathVariable Long id) {
		projectService.deleteProject(id);
	}
}
