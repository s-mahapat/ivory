/* Doctor controllers */
var doctorControllers = angular.module('doctorControllers', []);

doctorControllers.controller('NewDoctorController', [
		'$scope',
		'$http',
		'$location',
		'DoctorResource',
		function($scope, $http, $location, doctorRes) {
			$scope.submitForm = function() {
				doctorRes.save(null, $scope.doctor, function(value,
						responseHeaders) {
					// success callback
					 $location.url("/");
				}, function(httpResponse) {
					// error callback
					showErrorMessage('Failed to create doctor. '
							+ httpResponse.statusText);
				});
			};
		} ]);