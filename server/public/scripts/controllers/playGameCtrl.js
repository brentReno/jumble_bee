var jumbledWords=[];
myApp.controller("playGameController", ["$scope", "quizService", function($scope, quizService){
  console.log("This is Play ");
  $scope.quizWords = [ 'test', 'game', 'dsad'];
  console.log($scope.quizWords);
  jumble($scope.quizWords);
  $scope.jumbledWords=jumbledWords;
}]);
  //jumble the quiz words
  var jumble = function(quiz){
    //loop through quiz data
    for (var i = 0; i < quiz.length; i++) {
      // get single word returned in an array
      var wordToJumble= quiz.slice(i,i+1);
      var arrayOfLetters= wordToJumble[0].split("");
      //shuffle the letters
      shuffle(arrayOfLetters);
      //join letters in a word
      var jumbledWord = arrayOfLetters.join("");
      //push words to an array
      jumbledWords.push(jumbledWord);
    }
  };//end jumble

  //shuffle code from here http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
  var shuffle = function(array){
    var j,x,i;
    for (i = array.length; i; i--) {
      j= Math.floor(Math.random()*i);
      x = array[i-1];
      array[i-1] = array[j];
      array[j]=x;
    }
  };//end shuffle
