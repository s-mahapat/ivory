/**
 * 
 */
define(['jquery', 'underscore', 'backbone', 'views/patient_registration' ],
		function($, _, Backbone, PatientRegistrationView) {

			var AppRouter = Backbone.Router.extend({
				routes : {
					// Define some URL routes
					'registration/patient' : 'patientRegistration',

					// Default
					'*actions' : 'defaultAction'
				}
			});

			var initialize = function() {
				var app_router = new AppRouter;
				app_router.on('route:patientRegistration', function() {
					// Call render on the module we loaded in via the dependency
					// array
					// 'views/projects/list'
					
					var patientRegistrationView = new PatientRegistrationView();
					patientRegistrationView.render();
				});
				app_router.on('route:defaultAction', function(actions) {
					// We have no matching route, lets just log what the URL was
					console.log('No route:', actions);
				});
				Backbone.history.start();
			};
			return {
				initialize : initialize
			};
		});