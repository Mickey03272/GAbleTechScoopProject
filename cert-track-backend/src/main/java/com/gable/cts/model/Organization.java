package com.gable.cts.model;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "bu", "divn","dept","sect" }) })
public class Organization
{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;
  
  @Column(name = "bu")
  private String bu;
  
  @Column(name = "divn")
  private String divn;
  
  @Column(name = "dept")
  private String dept;
  
  @Column(name = "sect")
  private String sect;


  @OneToMany(mappedBy = "organization")
  @JsonManagedReference
  private List<Employee> staffs;
  
  @ManyToOne
  @JoinColumn(name = "manager_id")
  private Employee manager;

public String getFullName() {
	return String.format("%s/%s/%s/%s", bu, divn, dept, sect);
}
  
}