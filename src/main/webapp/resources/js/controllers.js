/**
 * 
 */

/* Patient controllers */
var patientControllers = angular.module('patientControllers', []);

patientControllers.controller('NewPatientController', [
		'$scope',
		'$http',
		'$location',
		'PatientResource',
		function($scope, $http, $location, patientRes) {
			$scope.submitForm = function() {
				patientRes.save(null, $scope.patient, function(value,
						responseHeaders) {
					// success callback
					$location.url("patient/details/" + value.id);
				}, function(httpResponse) {
					// error callback
					showErrorMessage('Failed to create patient. '
							+ httpResponse.statusText);
				});
			};

		} ]

);

patientControllers.controller('EditPatientController', [
		'$scope',
		'$http',
		'$routeParams',
		'$location',
		'PatientResource',
		function($scope, $http, $routeParams, $location, patientRes) {
			patientid = $routeParams.id;
			$scope.patient = {};
			patient = patientRes.get({
				id : patientid
			}, function(value, responseHeaders) {
				// success callback
				$scope.patient = patient;
			}, function(httpResponse) {
				// error callback
				showErrorMessage('Failed to update patient. '
						+ httpResponse.statusText);
			});

			$scope.submitForm = function() {
				patientRes.update({
					id : patientid
				}, $scope.patient, function(value, responseHeaders) {
					// success callback
					$location.url("patient/details/" + value.id);
				}, function(httpResponse) {
					// error callback
					showErrorMessage('Failed to update patient. '
							+ httpResponse.statusText);
				});

			};

		} ]);

patientControllers.controller('PatientController', [
		'$scope',
		'$http',
		'$routeParams',
		'PatientResource',
		function($scope, $http, $routeParams, patientRes) {
			$scope.patientid = $routeParams.id;
			$scope.patient = {};
			patient = patientRes.get({
				id : $scope.patientid
			}, function(value, responseHeaders) {
				// success callback
				$scope.patient = patient;
				$scope.patient.treatmentplans = [ {
					"id" : 1,
					"date" : "02/08/2014",
					"treatment" : "Root Canal",
					"details": [{"id": 1.1, "description": "Test2"}],
				}, {
					"id" : 2,
					"date" : "02/08/2012",
					"treatment" : "Root Canal2",
					"details": [{"id": 2.1, "description": "Test12"}],
				} ];
			}, function(httpResponse) {
				showErrorMessage('Failed to get patient. '
						+ httpResponse.statusText);
			});
			$scope.initCollapse = function(){
				$scope.dataCollapseFlags = [];
				for(var i=0; i<=$scope.patient.treatmentplans.length; i++){
					$scope.dataCollapseFlags.push(false);
				}
			};
			$scope.selectRow = function(index){
				// check if its not initialized yet
				if(typeof $scope.dataCollapseFlags == 'undefined'){
					$scope.initCollapse();
				}
				// if the row is already selected, collapse the row
				if($scope.dataCollapseFlags[index] == true){
					$scope.dataCollapseFlags[index] = false;
				}else{
					// if the row is collapsed, collapse any open rows and then expand this row
					$scope.initCollapse();
					$scope.dataCollapseFlags[index] = true;
				}
				
			};
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