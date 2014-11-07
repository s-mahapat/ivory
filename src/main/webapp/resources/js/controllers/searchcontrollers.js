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
				columnDefs : [ {
					name : 'ID',
					field: 'id',
					width: '5%',
					cellClass: 'center-text',
					cellTemplate : '<a href="#/patient/details/{{COL_FIELD}}">{{COL_FIELD}}</a>'
				}, {
					name : 'First Name',
					field : 'fname',					
				}, {
					name : 'Last Name',
					field : 'lname'
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
			};
			
			/*$scope.gridApi.registerRowBuilder = function(row){
				alert(row);
			};*/
			
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
