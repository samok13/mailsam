Vmail.controller('globalCtrl',
  ['$scope','getEmailService','sendEmailService','authService',
  function($scope, getEmailService, sendEmailService, authService){

    $scope.sendEmail = function(){
      sendEmailService.sendEmail();
    };

}]);
