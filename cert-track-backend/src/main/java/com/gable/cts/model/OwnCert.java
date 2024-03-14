/*PLEASE DO NOT EDIT THIS CODE*/
/*This code was generated using the UMPLE 1.31.1.5860.78bb27cc6 modeling language!*/

package com.gable.cts.model;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OwnCert {

	public static final Integer STATUS_CREATE = 0;
	public static final Integer STATUS_APPROVE = 1;
	public static final Integer STATUS_REJECT = -1;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "expire_date")
	private LocalDate expireDate;

	@Column(name = "is_active")
	private Boolean isActive;

	@Column(name = "issue_date")
	private LocalDate issueDate;

	@Column(name = "create_date")
	private LocalDate createDate;

	@Column(name = "picture")
	private String picture;

	@Column(name = "status")
	private Integer status = STATUS_CREATE;

	@ManyToOne
	@JoinColumn(name = "certificate_id")
	@JsonIgnoreProperties("ownCerts")
	private Certificate cert;

	@ManyToOne
	@JoinColumn(name = "employee_id")
	@JsonIgnoreProperties("ownList")
	private Employee employee;

	@OneToMany(mappedBy = "ownCert")
	@JsonIgnoreProperties("ownCert")
	private List<IncentiveDetail> incentiveDetails;

//	public String getOrganizationFull() {
//		return this.employee.getOrganizationFull();
//	}
}