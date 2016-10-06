var jumbledWords=[];
myApp.controller("playGameController", ["$scope", "quizService", function($scope, quizService){
  console.log("This is Play ");
  //get quiz words to jumble
  $scope.quizWords = quizService.getQuiz();
  //get quiz words, as answer key
  $scope.correctAnswers = quizService.getQuiz();
  console.log($scope.quizWords);

  //jumble the quiz words for display on the Dom
  quizService.jumble($scope.quizWords);
  $scope.jumbledWords=jumbledWords;

  //check answers function
  $scope.checkAnswer = function(index){
    var id = "question-"+index;
    console.log(id);
    var answer =document.getElementById(id).value;
    console.log(answer);

  };

}]);
