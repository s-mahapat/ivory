/**
 * 
 */
var searchControllers = angular.module('searchControllers', ['ui.grid', 'ui.grid.pagination']);

searchControllers.controller('PatientSearchResultsController', [ '$scope',
		'$routeParams', 'PatientResource',
		function($scope, $routeParams, patientResource) {
			$scope.term = $routeParams.term;			
			
			$scope.gridOptions = {
				enableSorting : true,
				enablePagination: true,
				rowsPerPage: 10,
				minRowsToShow: 10,
				enableHorizontalScrollbar: false,
				enableVerticalScrollbar: false,				
				columnDefs : [{
					name : 'First Name',
					field : 'fname',
					//cellClass: 'center-text',
					cellTemplate : '<a href="#/patient/details/{{row.entity.id}}">{{COL_FIELD}}</a>'
				}, {
					name : 'Last Name',
					field : 'lname',
					//cellClass: 'center-text',
				}, {
					field : 'address',
					enableSorting : false
				}, {
					field : 'email',
				}, {
					field : 'mobile',
					width: '10%',
				}, {
					field : 'phone',
					width: '10%',
				} ]
			};
			
			$scope.gridOptions.onRegisterApi = function (gridApi) {
				   $scope.gridApi = gridApi;
				   $scope.gridApi.grid.registerRowBuilder(function(row){
					   return row;
				   });
				   
			};
			
			patientResource.query({
				term : $routeParams.term
			}, function(data) {
				$scope.gridOptions.data = data;
			});
			
			
		} ]);

searchControllers.controller('PatientSearchController', [ '$scope',
		'$location', function($scope, $location) {
			$scope.submit = function() {
				$location.url("patient/search/" + $scope.term);
			};
		} ]);
