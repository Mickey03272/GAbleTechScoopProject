package com.gable.cts.config;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.gable.cts.exception.ResourceNotFoundException;
import com.gable.cts.payload.ErrorMessage;

@ControllerAdvice
@ResponseBody
public class ExceptionHandlerConfig extends ResponseEntityExceptionHandler{
	@ExceptionHandler(ResourceNotFoundException.class)
	@ResponseStatus(value= HttpStatus.NOT_FOUND)
	public ErrorMessage handleIssueTracking(ResourceNotFoundException ne ,WebRequest request) {
		ErrorMessage message = new ErrorMessage(HttpStatus.NOT_FOUND);		
		message.setMessage(ne.getMessage());
		message.setPath(request.getDescription(false));
				
		return message;
	}	
}
