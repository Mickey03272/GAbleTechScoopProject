package com.gable.cts.model;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "incentive_detail")
public class IncentiveDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;
	
	@Column(name = "idx", nullable = false)
	private Integer idx;
	
	@Column(name = "amount", nullable = false)
	private Double amount;

	@ManyToOne(optional = false)
	@JoinColumn(name = "own_cert_id", nullable = false)
	private OwnCert cert;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "incentive_id", nullable = false)
	@JsonBackReference
	private Incentive incentive;

}