package com.ivory.ivory.rest;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ivory.ivory.models.Patient;
import com.ivory.ivory.models.Appointment;
import com.ivory.ivory.ManageAppointment;
import com.ivory.ivory.ManagePatient;

@RestController
@RequestMapping("/rest/appointment")
public class AppointmentRestController {
	@RequestMapping(method = RequestMethod.POST)
	public Appointment SaveAppointment(@RequestBody Appointment appointment) {
		ManageAppointment md = new ManageAppointment();
		return md.addAppointment(appointment);
	}


@RequestMapping(value = "/{patientid}", method = RequestMethod.GET)
public @ResponseBody List<Appointment> GetAppointmentList(@PathVariable int patientid) {
	ManageAppointment mp = new ManageAppointment();
	List<Appointment> appointments = mp.getAppointmentList(patientid);
	return appointments;
}}
