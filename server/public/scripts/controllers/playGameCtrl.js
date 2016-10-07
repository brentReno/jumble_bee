var jumbledWords=[];
myApp.controller("playGameController", ["$scope", "quizService", function($scope, quizService){
  console.log("This is Play ");
  //empty arrays
  $scope.quizWords = [];
  console.log($scope.quizWords);
  $scope.correctAnswers=[];
  console.log($scope.correctAnswers);
  jumbledWords=[];
  console.log($scope.jumbledWords);
  //get quiz words to jumble
  $scope.quizWords = quizService.getQuiz();
  //get quiz words, as answer key
  $scope.correctAnswers = quizService.getQuiz();
  console.log($scope.quizWords);
  //empty service array
  quizService.emptyWords();

  //jumble the quiz words for display on the Dom
  quizService.jumble($scope.quizWords);
  $scope.jumbledWords=jumbledWords;

  //check answers function
  $scope.checkAnswer = function(index){
    var id = "question-"+index;
    var responseId= "response-"+index;
    console.log(id);
    var userAnswer =document.getElementById(id).value;
    console.log(userAnswer);
    if (userAnswer !== $scope.correctAnswers[index]){
      document.getElementById(responseId).innerHTML = "So close, try again!";
    }
     else if(userAnswer == $scope.correctAnswers[index]){
      document.getElementById(responseId).innerHTML = "Way to go!!!! You got that right!";
    }
  };

}]);
