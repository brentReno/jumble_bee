var jumbledWords=[];
myApp.controller("playGameController", ["$scope", "quizService", function($scope, quizService){
  console.log("This is Play ");

  //empty arrays
  $scope.quizWords = [];
  $scope.correctAnswers=[];
  jumbledWords=[];

  //get quiz words to jumble
  $scope.quizWords = quizService.getQuiz();
  //get quiz words, as answer key
  $scope.correctAnswers = quizService.getQuiz();

  //empty quizService array
  quizService.emptyWords();

  //jumble the quiz words for display on the Dom
  quizService.jumble($scope.quizWords);
  $scope.jumbledWords=jumbledWords;

  //check answers function
  $scope.checkAnswer = function(index){
    //get id of the question
    var id = "question-"+index;
    //get the id of the response
    var responseId= "response-"+index;
    //get the users answer
    var userAnswer =document.getElementById(id).value;
    console.log(userAnswer);
    //compare the users answer to the answer key array
    if (userAnswer !== $scope.correctAnswers[index]){
      document.getElementById(responseId).innerHTML = "So close, try again!";
    }
     else if(userAnswer == $scope.correctAnswers[index]){
      document.getElementById(responseId).innerHTML = "Way to go!!!! You got that right!";
    }
  };

}]);
