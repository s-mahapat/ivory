/**
 * 
 */
package com.ivory.ivory.models;

/**
 * @author smahapat
 * 
 */
public class MedicalHistory {

	private int patientId;
	private int questionId;
	private String answer;
	private int id;

	public MedicalHistory(int patient_id, int question_id, String ans) {
		this.patientId = patient_id;
		this.questionId = question_id;
		this.answer = ans;
	}
	
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPatientId() {
		return this.patientId;
	}

	public void setPatientId(int id) {
		this.patientId = id;
	}

	public int getQuestionId() {
		return this.questionId;
	}

	public void setQuestionId(int id) {
		this.questionId = id;
	}

	public String getAnswer() {
		return this.answer;
	}

	public void setAnswer(String ans) {
		this.answer = ans;
	}

}
