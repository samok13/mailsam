Vmail.controller('inboxCtrl',
  ['$scope','getEmailService','sendEmailService','authService',
  function($scope, getEmailService, sendEmailService, authService){
    // authService.checkAuth();
    getEmailService.loadGmailApi();
}]);
