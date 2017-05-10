'use strict';
var myApp = angular.module('mailservice', []);
myApp.controller('HomeCtrl', function($scope, $http) {
  $scope.content = {
    from_email: 'no-reply@test.com',
    api_key: '', //API key generated by Sendgrid
  };
  $scope.sendMessage = function() {
    var res = $http({
      method: 'POST',
      url: '/sendMail',
      data: $scope.content
    });
    res.success(function(data, status, headers, config) {
      if (data.status === 'SUCCESS') {
        alert('Sent successfully');
        $scope.reset();
      }
      else if (data.status === 'ERROR') {
        alert(data.message);
        $scope.reset();
      }
    });
    res.error(function(data, status, headers, config) {
      alert("failure message: " + JSON.stringify({
        data: data
      }));
      $scope.reset();
    });
  }
  $scope.reset = function() {
    location.reload();
  }
});
