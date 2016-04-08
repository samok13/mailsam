Vmail.controller('inboxCtrl',
  ['$scope','getEmailService','sendEmailService','authService',
  function($scope, getEmailService, sendEmailService, authService){
    // authService.checkAuth();
    getEmailService.loadInboxGmailApi();
    // getEmailService.loadLabelsGmailApi();
}]);
