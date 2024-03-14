package com.gable.cts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gable.cts.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long>{

}
