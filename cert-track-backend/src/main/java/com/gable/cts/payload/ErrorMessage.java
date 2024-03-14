package com.gable.cts.payload;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class ErrorMessage {
	private LocalDateTime timestamp;
	private int status;
	private String error;
	private String message;
	private String path;

	public ErrorMessage() {
		this.timestamp = LocalDateTime.now();
	}
	
	public ErrorMessage(HttpStatus status) {
		this.status = status.value();
		this.error = status.name();
		this.timestamp = LocalDateTime.now();
	}
}