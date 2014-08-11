var ivoryApp = angular.module('ivory', ['ui.date','ngRoute','ngResource','patientControllers', 'doctorControllers']);

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
	});
	
	//routing DOESN'T work without html5Mode
    //$locationProvider.html5Mode(true);
});