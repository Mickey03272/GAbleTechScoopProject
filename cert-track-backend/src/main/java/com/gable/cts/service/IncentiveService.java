package com.gable.cts.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.cts.model.Incentive;
import com.gable.cts.repository.IncentiveRepository;

@Service
public class IncentiveService {

	@Autowired
	IncentiveRepository incenRepo;

	public List<Incentive> findAll() {
		return incenRepo.findAll();
	}

	public Incentive findOne(Long id) {
		return incenRepo.findById(id).get();
	}

	public Incentive addIncentive(Incentive incen) {
		Incentive ret = null;
		
		try {
			if (incen.getId() == null) {
				ret = incenRepo.save(incen);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return ret;
	}
	
	public Incentive updateIncentive(Incentive incen) {
		Incentive ret = null;
		try {
			findOne(incen.getId());
			ret = incenRepo.save(incen);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}
		return ret;
	}
}
