var loadedQuiz;
myApp.controller("loadTestController", ["$scope", '$http', '$location', "quizService",  function($scope, $http, $location, quizService){
  console.log("Load Test");
  //init function to load users tests.
  $scope.init = function(){
    //get user name
    $scope.user = JSON.parse( localStorage.getItem( 'userProfile' ));

    //get saved test from Mongo
    $http({
      method:"GET",
      url:"/saved/"+$scope.user.username
    }).then(function(data){
      console.log("back from server with:", data);
      $scope.savedQuizzes = data.data;
    });

  };//end init

  $scope.changedValue = function(item){
    console.log(item);
    loadedQuiz = quizService.addWords(item.words);
    console.log("going to the service", loadedQuiz);
    $location.url('/playGame');
  };


  //call on Load
  $scope.init();
}]);
