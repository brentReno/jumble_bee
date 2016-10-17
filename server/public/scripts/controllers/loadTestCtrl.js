var loadedQuiz;
myApp.controller("loadTestController", ["$scope", '$http', '$location', "quizService",  function($scope, $http, $location, quizService){
  // console.log("Load Test");
  //init function to load users tests.
  //get username
  $scope.user = JSON.parse( localStorage.getItem( 'userProfile' ));
  $scope.showLoadImage = true;

  $scope.init = function(){
    //if not logged in
    if($scope.user === null){
      // console.log("must log In");
      // show please log in
      $scope.showLoad = false;
    }
    //if logged in
    else if($scope.user !== undefined){
      //show dropdown to load tests
      $scope.showLoad= true;

      //get saved tests from Mongo
      $scope.showLoadImage = false;
      $http({
        method:"GET",
        url:"/saved/"+$scope.user.username
      }).then(function(data){
        //place words into an array for display on DOM
        $scope.savedQuizzes = data.data;
      });
    }//end else
  };//end init

  //load test on selection
  $scope.changedValue = function(item){
    //add loaded quiz to function to send to quizService
    loadedQuiz = quizService.addWords(item.words);
    // switch view to play
    $location.url('/playGame');
  };

  $scope.logIn=function(){
    quizService.logIn();
  };


  //call on Load
  $scope.init();

}]);
