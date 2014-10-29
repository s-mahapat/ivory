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
				'PatientController',
				[
						'$scope',
						'$http',
						'$routeParams',
						'PatientResource',
						function($scope, $http, $routeParams, patientRes) {
							$scope.patientid = $routeParams.id;
							$scope.patient = {};
							$scope.selected_detail = {};
							$scope.hide_details = true;
							patient = patientRes
									.get(
											{
												id : $scope.patientid
											},
											function(value, responseHeaders) {
												// success callback
												$scope.patient = patient;
												$scope.patient.treatmentplans = [
														{
															"id" : 1,
															"date" : "02/08/2014",
															"treatment" : "Root Canal",
															"details" : [
																	{
																		"id" : 1.1,
																		"description" : "Test2",
																		"date" : "02/08/2014",
																		remarks : "This is a test remarks and must go to the next line"
																	},
																	{
																		"id" : 1.2,
																		"description" : "Test2.1",
																		"date" : "02/08/2014"
																	} ],
														},
														{
															"id" : 2,
															"date" : "02/08/2012",
															"treatment" : "Root Canal2",
															"details" : [
																	{
																		"id" : 2.1,
																		"description" : "Test12",
																		"date" : "02/08/2014"
																	},
																	{
																		"id" : 1.2,
																		"description" : "Test2.1",
																		"date" : "02/08/2014"
																	} ],
														},
														{
															"id" : 3,
															"date" : "02/08/2012",
															"treatment" : "Root Canal3",
															"details" : [
																	{
																		"id" : 2.1,
																		"description" : "Test123"
																	},
																	{
																		"id" : 1.2,
																		"description" : "Test2.1"
																	} ],
														},
														{
															"id" : 4,
															"date" : "02/08/2012",
															"treatment" : "Root Canal4",
															"details" : [
																	{
																		"id" : 2.1,
																		"description" : "Test1234"
																	},
																	{
																		"id" : 1.2,
																		"description" : "Test2.1"
																	} ],
														},
														{
															"id" : 5,
															"date" : "02/08/2012",
															"treatment" : "Root Canal5",
															"details" : [
																	{
																		"id" : 2.1,
																		"description" : "Test12345"
																	},
																	{
																		"id" : 1.2,
																		"description" : "Test2.1"
																	} ],
														} ];
											},
											function(httpResponse) {
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
								$scope.hide_details = true;
								// check if its not initialized yet
								if (typeof $scope.dataCollapseFlags == 'undefined') {
									$scope.initCollapse();
								}
								// if the row is already selected, collapse the
								// row
								if ($scope.dataCollapseFlags[index] == true) {
									$scope.dataCollapseFlags[index] = false;
								} else {
									// if the row is collapsed, collapse any
									// open rows and then expand this row
									$scope.initCollapse();
									$scope.dataCollapseFlags[index] = true;
								}

							};
							$scope.showDetail = function(treatment_plan_index,
									detail_index) {
								$scope.hide_details = false;
								$scope.detailCollapseFlags = [];
								$scope.selected_detail = $scope.patient.treatmentplans[treatment_plan_index].details[detail_index];
								// set all elements to false
								for (var i = 0; i < $scope.patient.treatmentplans[treatment_plan_index].details.length; i++) {
									$scope.detailCollapseFlags.push(false);
								}
								// only the one selected is true, then it gets
								// highlighted on the view
								$scope.detailCollapseFlags[detail_index] = true;
							};
						} ]);

patientControllers.controller('NewAppointmentController', [
		'$scope',
		'$routeParams',
		'$location',
		'AppointmentResource',
		function($scope, $routeParams, $location, appointmentRes) {
			$scope.appointments = {};
			$scope.appointments = appointmentRes.query({
				id : $routeParams.id
			});
			$scope.submitForm = function() {
				$scope.appointment.patientid = $routeParams.id;
				alert($scope.appointment);
				appointmentRes.save(null, $scope.appointment, function(value,
						responseHeaders) {
					// success callback
					alert(appointmentRes);
					$location.url("patient/details/"
							+ $scope.appointment.patientid);
					$scope.appointments = {};
					$scope.appointments = appointmentRes.query({
						id : $routeParams.id
					});
					$scope.appointment = {};
				}, function(httpResponse) {
					// error callback
					showErrorMessage('Failed to create appointment. '
							+ httpResponse.statusText);
				});
			};
		} ]);
