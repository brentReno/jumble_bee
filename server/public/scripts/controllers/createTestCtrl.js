//globals
var numWords;
var quizName;
var quiz =[];
var addingWords;
var updatedWord;
myApp.controller("createTestController", ["$scope","$http", "quizService", "$location",function($scope, $http, quizService, $location){
  //empty range
  var range =[];
  console.log("This is Create");
  //check for log in
  //get user data
  $scope.user = JSON.parse( localStorage.getItem( 'userProfile' ));
    if($scope.user === null){
      console.log("must log In");
      // show please log in
      $scope.showCreate = false;
    }
    //if logged in
    else if($scope.user !== undefined){
      //show dropdown to load tests
      $scope.showCreate= true;
    }//end check for log in
  //hide error display
  $scope.showOnError =false;
  // enter basic quiz data, show inputs for words
  $scope.showInputs = function(){
    console.log("in showInputs");
    //collect the number of words
  if($scope.numWordsIn.six){
    numWords = $scope.numWordsIn.six;
  }
  if($scope.numWordsIn.twelve){
    numWords = $scope.numWordsIn.twelve;
  }
  if($scope.numWordsIn.eighteen){
    numWords = $scope.numWordsIn.eighteen;
  }


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

    console.log("in create quiz");
    for (var i = 0; i < numWords; i++) {
      //get input data
      var word= document.getElementById(i+1).value;
      console.log(word);
      //check for empty
      if(word===""){
        document.getElementById(i+1).setAttribute('placeholder', "Please enter a word.");
      }
      else{
      //put into an array
      quiz.push(word);
      console.log(quiz);
      }
    }//end for
    if(quiz.length<numWords){
        alert("Please enter a word in all spaces");
        return;
    }
      //package in object
    var objectToSend ={ quiz_name:quizName, quiz:quiz, username: $scope.user.username};
    console.log(objectToSend);
    //send to server
    $http({
      method:"POST",
      url:"/create",
      data: objectToSend
    }).then(function(data){
      console.log("back from server with:",data);
      if(data.data.spelling === false){
        //show error display
        $scope.showOnError= true;
        $scope.wrongWords= data.data.results;
      }
      else{
      //place quiz words in an array
      var quizWords = data.data.words;
      // //send words to the service for access on play page
      addingWords = quizService.addWords(quizWords);
      // //switch view to play
      $location.url('/playGame');
    }
    });//end call
  };//end create quiz

  $scope.tryAgain= function(){
    quiz=[];
    for (var i = 0; i < numWords; i++) {
      updatedWord=document.getElementById(i+1).value;
      quiz.push(updatedWord);
    }
    console.log(quiz);
    objectToSend ={ quiz_name:quizName, quiz:quiz, username: $scope.user.username};
    console.log(objectToSend);
    $http({
      method:"POST",
      url:"/create",
      data: objectToSend
    }).then(function(data){
      console.log("back from server with:",data);
      if(data.data.spelling === false){
        //show error display
        $scope.showOnError= true;
        $scope.wrongWords= data.data.results;
      }
      else{
      //place quiz words in an array
      var quizWords = data.data.words;
      // //send words to the service for access on play page
      addingWords = quizService.addWords(quizWords);
      // //switch view to play
      $location.url('/playGame');
      }
    });//end then
  };

  $scope.logIn= function(){
    quizService.logIn();
  };
}]);
