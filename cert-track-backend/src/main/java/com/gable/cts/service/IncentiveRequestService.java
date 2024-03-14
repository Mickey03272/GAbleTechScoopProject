package com.gable.cts.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.cts.model.IncentiveRequest;
import com.gable.cts.repository.IncentiveRequestRepository;

@Service
public class IncentiveRequestService {

	@Autowired
	IncentiveRequestRepository incenReqRepo;
	
	public List<IncentiveRequest> findAll() {
		return incenReqRepo.findAll();
	}
	
	public IncentiveRequest findOne(Long id) {
		return incenReqRepo.findById(id).get();
	}
	
	public IncentiveRequest addIncentiveRequest(IncentiveRequest incenReq) {
		
		IncentiveRequest ret = null;
		try {
			if(incenReq.getId() == null) {
				ret =  incenReqRepo.save(incenReq);
			}
			
		}catch( Exception e) {
			e.printStackTrace();
		}
		return ret;
	}
	
	public IncentiveRequest updateIncentiveRequest(IncentiveRequest incenReq) {
		IncentiveRequest ret = null;
		try {
			findOne(incenReq.getId());
			ret = incenReqRepo.save(incenReq);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}
		return ret;
	}
}
