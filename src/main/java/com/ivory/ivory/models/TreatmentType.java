package com.ivory.ivory.models;

import java.io.Serializable;

import javax.persistence.*;

/**
 * Entity implementation class for Entity: TreatmentType
 *
 */
@Entity
@Table(name="treatmenttypes")

public class TreatmentType implements Serializable {

	
	private static final long serialVersionUID = 1L;
	private long id;
	private String name;

	public TreatmentType() {
		super();
	}
	
	@Id
	@GeneratedValue
	public long getId(){
		return this.id;
	}
	
	public void setId(long id){
		this.id = id;
	}
	
	public String getName(){
		return this.name;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	
   
}
