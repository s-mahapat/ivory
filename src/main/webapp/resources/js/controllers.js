/**
 * 
 */
var patientControllers = angular.module('patientControllers', []);

patientControllers.controller('NewPatientController', [
		'$scope',
		'$http',
		function($scope, $http) {
			$http.get('rest/patient/medical_history_questions').success(
					function(data, status, headers, config) {
						$scope.medical_history_questions = data;
					}).error(function(data, status, headers, config) {
				// log error
			});
		} ]);

var doctorControllers = angular.module('doctorControllers', []);

doctorControllers.controller('NewDoctorController', [ '$scope', '$http',
		function($scope, $http) {

		} ]);