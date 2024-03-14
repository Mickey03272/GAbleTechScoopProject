package com.gable.cts.exception;

public class ResourceNotFoundException extends RuntimeException{


	private Object id;

	public ResourceNotFoundException(String message, Object id ) {
		super(message);
		this.id = id;
		
	}
	
	

}
