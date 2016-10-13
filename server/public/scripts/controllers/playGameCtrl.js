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
       if($scope.correct == 1){
         console.log("show");
         $scope.showBee = true;
         $scope.hideBee = false;
       }
       else if($scope.correct > 1 && $scope.percent < 1){
         // in th else if
         console.log("the else if is working!");
         //get image width and height
         console.log("width:",document.getElementById('beeImage').style.width, "height:",document.getElementById('beeImage').style.height);
         //place width and height in a var
         var width = document.getElementById('beeImage').style.width;
         var height= document.getElementById('beeImage').style.height;
         //remove percent
         width= width.replace(/%/, "");
         height= height.replace(/%/, "");
         //do some math
         width= Number(width)+3;
         height= Number(height)+3;
         //re-add the %
         width = width+"%";
         height= height+"%";
         //set new style
         document.getElementById('beeImage').style.width = width;
         document.getElementById('beeImage').style.height= height;
       }
       if($scope.percent== 1){
         console.log("this will do something Awesome!!");
       }
    }
  };

}]);
