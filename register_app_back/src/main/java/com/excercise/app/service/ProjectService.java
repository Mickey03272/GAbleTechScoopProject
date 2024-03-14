package com.excercise.app.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excercise.app.model.Project;
import com.excercise.app.repository.ProjectRepository;

@Service
public class ProjectService {
	@Autowired
	private ProjectRepository projectRepo;
	
	public List<Project> findAllProjects() {
		return projectRepo.findAll();
	}
	
	public Project findOneProject(Long id) {
		return projectRepo.findById(id).get();
	}
	
	public Project addProject(Project project) {
//		Project ret = null;
//		try {
//			findOneProject(project.getId());
//		} catch (NoSuchElementException e) {
//			ret = projectRepo.save(project);
//		}
//		return ret;
		return projectRepo.save(project);
	}
	
	public Project updateProject(Project project) {
		Project ret = null;
		try {
			findOneProject(project.getId());
			ret = projectRepo.save(project);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
			System.out.println("Project_ID not found!");
		}
		return ret;
	}
	
	public void deleteProject(Long id) {
		if (projectRepo.existsById(id)) {
	        projectRepo.deleteById(id);
	    } else {
	        System.out.println("Project with ID: " + id + " not found.");
	    }
	}
}
