var jumbledWords=[];
myApp.controller("playGameController", ["$scope", "quizService", function($scope, quizService){
  console.log("This is Play ");
  $scope.quizWords = quizService.getQuiz();
  console.log($scope.quizWords);
  quizService.jumble($scope.quizWords);
  $scope.jumbledWords=jumbledWords;
}]);
