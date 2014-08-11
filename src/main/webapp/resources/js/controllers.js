/**
 * 
 */
var patientControllers = angular.module('patientControllers', []);
//var patient = $resource('/rest/patient/:id', {id:'@id'});
patientControllers.controller('NewPatientController', [ '$scope', '$http',
		'$filter', '$location', function($scope, $http, $filter, $location) {
			/*
			 * $http.get('rest/patient/medical_history_questions').success(
			 * function(data, status, headers, config) {
			 * $scope.medical_history_questions = data; }).error(function(data,
			 * status, headers, config) { // log error $scope.history = {}; });
			 */

			$scope.submitForm = function() {
				$http({
					url : "rest/patient",
					data : $scope.patient,
					method : 'POST',
				}).success(function(data) {
					console.log("OK", data);
					$location.path('patient/details/' + data.id);
				}).error(function(err) {
					"ERR", console.log(err);
				});
			};

		} ]

);

patientControllers.controller('PatientController', [ '$scope', '$http',
		'$routeParams', function($scope, $http, $routeParams) {
			$scope.patientid = $routeParams.id;
		} ]);

var doctorControllers = angular.module('doctorControllers', []);

doctorControllers.controller('NewDoctorController', [ '$scope', '$http',
		function($scope, $http) {

			$scope.submitForm = function() {
				$http({
					url : "rest/doctor",
					data : $scope.doctor,
					method : 'POST',
				}).success(function(data) {
					console.log("OK", data);
				}).error(function(err) {
					"ERR", console.log(err);
				});
			};
		} ]);