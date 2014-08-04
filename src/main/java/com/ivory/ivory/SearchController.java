/**
 * 
 */
package com.ivory.ivory;
import java.util.List;

import org.springframework.stereotype.Controller;
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
public class SearchController extends IvoryBaseController {
	
	@RequestMapping(value = "/searchresults", method = RequestMethod.GET)
	public ModelAndView searchResultsPage(@RequestParam("q") String searchString) {
		ModelAndView mv = new ModelAndView("search");
		mv.addObject("searchString", searchString);
		return mv;
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	@ResponseBody
	public String search(@RequestParam("q") String searchString) {
		ManagePatient mp = new ManagePatient();
		List<Patient> patients = mp.searchPatient(searchString);
		Gson gson = new Gson();
		String json = gson.toJson(patients);
		return json;
	}

}
