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
		scope.submitForm();
		expect(PatientResource.save).toHaveBeenCalled();				
	});
	
	it('Checking submitForm() is defined', function(){
		expect(scope.submitForm).toBeDefined();
	});
	
});


describe('Testing NewPatientController Controller', function() {
	
});