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

import com.excercise.app.model.UserProject;
import com.excercise.app.service.UserProjectService;

@RestController
@RequestMapping(path = "/userproject")
@CrossOrigin
public class UserProjectController {
	
	private final UserProjectService userProjectService;
	
	@Autowired
    public UserProjectController(UserProjectService UserProjectService) {
        this.userProjectService = UserProjectService;
    }
	
	@GetMapping
    public List<UserProject> findAllUserProjects() {
        return userProjectService.findAllUserProjects();
    }


    @GetMapping("/{id}")
    public UserProject findOneUserProject (@PathVariable Long id){
        UserProject e = userProjectService.findOneUserProject(id);
        return userProjectService.findOneUserProject(id);
    }

    @PostMapping("/")
    public UserProject addUserProject (@RequestBody UserProject UserProject){
        System.out.println(UserProject);
        return userProjectService.addUserProject(UserProject);
    }

    //	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @PutMapping("/{id}")
    public UserProject updateUserProject (@RequestBody UserProject UserProject, @PathVariable Long id){
        System.out.println(UserProject);
        return userProjectService.updateUserProject(UserProject);
    }
    
	@DeleteMapping("/{id}")
	void deleteUserProject(@PathVariable Long id) {
		userProjectService.deleteUserProject(id);
	}
}
