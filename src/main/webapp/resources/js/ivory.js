var ivoryApp = angular.module('ivory', [ 'ngRoute', 'ngResource', 'ui.grid',
		'patientControllers', 'doctorControllers', 'ivory.services',
		'searchControllers' ]);

//'ngResource', 'datatables',
//'patientControllers', 'ivory.services', 'searchControllers',
// 'errorControllers' 
ivoryApp.config(function($routeProvider, $httpProvider) {
	$routeProvider.when('/registration/patient', {
		templateUrl : 'resources/partials/patient_registration.html',
		controller : 'NewPatientController'
	}).when('/registration/doctor', {
		templateUrl : 'resources/partials/doc_registration.html',
		controller : 'NewDoctorController'
	}).when('/patient/details/:id', {
		templateUrl : 'resources/partials/patient_details.html',
		controller : 'PatientDetailsController'
	}).when('/patient/edit/:id', {
		templateUrl : 'resources/partials/patient_registration.html',
		controller : 'EditPatientController'
	}).when('/patient/search/:term', {
		templateUrl : 'resources/partials/search_results.html',
		controller : 'PatientSearchResultsController'
	});

	$httpProvider.interceptors.push(function($q) {
		return {
			'request' : function(config) {
				// valid request
				return config;
			},
			
			'requestError': function(rejection){
				// invalid request
				return $q.reject(rejection);
			},

			'response' : function(response) {
				// valid response
				return response;
			},
			
			// optional method
		   'responseError': function(rejection) {
			   // error in response
			   //console.log(rejection);
			   //errorControllers.setErrorMessage('Hi');
			   return $q.reject(rejection);
		    }
		};
	});

	// routing DOESN'T work without html5Mode
	// $locationProvider.html5Mode(true);
});

var Config = {
	DATE_FORMAT : 'dd/MM/yyyy',
};