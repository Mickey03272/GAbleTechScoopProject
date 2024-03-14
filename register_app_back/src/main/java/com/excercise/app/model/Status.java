package com.excercise.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Statuses")
public class Status {

    @Id
    @Column(name = "STATUS_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "SCORE", nullable = true)
    private Double score;

    @Column(name = "USER_STATUS", nullable = true)
    private UserStatus userStatus;

    // Getters and setters

    public Long getId() { return id; }

	public void setId(Long id) { this.id = id; }	
    
	public Double getScore() { return score; }

	public void setScore(Double score) { this.score = score; }

	public UserStatus getUserStatus() { return userStatus; }

	public void setUserStatus(UserStatus userStatus) {
		this.userStatus = userStatus;
	}


	public enum UserStatus {
	    Apply_Success,
	    Pass_The_Test,
	    Pass_The_Interview,
	    Pass_All_Application_Process
	}

    @Override
	public String toString() {
		return "User [id=" + id + ", score=" + score + 
				", userStatus=" + userStatus + "]";
	}
}
