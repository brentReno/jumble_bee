var dataMuseReq;
myApp.controller("randomTestController", ["$scope","$http", function($scope,$http){
  console.log("This is Random");
  //populate selects

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
    });
}
else if($scope.limiter =="Adjective"){
     dataMuseReq = 'words?rel_jja='+subject +"&max="+maxNum;
    $http({
      method:"GET",
      url:"https://api.datamuse.com/" + dataMuseReq

    }).then(function(data){
      console.log(data);
    });
}

  };//end random quiz click

}]);
