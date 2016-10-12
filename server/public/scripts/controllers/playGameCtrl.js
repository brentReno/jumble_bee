var jumbledWords=[];
myApp.controller("playGameController", ["$scope", "quizService", function($scope, quizService){
  console.log("This is Play ");

  //empty arrays
  $scope.quizWords = [];
  $scope.correctAnswers=[];
  jumbledWords=[];

  //set up success display
  $scope.correct= 0;
  $scope.showBee= false;
  $scope.hideBee=true;



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
      console.log("in wrong");
      console.log(document.getElementById(id).placeholder);
      document.getElementById(id).placeholder="Try Again";
      document.getElementById(id).value ="";
    }
     else if(userAnswer == $scope.correctAnswers[index]){
       $scope.correct++;
       console.log($scope.correct);
       console.log($scope.correctAnswers.length);
       $scope.percent = $scope.correct/$scope.correctAnswers.length;
       console.log($scope.percent);
       if($scope.percent <= 0.2){
         console.log("show");
         $scope.showBee = true;
         $scope.hideBee = false;
       }
       if($scope.percent > 0.2 && $scope.percent <= 0.4){
         console.log("small");
         document.getElementById("beeImage").className = "s";
       }
       if($scope.percent > 0.4 && $scope.percent <= 0.6){
         console.log("medium");
         document.getElementById("beeImage").className = "m";
       }
       if($scope.percent > 0.6 && $scope.percent <= 0.8){
         console.log("large");
         document.getElementById("beeImage").className = "l";
       }
       if($scope.percent > 0.8 && $scope.percent < 1){
         console.log("x-large");
         document.getElementById("beeImage").className = "xl";
       }
    }
  };

}]);
