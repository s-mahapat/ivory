describe('Testing NewPatientController Controller', function() {
	var scope=0, location=null, PatientResource=null;
	
	beforeEach(module('patientControllers', function($provide) {
		PatientResource = jasmine.createSpyObj("PatientResource", ["save"]);		
		/*PatientResource.save.andReturn({
			name: 'test'
		});*/
		$provide.value('PatientResource', PatientResource);
	}));
	
	beforeEach(inject(function($rootScope, $location, $controller, _PatientResource_){
		scope = $rootScope.$new();
		location = $location;
		PatientResource = _PatientResource_;
		$controller("NewPatientController", { $scope: scope, $location: location, PatientResource: PatientResource});
	}));
	
	it('Checking submitForm() calls service save() method', function(){
		//console.log(Object.getOwnPropertyNames(scope));
		console.log(PatientResource);
		PatientResource.save = function(nullval, data, success, failure){
			var value = {
					id: 1,
			};
			success(value);
		};
		scope.submitForm();
		//expect the url to have patient/details/id
		expect(location.path()).toContain("patient/details/1");
	});
	
	
});


describe('Testing EditPatientController Controller', function() {
	
});