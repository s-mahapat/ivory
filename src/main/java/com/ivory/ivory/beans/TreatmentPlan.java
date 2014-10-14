package com.ivory.ivory.beans;

import java.util.Date;

public class TreatmentPlan {

	private int id;
	private String name;
	private Patient patient;
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
	
	
	
}
