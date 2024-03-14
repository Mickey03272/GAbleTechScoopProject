package com.gable.cts.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gable.cts.model.Certificate;
import com.gable.cts.service.CertificateService;

@CrossOrigin
@RestController
@RequestMapping(path = "/certificate")
public class CertificateController {

	@Autowired
	private CertificateService service;

	@Autowired
	private ResourceLoader resourceLoader;

	@GetMapping(path = "/")
	public List<Certificate> findAll() {
		return service.findAll();
	}

	@GetMapping(path = "/{id}")
	public Certificate findOne(@PathVariable Long id) {
		return service.findOne(id);
	}

	@PostMapping(path = "/")
	public Certificate addCerticate(@RequestBody Certificate certificate) {
		if (certificate.getLogo() != null) {
			byte[] byteArray = service.jsonStringToByteArray(certificate.getLogo());
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
			String timestamp = dateFormat.format(new Date());
			String fileName = "certificate" + "_" + timestamp + ".jpg";// can change
			String fileUrl = saveFile(byteArray, fileName);
			certificate.setLogo(fileName);
		}
		return service.addCertificate(certificate);
	}

	public String saveFile(byte[] byteArray, String fileName) {
		try {
			FileOutputStream fos = new FileOutputStream("src/main/resources/static/logo/"+fileName);
			fos.write(byteArray);
			fos.close();

			Resource resource = resourceLoader.getResource("file:" + fileName);
			return resource.getURL().toString();
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	@PutMapping(path = "/{id}")
	public Certificate updateCertificate(@RequestBody Certificate certificate) {
		if (certificate.getLogo() != null && certificate.getLogo().contains("[")) {
			byte[] byteArray = service.jsonStringToByteArray(certificate.getLogo());
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
			String timestamp = dateFormat.format(new Date());
			String fileName = "certificate" + "_" + timestamp + ".jpg";// can change
			String fileUrl = saveFile(byteArray, fileName);
			certificate.setLogo(fileName);
		}
		return service.updateCertificate(certificate);
	}

	@GetMapping(path = "/name/{certName}")
	public Certificate findByCertName(@PathVariable String certName) {
		return service.findByCertName(certName);
	}

	@GetMapping("/search")
	public List<Certificate> searchCertificatesByPartialName(@RequestParam String partialName) {
		return service.findByPartialCertName(partialName);
	}
	
	@PutMapping("/update-is-active/{id}")
	public Certificate updateCertIsActive(@PathVariable Long id) {
		return service.updateCertIsActive(id);
	}

}
