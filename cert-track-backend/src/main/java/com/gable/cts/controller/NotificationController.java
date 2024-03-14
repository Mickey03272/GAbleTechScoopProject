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

import com.gable.cts.model.Notification;
import com.gable.cts.service.NotificationService;

@CrossOrigin
@RestController
@RequestMapping(path = "/notification")
public class NotificationController {

	@Autowired
	NotificationService service;

	@GetMapping("/")
    public List<Notification> findAll() {
        return service.findAll();
    }

	@GetMapping("/{id}")
	public Notification findOne(@PathVariable Long id) {
		return service.findOne(id);
	}

	@PostMapping("/")
	public Notification addNotification(@RequestBody Notification noti) {
		System.out.println(noti);
		return service.addNotification(noti);
	}

	@PutMapping("/{id}")
	public Notification updateNotification(@RequestBody Notification noti, @PathVariable Long id) {
		System.out.println(noti);
		return service.updateNotification(noti);
	}

//	@DeleteMapping("/{id}")
//	void deleteNotification(@PathVariable Long id) {
//		service.deleteNotification(id);
//	}
}
