var lock = new Auth0Lock("1tISyzkUZ5s8RhcqQjaB5Hzu2ULaY89f","bren0.auth0.com");
var logOutURL ="https://bren0.auth0.com/v2/logout";

myApp.controller("homeController", ["$scope", '$http', "$location", 'quizService', function($scope, $http, $location, quizService){
  console.log("This is the Home Page");
  //init function
  $scope.init = function(){
    console.log( 'Inside init' );
    // check if a user's info is saved in localStorage
    if( JSON.parse( localStorage.getItem( 'userProfile' ) ) ){
      // if so, save userProfile as $scope.userProfile
      $scope.userProfile = JSON.parse( localStorage.getItem( 'userProfile' ) );
      console.log( 'loggedIn:', $scope.userProfile );
      $scope.showUser = true;
    }
    else{
      // if not, make sure we are logged out and empty
      emptyLocalStorage();
      $scope.showUser = false;
    }
  }; // end init function

  //login
  $scope.logIn =function(){
    quizService.logIn();
  };

  //logout function
  $scope.logOut = function(){
      //call logOut url
      $http({
        method:'GET',
        url: logOutURL,
      }).then(function(data){
        if(data.data == 'OK'){
          emptyLocalStorage();
          $scope.showUser=false;
        }//end if
      });//end http and then
    };//end logout

  //load click
  $scope.goLoad =function(){
    $location.url('/loadTest');
  };
  //random click
  $scope.goRandom=function(){
    $location.url("randomTest");
  };

  //create click
  $scope.goCreate = function(){
    $location.url("/createTest");
  };
  //bee dance
  $scope.beeDance= function(){
    $scope.bee = document.getElementById("beePicture");
    $scope.bee.className += " dance";
  };
  $scope.removeDance=function(){
    $scope.bee = document.getElementById("beePicture");
    $scope.bee.className = "beePic";
  };
  //run on load
  $scope.init();
}]);

var emptyLocalStorage =function(){
  localStorage.removeItem( 'userProfile');
  localStorage.removeItem( 'userToken');
};
