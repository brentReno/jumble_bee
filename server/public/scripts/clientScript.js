// test for handshake
console.log("Hello from the Client Script!");

//create angular app
var myApp = angular.module("myApp", ["ngRoute"]);

//config NG routes 
myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
  //home
  when("/home", {
    templateUrl:'/views/partials/home.html',
    controller:'homeController'
  }).
  //load
  when("/loadTest", {
    templateUrl:'/views/partials/loadTest.html',
    controller:'loadTestController'
  }).
  //create
  when("/createTest", {
    templateUrl:'/views/partials/createTest.html',
    controller:'createTestController'
  }).
  //upload
  when("/randomTest",{
    templateUrl:'/views/partials/randomTest.html',
    controller: 'randomTestController'
  }).
  //play game
  when("/playGame",{
    templateUrl:'/views/partials/playGame.html',
    controller: 'playGameController'
  }).
  otherwise({
    redirectTo:"/viewOne"
  });
}]);//end config routes
