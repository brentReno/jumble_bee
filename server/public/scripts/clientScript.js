// test for handshake
console.log("Hello from the Client Script!");

//create angular app
var myApp = angular.module("myApp", ["ngRoute"]);

//config NG routes ****Names will be changed when pages decided upon********
myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
  //home
  when("/viewOne", {
    templateUrl:'/views/partials/viewOne.html',
    controller:'viewOneController'
  }).
  //load
  when("/viewTwo", {
    templateUrl:'/views/partials/viewTwo.html',
    controller:'viewTwoController'
  }).
  //create
  when("/viewThree", {
    templateUrl:'/views/partials/viewThree.html',
    controller:'viewThreeController'
  }).
  //upload
  when("/viewFour",{
    templateUrl:'/views/partials/viewFour.html',
    controller: 'viewFourController'
  }).
  //play game
  when("/viewFive",{
    templateUrl:'/views/partials/viewFive.html',
    controller: 'viewFiveController'
  }).
  otherwise({
    redirectTo:"/viewOne"
  });
}]);//end config routes
