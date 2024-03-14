package com.gable.cts.model;

import java.time.LocalDate;
import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "incentive")
public class Incentive {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;
	
	@Column(name="year", nullable = false)
	private Integer year;
	
	@Column(name="month", nullable = false)
	private Integer month;
	
	@Column(name="total_amount", nullable = false)
	private Double totalAmount;
	
	@Column(name="create_date", nullable = false)
	private LocalDate createDate;
	
	@Column(name="status", nullable = false)
	private Integer status;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "incenreq_id", nullable = false)
	@JsonBackReference
	private IncentiveRequest request;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "incentive",cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<IncentiveDetail> incentiveDetails;

}