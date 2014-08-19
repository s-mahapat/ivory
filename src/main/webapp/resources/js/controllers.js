/**
 * 
 */
var searchControllers = angular.module('searchControllers', []);
searchControllers.controller('PatientSearchResultsController', [
		'$scope',
		'$routeParams',
		'PatientResource',
		'DTOptionsBuilder',
		'DTColumnDefBuilder',
		function($scope, $routeParams, patientResource, DTOptionsBuilder,
				DTColumnDefBuilder) {
			$scope.term = $routeParams.term;
			$scope.patients = patientResource.query({
				term : $routeParams.term
			});
			$scope.dtOptions = DTOptionsBuilder.newOptions()
					.withPaginationType('full_numbers').withBootstrap().withDisplayLength(10);
			$scope.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
					DTColumnDefBuilder.newColumnDef(1).notSortable(),
					DTColumnDefBuilder.newColumnDef(2).notSortable(),
					DTColumnDefBuilder.newColumnDef(3).notSortable()];
		} ]);
searchControllers.controller('PatientSearchController', [ '$scope',
		'$location', function($scope, $location) {
			$scope.submit = function() {
				$location.url("patient/search/" + $scope.term);
			};
		} ]);

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
			}, function(httpResponse) {
				showErrorMessage('Failed to get patient. '
						+ httpResponse.statusText);
			});

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