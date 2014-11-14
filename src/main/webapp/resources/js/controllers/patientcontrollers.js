/**
 *
 */

/* class having the lower pane view ids */
var LOWER_PANE_VIEWS = {
	NOTHING : 0,
	TREATMENT_DETAILS : 1,
	NEW_TREATMENT_PLAN : 2,
	NEW_TREATMENT_DETAIL: 3
};

/* Patient controllers */
var patientControllers = angular.module('patientControllers', ['ui.grid', 'ui.grid.pagination', 'ui.grid.expandable', 'ui.grid.selection', 'ui.grid.pinning']);

patientControllers.controller('NewPatientController', [
		'$scope',
		'$location',
		'PatientResource',
		function($scope, $location, PatientResource) {
			$scope.submitForm = function() {
				PatientResource.save(null, $scope.patient, function(value,
						responseHeaders) {
					// success callback
					$location.url("patient/details/" + value.id);
				}, function(httpResponse) {
					// error callback
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
				$scope.patient.dob = new Date($scope.patient.dob);
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



patientControllers.controller(
		'PatientDetailsController',
		['$scope', '$routeParams', 'PatientResource',
		function($scope, $routeParams, $patient){
			$scope.patientid = $routeParams.id;
			patient = $patient.get({
			id : $scope.patientid
			}, function(value, responseHeaders) {
				// success callback
				$scope.patient = patient;

			}, function(httpResponse) {
				showErrorMessage('Failed to get patient. '
						+ httpResponse.statusText);
			});
		}]);


patientControllers.controller(
				'PatientTreatmentController',
				[
						'$scope',
						'$routeParams',
						'PatientResource',
						'TreatmentPlan',
						function($scope, $routeParams, patientRes,
								treatmentPlan) {
							$scope.patientid = $routeParams.id;
							$scope.patient = {};
							$scope.selected_treatment_plan_id = 0;
							$scope.treatmentplan = {};
							$scope.selected_detail = {};
							$scope.lower_pane_view = 0;

							
							$scope.gridOptions = {
								enableSorting : true,
								enablePagination: true,
								rowsPerPage: 10,
								//minRowsToShow: 5,
								enableHorizontalScrollbar: false,
								enableVerticalScrollbar: true,
								expandableRowTemplate: 'resources/partials/treatment_details_summary.html',
								columnDefs : [{
									name : 'Date',
									field : 'date',
								}, {
									name : 'Description',
									field : 'name',
								},]
							};
								
							$scope.gridOptions.onRegisterApi = function (gridApi) {
								   $scope.gridApi = gridApi;
								   $scope.gridApi.grid.registerRowBuilder(function(row){
									   return row;
								   });
								   
							};
							
							$scope.getTreatments = function(){
								treatmentplans = treatmentPlan.query({patientid: $scope.patientid},
								  function(data, status, headers, config) {
								    // this callback will be called asynchronously
								    // when the response is available
									// return data;
									  $scope.patient.treatmentplans = treatmentplans;
									  $scope.gridOptions.data = $scope.patient.treatmentplans;
									  for(i=0;i<data.length;i++){
										  data[i].subGridOptions = {
												  enableSorting : false,
												  columnDefs: [{
														name : 'ID',
														field : 'id',
												  }, {name: 'Date',
												      field: 'date',
												  }, {
													  name: 'Name',
													  field: 'name',
												  }, {
														name : 'Cost',
														field : 'price',
												  }, {
														name : 'Paid',
														field : 'paid',
												  }, {
														name : 'Balance',
														field : 'balance',
												  }],
										  }
									  }
								  },
								  function(data, status, headers, config) {
								    // called asynchronously if an error occurs
								    // or server returns response with an error status.
								  });
							};

							$scope.getTreatments();

							$scope.setDetailView = function(id) {
								$scope.lower_pane_view = id;
							};

							$scope.resetDetailView = function() {
								$scope.lower_pane_view = LOWER_PANE_VIEWS.NOTHING;
							};

							$scope.showDetail = function(treatment_plan_index,
									detail_index) {
								$scope.setDetailView(LOWER_PANE_VIEWS.TREATMENT_DETAILS);
								$scope.detailCollapseFlags = [];
								$scope.selected_detail = parseInt($scope.patient.treatmentplans[treatment_plan_index].details[detail_index]);
								// set all elements to false
								for (var i = 0; i < $scope.patient.treatmentplans[treatment_plan_index].details.length; i++) {
									$scope.detailCollapseFlags.push(false);
								}
								// only the one selected is true, then it gets
								// highlighted on the view
								$scope.detailCollapseFlags[detail_index] = true;
							};

							$scope.addNewTreatmentPlan = function() {
								// set to todays date for the new treatment plan being created
								$scope.treatmentplan.date = new Date();
								$scope.setDetailView(LOWER_PANE_VIEWS.NEW_TREATMENT_PLAN);
							};

							$scope.saveNewTreatmentPlan = function(){
								// change the date format from UI format to DB format
								treatmentPlan.save({
									patientid : $scope.patientid
								}, $scope.treatmentplan, function(value,
										responseHeaders) {
									// success callback
									$scope.getTreatments($scope.page);
								}, function(httpResponse) {
									// error callback
									showErrorMessage('Failed to create patient treatment plan. '
											+ httpResponse.statusText);
								});
							};

							$scope.addNewTreatmentDetail = function(){
								$scope.setDetailView(LOWER_PANE_VIEWS.NEW_TREATMENT_DETAIL);
							};

							$scope.addNew = function(){
								if($scope.selected_treatment_plan_id == 0){
									$scope.addNewTreatmentPlan();
								}else{
									$scope.addNewTreatmentDetail();
								}
							};

						} ]);


patientControllers.controller('NewAppointmentController', [
		'$scope',
		'$routeParams',
		'$location',
		'AppointmentResource',
		'DoctorResource',
		'$filter',
		function($scope, $routeParams, $location, $appointment, $doctor, $filter) {
			$scope.appointments = {};
			$scope.doctors = {};
			$scope.appointment = new Object();
			
			$scope.gridOptions = {
				enableSorting : true,
				enablePagination: true,
				rowsPerPage: 5,
				minRowsToShow: 5,
				enableHorizontalScrollbar: false,
				enableVerticalScrollbar: false,
				columnDefs : [
				{
					name : 'Date',
					field : 'appointmentdate',
				}, {
					name : 'Reason',
					field: 'appointmentreason',
				}, {
					name: 'Doctor',
					field: 'doctor.name'
				}]
			};
			
			$scope.gridOptions.onRegisterApi = function (gridApi) {
				   $scope.gridApi = gridApi;
				   $scope.gridApi.grid.registerRowBuilder(function(row){
					   row.entity.appointmentdate = $filter('date')(row.entity.appointmentdate, 'medium');
					   return row;
				   });
				   
			};
									
			$scope.getAppointments = function(id){
				$appointment.query({
					id : $routeParams.id
				}, 
				function(data){
					$scope.appointments = data;
					$scope.gridOptions.data = $scope.appointments;
				}, 
				function(){});
			}
			
			$scope.getDoctors = function(){
				$doctor.list({}, 
						function(data){$scope.doctors = data}, 
						function(){});
			}
			
			$scope.getDoctors();
			$scope.getAppointments();
			
			
			$scope.submitForm = function() {
				$scope.appointment.patientid = $routeParams.id;
				$appointment.save({
						id : $scope.appointment.patientid
					}, 
					$scope.appointment, 
					function(value, responseHeaders) {
						// success callback
						$location.url("patient/details/"
								+ $scope.appointment.patientid);
						
						// reload the data from server
						$scope.getAppointments();
						
						// clear the form
						$scope.appointment = {};
					}, 
					function(httpResponse) {
					// error callback
					showErrorMessage('Failed to create appointment. '
							+ httpResponse.statusText);
				});
			};
		} ]);
