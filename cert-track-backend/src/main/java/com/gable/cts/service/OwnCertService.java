package com.gable.cts.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gable.cts.model.Certificate;
import com.gable.cts.model.Employee;
import com.gable.cts.model.OwnCert;
import com.gable.cts.repository.CertificateRepository;
import com.gable.cts.repository.EmployeeRepository;
import com.gable.cts.repository.OwnCertRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class OwnCertService {
	@Autowired
	private OwnCertRepository ownCertRepo;
	
	@Autowired
	private CertificateRepository certificateRepo;
	
	@Autowired
	private EmployeeRepository employeeRepo;
	
//	private final EmailService emailservice;
//
//    public OwnCertService(EmailService emailservice) {
//   	 this.emailservice = emailservice;
//    }

	public List<OwnCert> findAllOwnCerts() {
		return ownCertRepo.findAll();
	}

	public OwnCert findOneOwnCert(Long id) {
		return ownCertRepo.findById(id).orElse(null);
	}

	public OwnCert addOwnCert(OwnCert ownCert) {
		OwnCert newOwncert = null;
		try {
			if (ownCert.getId() == null) {
				ownCert.setCreateDate(LocalDate.now());
				ownCert.setStatus(OwnCert.STATUS_CREATE);
				if (ownCert.getExpireDate().isAfter(ownCert.getCreateDate())) {
					ownCert.setIsActive(true);
				}else {
					ownCert.setIsActive(false);
				}
				newOwncert =  ownCertRepo.save(ownCert);
//				emailservice.sendMail("peppermint2574@gmail.com", "Subject", "This is body");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return newOwncert;
	}

	public OwnCert updateOwnCert(OwnCert ownCert) {
		try {
			findOneOwnCert(ownCert.getId());
			log.info("OwnCert is updated" + ownCert);
			return ownCertRepo.save(ownCert);
		} catch (Exception e) {
			e.printStackTrace();			
			log.error("ownCert_id not found!" ,e);
			return null;
		}
	}

//	public void deleteOwnCert(Long id) {
//		if (ownCertRepo.existsById(id)) {
//			ownCertRepo.deleteById(id);
//			System.out.println("deleted ownCert_id: " + id);
//		} else {
//			System.out.println("deleting error: ownCert with ID: " + id + " not found.");
//		}
//	}


	public OwnCert addOwnCertUser(OwnCert ownCert, Long userid) {
		try {
			String ownCert_Name = ownCert.getCert().getName();
			Certificate ownCert_NameCert = certificateRepo.findByName(ownCert_Name);
			Employee ownCert_Employee = employeeRepo.findById(userid).get();
			if(ownCert.getExpireDate().isBefore(ownCert.getCreateDate())) {
				ownCert.setIsActive(true);
			}
			else if(ownCert.getExpireDate().isAfter(ownCert.getCreateDate())) {
				ownCert.setIsActive(false);
			}
			else {
				System.out.println("Please check your Date is not null");
			}
			ownCert.setCert(ownCert_NameCert);
			ownCert.setEmployee(ownCert_Employee);
			ownCert.setStatus(OwnCert.STATUS_CREATE);
			System.out.println("Your Certificate has been add");
			return ownCertRepo.save(ownCert);
		}catch (NoSuchElementException e) {
			System.out.println("Your certificate are not in current field");
			return null;
		}
	}
	//Get Employee by certificate
	public List<Employee> empByOwnCert(Long id) {
		return ownCertRepo.empByOwnCert(id);
	}
	
//    public List<OwnCert> getOwnCertsByYearMonth(Integer year, Integer month) {
//        return ownCertRepo.findAllByCreateDateYearMonth(year, month);
//    }
    
    public List<OwnCert> getOwnCertsByManagerId(Long managerId) {
    	return ownCertRepo.findAllByManager(managerId);
    }
    
//    public OwnCert getOwnCertByOwnCertName(String ownCertName, String userName) {
//    	return ownCertRepo.findByOwnCertName(ownCertName, userName);
//    }
	
	public OwnCert updateOwnCertStatus(Long ownCertId, Integer status) {
		try {
	        Optional<OwnCert> optionalOwnCert = ownCertRepo.findById(ownCertId);
	        if (optionalOwnCert.isPresent()) {
	            OwnCert updatedOwnCert = optionalOwnCert.get();
	            updatedOwnCert.setStatus(status);
	            return ownCertRepo.save(updatedOwnCert);
	        }  else {
	            throw new NoSuchElementException("Own certificate with ID " + ownCertId + " not found");
	        }
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public byte[] jsonStringToByteArray(String jsonString) {
        jsonString = jsonString.substring(1, jsonString.length() - 1);

        String[] parts = jsonString.split(",");
        List<Byte> byteList = new ArrayList<>();
        for (String part : parts) {
        	int intValue = Integer.parseInt(part.trim());
        	byteList.add((byte) intValue);
        }

        byte[] byteArray = new byte[byteList.size()];
        for (int i = 0; i < byteList.size(); i++) {
            byteArray[i] = byteList.get(i);
        }

        return byteArray;
    }
}
