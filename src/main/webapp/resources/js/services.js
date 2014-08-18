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