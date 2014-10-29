package com.ivory.ivory.rest;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;
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
