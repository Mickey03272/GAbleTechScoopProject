/*PLEASE DO NOT EDIT THIS CODE*/
/*This code was generated using the UMPLE 1.31.1.5860.78bb27cc6 modeling language!*/

package com.gable.cts.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

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
@Table(name = "incentive_request")
public class IncentiveRequest {
	public static final Integer STATUS_CREATE=0;
	public static final Integer STATUS_APPROVE=1;
	public static final Integer STATUS_REJECT=2;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "year")
	private Integer year;
	
	@Column(name = "month")
	private Integer month;
	
	private Integer status;

	private LocalDate createDate;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "request",cascade = CascadeType.ALL)
	@JsonIgnoreProperties("request")
	private List<Incentive> incentives;


}