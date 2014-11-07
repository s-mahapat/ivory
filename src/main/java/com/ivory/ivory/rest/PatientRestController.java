package com.ivory.ivory.rest;

import java.util.List;
import java.util.Set;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ivory.ivory.ManageAppointment;
import com.ivory.ivory.ManageMedicalHistory;
import com.ivory.ivory.ManagePatient;
import com.ivory.ivory.models.Appointment;
import com.ivory.ivory.models.MedicalHistoryQuestion;
import com.ivory.ivory.models.Patient;
import com.ivory.ivory.models.TreatmentPlan;

@RestController
@RequestMapping("/rest/patient")
public class PatientRestController {

	@RequestMapping(value = "/medical_history_questions", method = RequestMethod.GET)
	public List<MedicalHistoryQuestion> GetMedicalHistoryQuestions() {
		ManageMedicalHistory medicalHistory = new ManageMedicalHistory();
		List<MedicalHistoryQuestion> questions = medicalHistory.listQuestions();
		return questions;
	}

	@RequestMapping(value = "/{patientid}", method = RequestMethod.GET)
	public Patient GetPatient(@PathVariable int patientid) {
		ManagePatient mp = new ManagePatient();
		Patient patient = mp.getPatientDetails(patientid);
		return patient;
	}

	@RequestMapping(method = RequestMethod.POST)
	public Patient SavePatient(@RequestBody Patient patient) {
		ManagePatient mp = new ManagePatient();
		return mp.addPatient(patient);
	}

	@RequestMapping(value = "/{patientid}", method = RequestMethod.PUT)
	public Patient UpdatePatient(@RequestBody Patient patient) {
		ManagePatient mp = new ManagePatient();
		return mp.updatePatient(patient);
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public List<Patient> GetPatients() {
		ManagePatient mp = new ManagePatient();
		List<Patient> patients = mp.listPatients();
		return patients;
	}

	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody List<Patient> SearchPatients(@RequestParam("term") String term) {
		ManagePatient mp = new ManagePatient();
		List<Patient> patients = mp.searchPatient(term);
		return patients;
	}
	
	@RequestMapping(value="{patientid}/treatment/plan", method = RequestMethod.POST)
	public TreatmentPlan SaveTreatmentPlan(@PathVariable int patientid, @RequestBody TreatmentPlan treatmentPlan){
		ManagePatient mp = new ManagePatient();
		return mp.saveTreatmentPlan(patientid, treatmentPlan);
	}
	
	@RequestMapping(value="{patientid}/treatment/plan", method = RequestMethod.GET)
	public List<TreatmentPlan> GetTreatmentPlans(@PathVariable int patientid){
		ManagePatient mp = new ManagePatient();
		return mp.getTreatmentPlans(patientid);
	}
	
	@RequestMapping(value="{patientid}/appointment", method = RequestMethod.POST)
	public Appointment SaveAppointment(@PathVariable int patientid, @RequestBody Appointment appointment) {
		ManageAppointment md = new ManageAppointment();
		return md.addAppointment(patientid, appointment);
	}

	@RequestMapping(value = "{patientid}/appointment", method = RequestMethod.GET)
	public @ResponseBody List<Appointment> GetAppointmentList(@PathVariable int patientid) {
		ManageAppointment mp = new ManageAppointment();
		List<Appointment> appointments = mp.getAppointmentList(patientid);
		return appointments;
	}
}
