/**
 * 
 */
var PatientModel = Backbone.Model.extend({
	/*makes a query to context/patient/details, the first part of the
	 * url comes from url, this is just the relative path to the current url 
	 */
	urlRoot: CONTEXT_PATH + "/patient/details",
	defaults: {
		id: '',
		fname: '', 
		lname: '', 
		email: '',
		dob: '',
		gender: '',
		address: '',
		phone: '',
		mobile: ''
	}

});

var PatientAppointmentHistoryModel = Backbone.Model.extend({
	urlRoot: CONTEXT_PATH + "/patient/appointments",
	defaults: {
		//id: '',
		date: '', 
		description: ''
	}
});
