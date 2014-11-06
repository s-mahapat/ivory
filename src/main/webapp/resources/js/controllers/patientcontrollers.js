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
var patientControllers = angular.module('patientControllers', []);

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
						'$filter',
						'TreatmentPlan',
						'DTOptionsBuilder',
						'DTColumnDefBuilder',
						function($scope, $routeParams, patientRes,
								$filter, treatmentPlan, DTOptionsBuilder, 
								DTColumnDefBuilder) {
							$scope.patientid = $routeParams.id;
							$scope.patient = {};
							$scope.selected_treatment_plan_id = 0;
							$scope.treatmentplan = {};
							$scope.selected_detail = {};
							$scope.lower_pane_view = 0;
							$scope.page = 1;

							$scope.getTreatments = function(pagenum){
								$scope.patient.treatmentplans = treatmentPlan.query({patientid: $scope.patientid},
								  function(data, status, headers, config) {
								    // this callback will be called asynchronously
								    // when the response is available
									// return data;
									  $scope.patient.treatmentplans = data;
								  },
								  function(data, status, headers, config) {
								    // called asynchronously if an error occurs
								    // or server returns response with an error status.
								  });
							};

							$scope.getTreatments($scope.page);
							
							$scope.dtOptions = DTOptionsBuilder.newOptions()
							.withPaginationType('full_numbers').withBootstrap()
							.withDisplayLength(10);
							
							$scope.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(0),
							   					DTColumnDefBuilder.newColumnDef(1).notSortable(),
												DTColumnDefBuilder.newColumnDef(2).notSortable(),
												DTColumnDefBuilder.newColumnDef(3).notSortable()];

							$scope.initCollapse = function() {
								$scope.dataCollapseFlags = [];
								for (var i = 0; i < $scope.patient.treatmentplans.length; i++) {
									$scope.dataCollapseFlags.push(false);
								}
							};

							$scope.selectRow = function(index) {
								$scope.detailCollapseFlags = [];
								// always hide the lower pane and then reopen
								// again
								$scope.resetDetailView();
								// check if its not initialized yet
								if (typeof $scope.dataCollapseFlags == 'undefined') {
									$scope.initCollapse();
								}
								// if the row is already selected, collapse the
								// row
								if ($scope.dataCollapseFlags[index] == true) {
									$scope.dataCollapseFlags[index] = false;
									$scope.selected_treatment_plan_id = 0;
								} else {
									// if the row is collapsed, collapse any
									// open rows and then expand this row
									$scope.initCollapse();
									$scope.dataCollapseFlags[index] = true;
									$scope.selected_treatment_plan_id = $scope.patient.treatmentplans[index].id;
								}

							};

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

							$scope.showPage = function(pagenum){
								if(pagenum < 1)
									return;
								$scope.page = pagenum;
								$scope.getTreatments($scope.page);
							};

						} ]);


patientControllers.controller('NewAppointmentController', [
		'$scope',
		'$routeParams',
		'$location',
		'AppointmentResource',
		function($scope, $routeParams, $location, $appointment) {
			$scope.appointments = {};
			$scope.appointment = new Object();
									
			$scope.getAppointments = function(id){
				$scope.appointments = $appointment.query({
					id : $routeParams.id
				});
			}
			
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
						$scope.appointments = {};
						$scope.getAppointments();
						$scope.appointment = {};
					}, 
					function(httpResponse) {
					// error callback
					showErrorMessage('Failed to create appointment. '
							+ httpResponse.statusText);
				});
			};
		} ]);
