package com.gable.cts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gable.cts.model.Organization;

@Repository // is this annotation necessary?
public interface OrganizationRepository extends JpaRepository<Organization, Long>{

}
