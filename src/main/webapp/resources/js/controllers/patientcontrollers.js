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

patientControllers
		.controller(
				'PatientDetailsController',
				[
						'$scope',
						'$http',
						'$routeParams',
						'PatientResource',
						'$filter',
						'TreatmentPlan',
						function($scope, $http, $routeParams, patientRes,
								$filter, treatmentPlan) {
							$scope.patientid = $routeParams.id;
							$scope.patient = {};
							$scope.selected_treatment_plan_id = 0;
							$scope.treatmentplan = {};
							$scope.selected_detail = {};
							$scope.lower_pane_view = 0;
							patient = patientRes.get({
								id : $scope.patientid
							}, function(value, responseHeaders) {
								// success callback
								$scope.patient = patient;
								$http({method: 'GET', url: 'resources/dummy_data/treatment_plans.json'}).
								  success(function(data, status, headers, config) {
								    // this callback will be called asynchronously
								    // when the response is available
									  $scope.patient.treatmentplans = data;
								  }).
								  error(function(data, status, headers, config) {
								    // called asynchronously if an error occurs
								    // or server returns response with an error status.
								  });
								 
							}, function(httpResponse) {
								showErrorMessage('Failed to get patient. '
										+ httpResponse.statusText);
							});
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
							$scope.addNew = function(){
								if($scope.selected_treatment_plan_id == 0){
									$scope.addNewTreatmentPlan();
								}else{
									$scope.addNewTreatmentDetail();
								}
							};
							$scope.addNewTreatmentPlan = function() {
								// set to todays date for the new treatment plan being created
								$scope.treatmentplan.date = $filter('date')
										(new Date(), Config.DATE_FORMAT);
								$scope.setDetailView(LOWER_PANE_VIEWS.NEW_TREATMENT_PLAN);
							};
							$scope.saveNewTreatmentPlan = function(){
								// change the date format from UI format to DB format
								var modified_treatmentplan = angular.copy($scope.treatmentplan);
								modified_treatmentplan.date = getDateForDB($scope.treatmentplan.date);
								treatmentPlan.save({
									patientid : $scope.patientid
								}, modified_treatmentplan, function(value,
										responseHeaders) {
									// success callback
									//$location.url("patient/details/" + value.id);
								}, function(httpResponse) {
									// error callback
									showErrorMessage('Failed to create patient treatment plan. '
											+ httpResponse.statusText);
								});
							};
							$scope.addNewTreatmentDetail = function(){
								$scope.setDetailView(LOWER_PANE_VIEWS.NEW_TREATMENT_DETAIL);
							};
						} ]);

/* class having the lower pane view ids */
var LOWER_PANE_VIEWS = {
	NOTHING : 0,
	TREATMENT_DETAILS : 1,
	NEW_TREATMENT_PLAN : 2,
	NEW_TREATMENT_DETAIL: 3
};
