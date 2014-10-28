package com.ivory.ivory.models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="treatmentplan")
public class TreatmentPlan implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column
	private int id;
	private String name;
	
	@ManyToOne
	@JoinColumn(name = "patientId")
	@JsonIgnore(true)
	private Patient patient;
	
	@Temporal(TemporalType.DATE)
	private Date date;
		
	public int getId(){
		return this.id;
	}
	
	public void setId(int _val){
		this.id = _val;
	}
	
	public String getName(){
		return this.name;
	}
	
	public void setName(String _val){
		this.name = _val;
	}
	
	public Date getDate(){
		return this.date;
	}
	
	public void setDate(Date _val){
		this.date = _val;
	}
	
	public void setPatient(Patient patient){
		this.patient = patient;
	}
	
	public Patient getPatient(){
		return this.patient;
	}
	
	/*@OneToMany(fetch = FetchType.LAZY, mappedBy="tp")
	public List<TreatmentDetails> getTreatmentDetails(){
		return null;
	}*/
	
	
	
}
