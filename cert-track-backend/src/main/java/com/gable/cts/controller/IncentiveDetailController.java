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

import com.gable.cts.model.IncentiveDetail;
import com.gable.cts.service.IncentiveDetailService;

@RestController
@RequestMapping(path="/incentive-detail")
public class IncentiveDetailController {
	@Autowired
	IncentiveDetailService incenDetServ;

	@GetMapping("/")
	public List<IncentiveDetail> findAll() {
		return incenDetServ.findAll();
	}

	@GetMapping("/{id}")
	public IncentiveDetail findOne(@PathVariable Long id) {
		return incenDetServ.findOne(id);
	}

	@PostMapping("/")
	public IncentiveDetail addIncentiveDetail(@RequestBody IncentiveDetail insenDet) {
		return incenDetServ.addIncenDetail(insenDet);
	}

	@PutMapping("/{id}")
	public IncentiveDetail updateIncentiveDetail(@RequestBody IncentiveDetail insenDet, @PathVariable Long id) {
		return incenDetServ.updateIncenDetail(insenDet);
	}

}
