package com.ivory.ivory.models;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="treatmentplan")

public class TreatmentPlan implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id;
	private String name;
	private Patient patient;
	private Date date;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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
	
	public Patient getPatient(){
		return this.patient;
	}
	
	public void setPatient(Patient _val){
		this.patient = _val;
	}
	
	public Date getDate(){
		return this.date;
	}
	
	public void setDate(Date _val){
		this.date = _val;
	}
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy="tp")
	public List<TreatmentDetails> getTreatmentDetails(){
		return null;
	}
	
	
	
}
