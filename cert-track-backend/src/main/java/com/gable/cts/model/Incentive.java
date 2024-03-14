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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "incentive")
public class Incentive {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name="year")
	private Integer year;
	
	@Column(name="month")
	private Integer month;
	
	@Column(name="total_amount")
	private Double totalAmount;
	
	@Column(name="create_date")
	private LocalDate createDate;
	
	@Column(name="status")
	private Integer status;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "incenreq_id")
	@JsonIgnoreProperties("incentives")
	private IncentiveRequest request;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "incentive",cascade = CascadeType.ALL)
	@JsonIgnoreProperties("incentive")
	private List<IncentiveDetail> incentiveDetails;

}