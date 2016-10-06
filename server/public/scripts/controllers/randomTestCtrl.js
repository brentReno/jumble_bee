var dataMuseReq;
var randomTest=[];
myApp.controller("randomTestController", ["$scope","$http", "$location", "quizService", function($scope,$http, $location, quizService){
  console.log("This is Random");
  $scope.user = JSON.parse( localStorage.getItem( 'userProfile' ));
  //random quiz click
  $scope.randomQuiz = function(){
    //collect info
    var subject = $scope.testSubject;
    var maxNum=$scope.number;
    console.log(subject);
    if($scope.limiter == "Noun"){
     dataMuseReq = 'words?rel_jjb='+subject+"&max="+ maxNum;
      $http({
        method:"GET",
        url:"https://api.datamuse.com/" + dataMuseReq

      }).then(function(data){
        console.log(data);
        for (var i = 0; i < data.data.length; i++) {
          var word = data.data[ i ].word;
          console.log(word);
          randomTest.push(word);
        }
        randomTest = quizService.addWords(randomTest);
        console.log("these are going to the service:", randomTest);
        $location.url('/playGame');
      });
    }
    else if($scope.limiter =="Adjective"){
       dataMuseReq = 'words?rel_jja='+subject +"&max="+maxNum;
      $http({
        method:"GET",
        url:"https://api.datamuse.com/" + dataMuseReq

      }).then(function(data){
          console.log(data);
          for (var i = 0; i < data.data.length; i++) {
            var word = data.data[ i ].word;
            console.log(word);
            randomTest.push(word);
          }
          var quizName= "Random " + subject + " quiz";
          var objectToSend ={ quiz_name:quizName, quiz:randomTest, username: $scope.user.username};
          console.log(objectToSend);
          $http({
            method:"POST",
            url:"/create",
            data: objectToSend
          }).then(function(data){
                console.log("back from the server", data);
                var quizWords = data.data.words;
                console.log("quizWords:", quizWords);
                addingWords = quizService.addWords(quizWords);
                console.log("these are going to the service:", addingWords);
                $location.url('/playGame');
        });
      });
    }
  };//end random quiz click
}]);
