/**
 * 
 */
package com.ivory.ivory.beans;

import java.sql.Time;
import java.util.Date;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.fasterxml.jackson.annotation.JsonIgnore;


public class Appointment {
	private int id;
	private int patientid;
	private Date appointmentdate;
	//@JsonIgnore(true)
	//private Time appointmenttime;
	private String appointmentreason;
	private String appointmentremarks;

	/*public Appointment(int patientid, Date appointmentdate,
			Date appointmenttime, String appointmentreason,
			String appointmentremarks) {
		this.patientid = patientid;
		this.appointmentdate = appointmentdate;
		this.appointmenttime = appointmentdate;
		this.appointmentreason = appointmentreason;
		this.appointmentremarks = appointmentremarks;
	}*/

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPatientid() {
		return patientid;
	}

	public void setPatientid(int patient_id) {
		this.patientid = patient_id;
	}

	public Date getAppointmentdate() {
		return appointmentdate;
	}

	public void setAppointmentdate(Date appointmentdate) {
		this.appointmentdate = appointmentdate;
	}

	/*public Time getAppointmenttime() {
		return appointmenttime;
	}

	public void setAppointmenttime(Time appointmenttime) {
		this.appointmenttime = appointmenttime;
	}*/

	public String getAppointmentreason() {
		return appointmentreason;
	}

	public void setAppointmentreason(String appointmentreason) {
		this.appointmentreason = appointmentreason;
	}

	public String getAppointmentremarks() {
		return this.appointmentremarks;
	}

	public void setAppointmentremarks(String appointmentremarks) {
		this.appointmentremarks = appointmentremarks;
	}
}
