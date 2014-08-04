/**
 * 
 */
package com.ivory.ivory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.ivory.ivory.beans.Patient;

/**
 * @author smahapat
 *
 */
@Controller
@RequestMapping("/patient")
public class PatientController extends IvoryBaseController {
	
	@RequestMapping(value = "/{patientid}", method = RequestMethod.GET)
	public ModelAndView patientHome(@PathVariable int patientid) {
		ModelAndView mv = new ModelAndView("patientdetails");
		mv.addObject("patientid", patientid);
		return mv;
	}
	
	@RequestMapping(value = "/details/{patientid}", method = RequestMethod.GET)
	public @ResponseBody String getPatientDetails(@PathVariable int patientid){
		ManagePatient mp = new ManagePatient();
		Patient patient = mp.getPatientDetails(patientid);
		Gson gson = new Gson();
		String json = gson.toJson(patient);
		return json;
	}
	

}
