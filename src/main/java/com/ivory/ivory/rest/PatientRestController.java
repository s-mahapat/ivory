package com.ivory.ivory.rest;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.ivory.ivory.ManageAppointment;
import com.ivory.ivory.ManageMedicalHistory;
import com.ivory.ivory.ManagePatient;
import com.ivory.ivory.models.Appointment;
import com.ivory.ivory.models.Doctor;
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
	public Appointment SaveAppointment(@PathVariable int patientid, @RequestBody String req) throws JSONException, ParseException {
		JSONObject jObject  = new JSONObject(req);
		JSONObject json_doctor = jObject.getJSONObject("doctor");
		
		Gson gson = new Gson();
		Doctor doctor = gson.fromJson(json_doctor.toString(), Doctor.class);		
		
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
	    Date parsedTimeStamp = dateFormat.parse((String) jObject.get("appointmentdate"));
	    Timestamp timestamp = new Timestamp(parsedTimeStamp.getTime());
	    
	    Appointment appointment = new Appointment();
	    
	    appointment.setAppointmentdate(timestamp);
	    appointment.setAppointmentreason((String) jObject.get("appointmentreason"));

		doctor.addAppointment(appointment);
		
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
