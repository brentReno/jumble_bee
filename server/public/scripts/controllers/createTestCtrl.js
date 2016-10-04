var numWords;
var quizName;
myApp.controller("createTestController", ["$scope", function($scope){
  console.log("This is Create");
  $scope.showInputs = function(){
    console.log("in showInputs");
    //collect the number of words
    numWords = $scope.numWordsIn;
    quizName = $scope.nameIn;
    console.log(numWords,quizName);
    //collect the name of the quiz
  };
}]);
