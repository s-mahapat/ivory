var ivoryApp = angular.module('ivory', ['ngRoute','patientControllers', 'doctorControllers']);

ivoryApp.config(function($routeProvider) {
	$routeProvider.when('/registration/patient', {
		templateUrl : 'resources/partials/patient_registration.html',
		controller : 'NewPatientController'
	}).when('/registration/doctor', {
		templateUrl : 'resources/js/partials/doc_registration_tmpl.jsp',
		controller : 'NewDoctorController'
	}).otherwise({
		redirectTo : '/home'
	});
});