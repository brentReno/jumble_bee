
myApp.controller("randomTestController", ["$scope","$http", function($scope,$http){
  console.log("This is Random");

  //random quiz click
  $scope.randomQuiz = function(){
    //collect info
    var subject = $scope.subject;
    console.log(subject);
    var dataMuseReq = 'words?rel_jjb='+subject;
    $http({
      method:"GET",
      url:"https://api.datamuse.com/" + dataMuseReq

    }).then(function(data){
      console.log(data);
    });


  };//end random quiz click

}]);
