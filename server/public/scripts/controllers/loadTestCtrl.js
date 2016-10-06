myApp.controller("loadTestController", ["$scope", '$http', '$location',  function($scope, $http, $location){
  console.log("Load Test");
  $scope.init = function(){
  //get user name
    $scope.user = JSON.parse( localStorage.getItem( 'userProfile' ));

    //get saved test from Mongo
    $http({
      method:"GET",
      url:"/saved/"+$scope.user.username
    }).then(function(data){
      console.log("back from server with:", data);
    });

  };//end init

  //call on Load
  $scope.init();
}]);
