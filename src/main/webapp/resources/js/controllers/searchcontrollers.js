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
					.withPaginationType('full_numbers').withBootstrap()
					.withDisplayLength(10);
			$scope.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
					DTColumnDefBuilder.newColumnDef(1).notSortable(),
					DTColumnDefBuilder.newColumnDef(2).notSortable(),
					DTColumnDefBuilder.newColumnDef(3).notSortable() ];
		} ]);
searchControllers.controller('PatientSearchController', [ '$scope',
		'$location', function($scope, $location) {
			$scope.submit = function() {
				$location.url("patient/search/" + $scope.term);
			};
		} ]);
