Vmail.controller('sentCtrl',
  ['$scope','getEmailService','sendEmailService','authService',
  function($scope, getEmailService, sendEmailService, authService){
    // authService.checkAuth();
    getEmailService.loadSentGmailApi();
}]);