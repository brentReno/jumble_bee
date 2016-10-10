var loadedQuiz;
myApp.controller("loadTestController", ["$scope", '$http', '$location', "quizService",  function($scope, $http, $location, quizService){
  console.log("Load Test");
  //init function to load users tests.
  $scope.user = JSON.parse( localStorage.getItem( 'userProfile' ));
  $scope.init = function(){

    if($scope.user === null){
      console.log("must log In");
      $scope.showLoad = false;
    }
    else if($scope.user !== undefined){

      $scope.showLoad= true;

      //get saved tests from Mongo
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


  //call on Load
  $scope.init();

}]);
