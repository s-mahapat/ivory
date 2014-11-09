/**
 * 
 */
var searchControllers = angular.module('searchControllers', ['ui.grid', 'ui.grid.pagination']);

searchControllers.controller('SearchResultsController', [ '$scope',
		'$routeParams', 'PatientResource', 'DoctorResource',
		function($scope, $routeParams, patientResource, $doctor) {
			$scope.term = $routeParams.term;
			$scope.whom = $routeParams.whom;
			$scope.searchPatient = true;
			
			
			$scope.gridOptions = {
				enableSorting : true,
				enablePagination: true,
				rowsPerPage: 10,
				minRowsToShow: 10,
				enableHorizontalScrollbar: false,
				enableVerticalScrollbar: false,				
				columnDefs : [{name: 'ID',
					field: 'id',
					cellClass: 'ui-grid-cell-contents',
					cellTemplate : '<a href="#/' + $scope.whom + '/details/{{row.entity.id}}">{{COL_FIELD}}</a>'
				},
				{
					name : 'First Name',
					field : 'fname',
					cellClass: 'ui-grid-cell-contents',
					cellTemplate : '<a href="#/' + $scope.whom + '/details/{{row.entity.id}}">{{COL_FIELD}}</a>'
				}, {
					name : 'Last Name',
					field : 'lname',
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
			
			
			$scope.search = function(searchPatient){
				whatToSearch = patientResource;
				if(!searchPatient){
					whatToSearch = $doctor;
				}
				whatToSearch.query({
					term : $scope.term
				}, function(data) {
					$scope.gridOptions.data = data;
					$scope.term = {};
				});
			}
			
			if($scope.whom === 'doctor'){
				$scope.searchPatient = false;
			}

			//search now
			$scope.search($scope.searchPatient);
			
		} ]);

searchControllers.controller('SearchController', [ '$scope',
		'$location', function($scope, $location) {
			$scope.searchPatient = true;
			// default search for patient
			$scope.whom = 'patient';
			
			$scope.setSearchOption = function(id){
				if(id === 1){
					$scope.searchPatient = true;
					$scope.whom = 'patient';
				}
				else{
					$scope.searchPatient = false;
					$scope.whom = 'doctor';
				}
					
			}
			
			$scope.submit = function() {
				$location.url($scope.whom + "/search/" + $scope.term);
				$scope.term = null;
			};
		} ]);