package com.gable.cts.model;
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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "employee")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class , property = "id")
public class Employee
{

  @Id
  @Column(name = "id" )
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(name = "first_name" ,nullable = false	)
  private String firstName;
  
  @Column(name = "last_name" ,nullable = false	)
  private String lastName;
  
  @Column(name = "employee_id" ,nullable = false )
  private String employeeID;
  
  @Column(name = "import_date" ,nullable = false )
  private LocalDate importDate;
  
  @OneToOne()
  @JoinColumn(name = "user_id")
  private User user;
  
  //Employee Associations

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "employee",cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<OwnCert> ownList;
 
 
  @ManyToOne()
  @JoinColumn(name = "organization_id")
  @JsonBackReference
  private Organization organization;
  
  @Transient
  private String organizationFull = "SMT/AAPP/DB/PDD/DOO";
  
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "employee",cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<Notification> notifications;

  public String getOrganizationFull() {
	return organization.getFullName();
	  
  }
  
  public Long getOrganizationId() {
	  return organization.getId();
  }

}