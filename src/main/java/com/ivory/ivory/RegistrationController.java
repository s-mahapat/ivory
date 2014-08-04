package com.ivory.ivory;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.omg.CORBA.portable.ValueOutputStream;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.ivory.ivory.beans.MedicalHistoryQuestion;

/**
 * Handles requests for the application home page.
 */
@Controller
public class RegistrationController extends IvoryBaseController{

	//private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/registration/patient", method = RequestMethod.GET)
	public ModelAndView home(Locale locale, Model model) {
		ManageMedicalHistory medicalHistory = new ManageMedicalHistory();
		List<MedicalHistoryQuestion> questions = medicalHistory.listQuestions();
		ModelAndView mv = new ModelAndView("registration");
		mv.addObject("medicalHistoryQuestions", questions);
		return mv;
	}
	
	@RequestMapping(value = "/medicalhistory/questions", method = RequestMethod.GET)
	@ResponseBody
	public String medicalHistoryQuestions(Locale locale, Model model) {
		ManageMedicalHistory medicalHistory = new ManageMedicalHistory();
		List<MedicalHistoryQuestion> questions = medicalHistory.listQuestions();
		Gson gson = new Gson();
		String json = gson.toJson(questions);
		return json;
	}
		
	@RequestMapping(value = "/registration/patient", method = RequestMethod.POST)
	public ModelAndView registerPatient(@RequestParam("fname") String firstName, 
			@RequestParam("lname") String lastName,
			@RequestParam("email") String email,
			@RequestParam("dob") String dob,
			@RequestParam("address") String address,
			@RequestParam("gender") String gender,
			@RequestParam("phone") String phone,
			@RequestParam("mobile") String mobile,
			HttpServletRequest request) {
		
		@SuppressWarnings("unchecked")
		Enumeration<String> parameterNames = request.getParameterNames();
		
		// form a hash map of all the medical history questions. The key is the id of the questions
		// and the value if the user entry
		Map<Integer, String> medicalHistory = new HashMap<Integer, String>();
		
		while(parameterNames.hasMoreElements()){
			String paramName = parameterNames.nextElement();
			
			// all the request parameters that are integers are assumed to be medical history questions with the name same
			// as the question id.
			if(this.isInteger(paramName)){
				String paramValue = request.getParameterValues(paramName)[0];
				medicalHistory.put(Integer.parseInt(paramName), paramValue);
			}
			
		}
		
		ManagePatient mp = new ManagePatient();
		int patientid= mp.addPatient(firstName, lastName, email, address, dob, gender, phone, mobile, medicalHistory);
		
		
		// show the patient details page
		PatientController pc = new PatientController();
		return pc.patientHome(patientid);
		
	}
	
	@RequestMapping(value = "/registration/doctor", method = RequestMethod.GET)
	public ModelAndView registerDoctor() {		
		return new ModelAndView("docregistration");
		
	}
	
	private boolean isInteger(String input) {
	    try {
	        Integer.parseInt( input );
	        return true;
	    }
	    catch( Exception e ) {
	        return false;
	    }
	}

}
