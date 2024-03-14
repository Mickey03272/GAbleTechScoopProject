package com.gable.cts.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.gable.cts.model.ERole;
import com.gable.cts.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Role findByName(ERole role);
}
