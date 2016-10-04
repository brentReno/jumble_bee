var numWords;
var quizName;
var range =[];
myApp.controller("createTestController", ["$scope", function($scope){
  console.log("This is Create");
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
}]);
