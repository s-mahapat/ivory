package com.ivory.ivory.models;

import java.io.Serializable;
import javax.persistence.*;

/**
 * Entity implementation class for Entity: TreatmentDetails
 *
 */
@Entity
@Table(name="treatmentdetails")

public class TreatmentDetails implements Serializable {

	
	private static final long serialVersionUID = 1L;
	private long id;
	//@ManyToOne(fetch = FetchType.LAZY)
	//private TreatmentPlan tp;

	public TreatmentDetails() {
		super();
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	/*public TreatmentPlan getTreatmentplan(){
		return this.tp;
	}
	
	public void setTreatmentplan(TreatmentPlan tp){
		this.tp = tp;
	}*/
   
}
