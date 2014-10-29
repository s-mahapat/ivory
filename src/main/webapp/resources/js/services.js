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

ivoryServices.factory('DoctorResource', [ '$resource', function($resource) {
	var Doctor = $resource('rest/doctor/:id', {
		id : '@id'
	}, {
		'update' : {
			method : 'PUT',
		},

	});
	return Doctor;
} ]);

ivoryServices.factory('AppointmentResource', [ '$resource', function($resource) {
	var Appointment = $resource('rest/appointment/:id', {
		id : '@id'
	}, {
		'update' : {
			method : 'PUT',
		},

	});
	return Appointment;
} ]);