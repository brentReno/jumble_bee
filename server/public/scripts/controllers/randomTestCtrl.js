//globals
var dataMuseReq;
var randomTest=[];
myApp.controller("randomTestController", ["$scope","$http", "$location", "quizService", function($scope,$http, $location, quizService){
  console.log("This is Random");
  $scope.user = JSON.parse( localStorage.getItem( 'userProfile' ));
  //random quiz click
  $scope.randomQuiz = function(){
    //collect info
    //used in save function as test name
    var testName;
    //used in creating dataMuseReq string
    var subjectOne;
    var subjecTwo;
    //if second input field is empty
    if($scope.subjectTwo === undefined){
      subjectOne = $scope.subjectOne;
      testName = subjectOne;
      dataMuseReq = 'words?topics='+subjectOne;
    }
    //if both input fields have data
    else{
      subjectOne = $scope.subjectOne;
      subjectTwo = $scope.subjectTwo;
      testName = subjectOne + " " + subjectTwo;
      dataMuseReq = 'words?topics='+subjectOne + "," + subjectTwo;
    }
      // make call to dataMuse for random words
      $http({
        method:"GET",
        url:"https://api.datamuse.com/" + dataMuseReq +"&max=30"

      }).then(function(data){
          console.log(data);
          //push random words in to an array
          for (var i = 0; i < data.data.length; i++) {
            var word = data.data[ i ].word;
            console.log(word);
            randomTest.push(word);
          }
            //check if a user is logged in
            if($scope.user === null){
              console.log("in if null");
              var user ={username: "none"};
              //send words to server for syllable check
              saveRandom(testName, randomTest, user);
              randomTest=[];
              console.log(randomTest);
            }
            //if a user is logged in
            else if($scope.user !== undefined) {
              console.log(" in if not undefined");
              //send to server for syllable check and save
              saveRandom(testName, randomTest, $scope.user);
              randomTest=[];
              console.log(randomTest);
            }
          });
  };//end random quiz click

  var saveRandom = function(testName, test, user ){
    var quizName= "Random " + testName + " quiz";
    var objectToSend ={ quiz_name:quizName, quiz:test, username: user.username};
    console.log(objectToSend);
    $http({
      method:"POST",
      url:"/createRandom",
      data: objectToSend
    }).then(function(data){
          console.log("back from the server", data);
          //place returned, checked words in an array
          var quizWords = data.data.words;
          console.log("quizWords:", quizWords);
          // send words to the service
          addingWords = quizService.addWords(quizWords);
          console.log("these are going to the service:", addingWords);
          //switch view
          $location.url('/playGame');
        });
  };//end check random
}]);
