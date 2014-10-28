/**
 * 
 */
var ivoryServices = angular.module('ivory.services', []);
ivoryServices.factory('PatientResource', [ '$resource', function($resource) {
	var Patient = $resource('rest/patient/:id', {
		id : '@id'
	}, {
		'update' : {
			method : 'PUT',
		},
	});
	return Patient;
} ]);

/*
 * Resource used for all patient treatment plans
 * 
 */
ivoryServices.factory('TreatmentPlan', [ '$resource', function($resource) {
	var TreatmentPlan = $resource('rest/patient/:patientid/treatment/plan/:id', {
		id : '@id',
		patientid: '@patientid'
	}, {
		'update' : {
			method : 'PUT',
		},

	});
	return TreatmentPlan;
} ]);