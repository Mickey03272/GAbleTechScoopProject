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

import com.gable.cts.model.Incentive;
import com.gable.cts.service.IncentiveService;

@CrossOrigin
@RestController
@RequestMapping(path="/incentive")
public class IncentiveController {

	@Autowired
	IncentiveService incenServ;
	
	@GetMapping("/")
	public List<Incentive> findAll() {
		return incenServ.findAll();
	}
	
	@GetMapping("/{id}")
	public Incentive findOne(@PathVariable Long id) {
		return incenServ.findOne(id);
	}
	
	@PostMapping("/")
	public Incentive addIncentive(@RequestBody Incentive incen) {
		return incenServ.addIncentive(incen);
	}
	
	@PutMapping("/{id}")
	public Incentive updateIncentive(@RequestBody Incentive incen, @PathVariable Long id) {
		return incenServ.updateIncentive(incen);
		
	}
}
