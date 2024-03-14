package com.excercise.app.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "USERS_DATA")
public class User  implements Serializable{

    @Id
    @Column(name = "USER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "FIRST_NAME", length = 20, nullable = false)
    private String firstName;

    @Column(name = "LAST_NAME", length = 20, nullable = false)
    private String lastName;
    
    @Column(name = "EMAIL", unique = true, length = 50, nullable = false)
    private String email;

    @Column(name = "PASSWORD", length = 120, nullable = false)
    private String password;

    @Column(name = "PHONE_NUMBER", length = 20, nullable = false)
    private String phoneNumber;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "EDUCATION", nullable = false)
    private EducationLevel educationLevel;

    @Column(name = "ADDRESS", length = 255, nullable = false)
    private String address;
    
    @Column(name = "IMGURL", length = 255)
    private String projectImage;
    
    // other fields and getters/setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public EducationLevel getEducationLevel() { return educationLevel; }

	public void setEducationLevel(EducationLevel educationLevel) { this.educationLevel = educationLevel; }

	public String getPhoneNumber() { return phoneNumber; }

    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }

    public void setAddress(String address) { this.address = address; }
    
    public String getProjectImage() { return projectImage; }

	public void setProjectImage(String projectImage) { this.projectImage = projectImage; }



	public enum EducationLevel {
        HIGH_SCHOOL,
        BACHELORS_DEGREE,
        MASTERS_DEGREE,
        PHD
    }
    
    @Override
	public String toString() {
		return "User [id=" + id + ", firstName=" + firstName + 
				", lastName=" + lastName + ", email="
				+ email + ", password=" + password + ", phoneNumber=" 
				+ phoneNumber + ", educationLevel=" + educationLevel 
				+ ", address=" + address + "]";
	}
}
