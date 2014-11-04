/**
 * 
 */
package com.ivory.ivory.models;

import java.util.Date;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
@Table(name="doctors")
public class Doctor implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column
	private int id;
	private String fname;
	private String lname;
	private String address;
	private String email;
	@Column
	@Temporal(TemporalType.DATE)
	private Date dob;
	private String gender;
	private String phone;
	private String mobile;

	public Doctor() {
	}

	public Doctor(String fname, String lname, String email, String address, Date dob, String gender, String phone, String mobile) {
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.address = address;
		this.dob = dob;
		this.gender = gender;
		this.phone = phone;
		this.mobile = mobile;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String first_name) {
		this.fname = first_name;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String last_name) {
		this.lname = last_name;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	public Date getDob() {		
		return this.dob;
	}

	public void setDob(Date dob) {		
		this.dob = dob;
	}
	
	public Character getGender() {
		return gender.charAt(0);
	}

	public void setGender(Character gender) {
		this.gender = gender.toString();
	}
	
	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String _phone) {
		this.phone = _phone;
	}
	
	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String _mobile) {
		this.mobile = _mobile;
	}
	
}