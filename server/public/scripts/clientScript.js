// test for handshake
console.log("Hello from the Client Script!");

//create angular app
var myApp = angular.module("myApp", ["ngRoute"]);

//config NG routes ****Names will be changed when pages decided upon********
myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
  when("/viewOne", {
    templateUrl:'/views/partials/viewOne.html',
    controller:'viewOneController'
  }).
  when("/viewTwo", {
    templateUrl:'/views/partials/viewTwo.html',
    controller:'viewTwoController'
  }).
  when("/viewThree", {
    templateUrl:'/views/partials/viewThree.html',
    controller:'viewThreeController'
  }).
  otherwise({
    redirectTo:"/viewOne"
  });
}]);//end config routes
