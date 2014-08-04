package com.ivory.ivory.rest;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ivory.ivory.beans.Patient;
import com.ivory.ivory.ManageMedicalHistory;
import com.ivory.ivory.ManagePatient;
import com.ivory.ivory.beans.MedicalHistoryQuestion;


@RestController
@RequestMapping("/rest/patient")
public class PatientRestController {

	@RequestMapping(value = "/medical_history_questions", method = RequestMethod.GET)
	public List<MedicalHistoryQuestion> GetMedicalHistoryQuestions(){
		ManageMedicalHistory medicalHistory = new ManageMedicalHistory();
		List<MedicalHistoryQuestion> questions = medicalHistory.listQuestions();
		return questions;
		
	}
	
	@RequestMapping(value = "/{patientid}", method = RequestMethod.GET)
	public Patient GetPatient(@PathVariable int patientid){
		ManagePatient mp = new ManagePatient();
		Patient patient = mp.getPatientDetails(patientid);
		return patient;		
	}
}
