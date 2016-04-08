Vmail.controller('authCtrl',
  ['$scope','authService',
  function($scope, authService){
    $scope.authClick = function(){
      authService.handleAuthClick();
    }
}]);
