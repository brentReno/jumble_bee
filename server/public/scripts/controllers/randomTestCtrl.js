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
    //if both inout fields have data
    else{

      subjectOne = $scope.subjectOne;
      subjectTwo = $scope.subjectTwo;
      testName = subjectOne + " " + subjectTwo;
      dataMuseReq = 'words?topics='+subjectOne + "," + subjectTwo;
    }
      $http({
        method:"GET",
        url:"https://api.datamuse.com/" + dataMuseReq +"$max=30"

      }).then(function(data){
          console.log(data);
          for (var i = 0; i < data.data.length; i++) {
            var word = data.data[ i ].word;
            console.log(word);
            randomTest.push(word);
          }
          saveRandom(testName, randomTest, $scope.user);
          randomTest=[];
          console.log(randomTest);

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
          var quizWords = data.data.words;
          console.log("quizWords:", quizWords);
          addingWords = quizService.addWords(quizWords);
          console.log("these are going to the service:", addingWords);
          $location.url('/playGame');
        });
  };
}]);
