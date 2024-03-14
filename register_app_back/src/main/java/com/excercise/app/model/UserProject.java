package com.excercise.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "User_Projects")
public class UserProject {

    @Id
    @Column(name = "USER_PROJECT_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "email"
    , referencedColumnName = "EMAIL"
    )
    private User user;

    @ManyToOne
    @JoinColumn(name = "PROJECT_ID")
    Project project;
    
    @OneToOne
    @JoinColumn(name = "STATUS_ID")
    Status status;

    // Constructors

//    public UserProject(User user, Project project) {
//    	super();
//    	this.user = user;
//    	this.project = project;
//    }

    // Getters and setters

    public Long getId() { return id; }


	public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public Project getProject() { return project; }

    public void setProject(Project project) { this.project = project; }

	public Status getStatus() { return status; }

	public void setStatus(Status status) { this.status = status; }
    
    @Override
	public String toString() {
		return "User [id=" + id + ", user" + user + 
				", project=" + project + ", status="
				+ status  + "]";
	}
}
