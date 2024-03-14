package com.gable.cts.model;
import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "certificate")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class , property = "id")
public class Certificate
{

	public static final Integer STATUS_CREATE = 0;
	public static final Integer STATUS_CONFIRM = 1;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;
  
  @Column(name = "name" ,nullable = false)
  private String name;
  
  @Column(name = "status" , nullable = false)
  private Integer status = STATUS_CREATE;
  
  @Column(name = "logo")
  private String logo;
  
  @Column(name = "is_paid" ,nullable = false)
  private Boolean isPaid = false;
  
  @Column(name = "is_official" ,nullable = false)
  private Boolean isOfficial = false;
  
  @Column(name = "is_active" , nullable = false)
  private Boolean isActive = false;
  
  @Enumerated(EnumType.STRING)
  @Column(name = "level")
  private ECertLevel level = ECertLevel.Foundation;
  
  @Enumerated(EnumType.STRING)
  @Column(name = "demand"  )
  private EDemandLevel demand = EDemandLevel.Low;
  
  @Enumerated(EnumType.STRING)
  @Column(name = "cert_demand")
  private ECertDemand certDemand;
  
  @Enumerated(EnumType.STRING)
  @Column(name = "incentive_type"  )
  private EIncentiveType incentiveType;
  
  @Column(name = "proposed"  )
  private Double proposed;
  
  @Column(name = "note")
  private String note;

//  @OneToMany(fetch = FetchType.LAZY, mappedBy = "cert",cascade = CascadeType.ALL)
//  private List<OwnCert> ownCerts;

  
  @ManyToOne
  @JoinColumn(name = "issuer_id")
  private Issuer issuer;
  
  
  @ManyToOne
  @JoinColumn(name = "vendor_id" )
  private Vendor vendor;

  
}