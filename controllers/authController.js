Vmail.controller('authCtrl',
  ['$scope','authService', '$state',
  function($scope, authService, $state){
    $scope.authClick = function(){
      authService.handleAuthClick();
    };
}]);
