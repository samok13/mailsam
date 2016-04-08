Vmail.controller('draftCtrl',
  ['$scope','getEmailService','sendEmailService','authService',
  function($scope, getEmailService, sendEmailService, authService){
    // authService.checkAuth();
    getEmailService.loadDraftGmailApi();
}]);