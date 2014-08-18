var ivoryApp = angular.module('ivory', [ 'ngRoute', 'ngResource', 'datatables',
		'patientControllers', 'doctorControllers', 'ivory.services', 'searchControllers' ]);

ivoryApp.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/registration/patient', {
		templateUrl : 'resources/partials/patient_registration.html',
		controller : 'NewPatientController'
	}).when('/registration/doctor', {
		templateUrl : 'resources/partials/doc_registration.html',
		controller : 'NewDoctorController'
	}).when('/patient/details/:id', {
		templateUrl : 'resources/partials/patient_details.html',
		controller : 'PatientController'
	}).when('/patient/edit/:id', {
		templateUrl : 'resources/partials/patient_registration.html',
		controller : 'EditPatientController'
	}).when('/patient/search/:term',{
		templateUrl : 'resources/partials/search_results.html',
		controller : 'PatientSearchResultsController'
	});

	// routing DOESN'T work without html5Mode
	// $locationProvider.html5Mode(true);
});