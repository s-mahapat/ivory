/**
 * 
 */
package com.ivory.ivory.models;

import java.io.Serializable;
import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="appointments")
public class Appointment implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "patientId")
	@JsonIgnore(true)
	private Patient patient;
	
	@ManyToOne
	@JoinColumn(name = "doctorId")
	//@JsonIgnore(true)
	private Doctor doctor;
	
	@Column
	private Timestamp appointmentdate;

	private String appointmentreason;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	
	public Doctor getDoctor(){
		return this.doctor;
	}
	
	public void setDoctor(Doctor doctor){
		this.doctor = doctor;
	}

	public Timestamp getAppointmentdate() {
		return appointmentdate;
	}

	public void setAppointmentdate(Timestamp appointmentdate) {
		this.appointmentdate = appointmentdate;
	}

	public String getAppointmentreason() {
		return appointmentreason;
	}

	public void setAppointmentreason(String appointmentreason) {
		this.appointmentreason = appointmentreason;
	}

}
