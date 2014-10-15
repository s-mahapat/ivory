describe('Testing Patient Controller', function() {

describe('Patient Search Controller', function() {
  var $scope;

  beforeEach(module('ivory'));

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controller('PatientController', {$scope: $scope});
  }));

  it('patient id is greater than 0', function() {
    expect($scope.patientid).toBeGreaterThan(0);
  });

});
});
