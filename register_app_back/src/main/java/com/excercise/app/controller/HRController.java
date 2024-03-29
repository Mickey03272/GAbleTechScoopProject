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

import com.excercise.app.model.HR;
import com.excercise.app.service.HRService;

@RestController
@RequestMapping(path = "/hr")
@CrossOrigin
public class HRController {
	private final HRService HRService;
	
	@Autowired
    public HRController(HRService HRService) {
        this.HRService = HRService;
    }
	
	@GetMapping
    public List<HR> findAllHRs() {
        return HRService.findAllHRs();
    }

    @GetMapping("/{id}")
    public HR findOneHR (@PathVariable Long id){
        HR e = HRService.findOneHR(id);
        System.out.println(e.getFirstName());

        return HRService.findOneHR(id);
    }

    @PostMapping("/")
    public HR addHR (@RequestBody HR HR){
        System.out.println(HR);
        return HRService.addHR(HR);
    }

    //	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @PutMapping("/{id}")
    public HR updateHR (@RequestBody HR HR, @PathVariable Long id){
        System.out.println(HR);
        return HRService.updateHR(HR);
    }
    
	@DeleteMapping("/{id}")
	void deleteHR(@PathVariable Long id) {
		HRService.deleteHR(id);
	}
}
