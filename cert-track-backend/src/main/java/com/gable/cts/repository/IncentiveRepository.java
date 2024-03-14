package com.gable.cts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gable.cts.model.Incentive;

@Repository 
public interface IncentiveRepository extends JpaRepository<Incentive, Long> {
                  
}   
