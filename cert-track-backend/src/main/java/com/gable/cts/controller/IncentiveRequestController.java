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

import com.gable.cts.model.IncentiveRequest;
import com.gable.cts.service.IncentiveRequestService;

@CrossOrigin
@RestController
@RequestMapping(path="/incentive-request")
public class IncentiveRequestController {

	@Autowired
	IncentiveRequestService incenReqServ;

	@GetMapping("/")
	public List<IncentiveRequest> findAll() {
		return incenReqServ.findAll();
	}

	@GetMapping("/{id}")
	public IncentiveRequest findOne(@PathVariable Long id) {
		return incenReqServ.findOne(id);
	}

	@PostMapping("/")
	public IncentiveRequest addIncentiveRequest(@RequestBody IncentiveRequest incenReq) {
		return incenReqServ.addIncentiveRequest(incenReq);
	}

	@PutMapping("/{id}")
	public IncentiveRequest updateIncentiveRequest(@RequestBody IncentiveRequest incenReq, @PathVariable Long id) {
		return incenReqServ.updateIncentiveRequest(incenReq);
	}
}
