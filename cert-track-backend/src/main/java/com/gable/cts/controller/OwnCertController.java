package com.gable.cts.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gable.cts.model.Employee;
import com.gable.cts.model.OwnCert;
import com.gable.cts.service.OwnCertService;

@CrossOrigin
@RestController
@RequestMapping("/own-cert")
public class OwnCertController {
	
	@Autowired
	private OwnCertService ownCertService;
	
	@Autowired
	private ResourceLoader resourceLoader;

	@GetMapping("/")
	public List<OwnCert> findAllOwnCerts() {
		return ownCertService.findAllOwnCerts();
	}

	@GetMapping("/{id}")
	public OwnCert findOneOwnCert(@PathVariable Long id) {
		return ownCertService.findOneOwnCert(id);
	}

	@PostMapping("/")
	public OwnCert addOwnCert(@RequestBody OwnCert ownCert) {
		System.out.println("Received request to add ownCert: " + ownCert);
		byte[] byteArray = ownCertService.jsonStringToByteArray(ownCert.getPicture());
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        String timestamp = dateFormat.format(new Date());
		String fileName = "certificate"+"_"+timestamp+".jpg";//can change
        String fileUrl = saveFile(byteArray, fileName);
        ownCert.setPicture(fileName);
		return ownCertService.addOwnCert(ownCert);
	}
	
	public String saveFile(byte[] byteArray, String fileName) {
        try {
            FileOutputStream fos = new FileOutputStream("src/main/resources/static/img/"+fileName);
            fos.write(byteArray);
            fos.close();

            Resource resource = resourceLoader.getResource("file:" +fileName);
            return resource.getURL().toString();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
	
	@PostMapping("/addcert/{userid}")
	public OwnCert addOwnCertUser(@RequestBody OwnCert ownCert,@PathVariable Long userid) {
		System.out.println("Received request to add ownCert: " + ownCert);
		return ownCertService.addOwnCertUser(ownCert, userid);
	}

	// @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	@PutMapping("/{id}")
	public OwnCert updateOwnCert(@RequestBody OwnCert ownCert, @PathVariable Long id) {
		return ownCertService.updateOwnCert(ownCert);
	}

//	@DeleteMapping("/{id}")
//	void deleteOwnCert(@PathVariable Long id) {
//		ownCertService.deleteOwnCert(id);
//	}
	
	@GetMapping("/empByOwnCert/{id}")
	public List<Employee> empByOwnCert(@PathVariable Long id) {
		return ownCertService.empByOwnCert(id);
	}
	
//	@GetMapping("/get-all-by-year-month/{year}-{month}")
//	public List<OwnCert> getOwnCertsByYearMonth(@PathVariable Integer year, @PathVariable Integer month) {
//	    return ownCertService.getOwnCertsByYearMonth(year, month);
//	}
	
	@GetMapping("/approve-list/{managerId}")
	public List<OwnCert> getOwnCertsByManagerId(@PathVariable Long managerId) {
		return ownCertService.getOwnCertsByManagerId(managerId);
	}
	
//	@GetMapping("/name/{userName}/{ownCertName}")
//	public OwnCert getOwnCertByOwnCertName(@PathVariable String ownCertName) {
//		return ownCertService.getOwnCertByOwnCertName(ownCertName);
//	}
	
	@PutMapping("/update-status/{id}/{status}")
	public OwnCert updateOwnCertStatus(@PathVariable Long id, @PathVariable Integer status) {
		return ownCertService.updateOwnCertStatus(id, status);
	}
}
