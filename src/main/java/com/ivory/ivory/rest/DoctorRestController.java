package com.ivory.ivory.rest;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ivory.ivory.models.Doctor;
import com.ivory.ivory.ManageDoctor;

@RestController
@RequestMapping("/rest/doctor")
public class DoctorRestController {


	@RequestMapping(method = RequestMethod.POST)
	public Doctor SaveDoctor(@RequestBody Doctor doctor) {
		ManageDoctor md = new ManageDoctor();
		return md.addDoctor(doctor);
	}
}
