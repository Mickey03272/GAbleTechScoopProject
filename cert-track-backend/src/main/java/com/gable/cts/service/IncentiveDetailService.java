package com.gable.cts.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.cts.model.IncentiveDetail;
import com.gable.cts.repository.IncentiveDetailRepository;

@Service
public class IncentiveDetailService {

	@Autowired
	IncentiveDetailRepository incenDetRepo;

	public List<IncentiveDetail> findAll() {
		return incenDetRepo.findAll();
	}

	public IncentiveDetail findOne(Long id) {
		return incenDetRepo.findById(id).get();
	}

	public IncentiveDetail addIncenDetail(IncentiveDetail incenDet) {
		IncentiveDetail ret = null;
		try {
			if (incenDet.getId() == null) {
				ret = incenDetRepo.save(incenDet);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return ret;
	}
	
	public IncentiveDetail updateIncenDetail(IncentiveDetail incenDet) {
		IncentiveDetail ret = null;
		try {
			findOne(incenDet.getId());
			ret = incenDetRepo.save(incenDet);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}
		return ret;
	}
}
