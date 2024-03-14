package com.gable.cts.model;
import java.util.List;

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
@Table(name = "certificate")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class , property = "id")
public class Certificate
{

	public static final Integer STATUS_CREATE = 0;
	public static final Integer STATUS_CONFIRM = 1;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;
  
  @Column(name = "name", unique = true)
  private String name;
  
  @Column(name = "status")
  private Integer status = STATUS_CREATE;
  
  @Column(name = "logo")
  private String logo;
  
  @Column(name = "is_paid")
  private Boolean isPaid = false;
  
  @Column(name = "is_official")
  private Boolean isOfficial = false;
  
  @Column(name = "is_active")
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
  @Column(name = "incentive_type")
  private EIncentiveType incentiveType;
  
  @Column(name = "proposed")
  private Double proposed;
  
  @Column(name = "note")
  private String note;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "cert",cascade = CascadeType.ALL)
  @JsonIgnoreProperties("cert")
  private List<OwnCert> ownCerts;

  @ManyToOne
  @JoinColumn(name = "issuer_id")
  @JsonIgnoreProperties("certificates")
  private Issuer issuer;
  
  @ManyToOne
  @JoinColumn(name = "vendor_id" )
  @JsonIgnoreProperties("requireCert")
  private Vendor vendor;
}