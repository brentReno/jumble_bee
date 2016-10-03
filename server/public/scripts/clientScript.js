console.log("Hello from the Client Script!");

var myApp = angular.module("myApp", []);

 myApp.controller("testController", ["$scope", function($scope){
  console.log("this is a test. NG is working");
}]);
