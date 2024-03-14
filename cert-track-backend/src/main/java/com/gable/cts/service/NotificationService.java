package com.gable.cts.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.cts.repository.NotificationRepository;
import com.gable.cts.model.Notification;

@Service
public class NotificationService {
	
	@Autowired
	NotificationRepository repo;

	public List<Notification> findAll() {

		return repo.findAll();
	}

	public Notification findOne(Long id) {

		return repo.findById(id).get();

	}

	public Notification addNotification(Notification noti) {
		Notification ret = null;
		try {
			if (noti.getId() == null) {
				ret = repo.save(noti);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return  ret;
	}

	public Notification updateNotification(Notification noti) {
		Notification ret = null;
		try {
			findOne(noti.getId());
			ret = repo.save(noti);
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}
		return ret;
	}
	
//	public void deleteNotification(Long id) {
//		if (repo.existsById(id)) {
//	        repo.deleteById(id);
//	    } else {
//	        System.out.println("Notification with ID: " + id + " not found.");
//	    }
//	}

}
