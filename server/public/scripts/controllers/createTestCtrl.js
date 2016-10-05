var numWords;
var quizName;
var range =[];
var quiz =[];
var addingWords;
myApp.controller("createTestController", ["$scope","$http", "quizService", function($scope, $http, quizService){
  console.log("This is Create");
  // enter basic quiz data, show inputs for words
  $scope.showInputs = function(){
    console.log("in showInputs");
    //collect the number of words
    numWords = $scope.numWordsIn;
    //collect the name of the quiz
      quizName = $scope.nameIn;
      console.log(numWords,quizName);
      $scope.showInputs= false;
      // create range
      for (var i = 0; i <numWords; i++) {
        range.push(i);
      }
      $scope.range=range;
  };

  //collect words from inputs
  $scope.createQuiz= function(){
    //get user data
    $scope.user = JSON.parse( localStorage.getItem( 'userProfile' ));
    console.log("in create quiz");
    for (var i = 0; i < numWords; i++) {
      //get input data
      var word= document.getElementById(i+1).value;
      console.log(word);
      //put into an array
      quiz.push(word);
      console.log(quiz);
    }//end for
      //package in object
    var objectToSend ={ quiz_name:quizName, quiz:quiz, username: $scope.user.username};
    console.log(objectToSend);
    //send to server
    $http({
      method:"POST",
      url:"/create",
      data: objectToSend
    }).then(function(data){
      console.log("back from server", data.data.words);
      var quizWords = data.data.words;
      console.log("quizWords:", quizWords);
      addingWords = quizService.addWords(quizWords);
      console.log("these are going to the service:", addingWords);
    });//end call

  };//end createQuiz
}]);
