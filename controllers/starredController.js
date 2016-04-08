Vmail.controller('starredCtrl',
  ['$scope','getEmailService','sendEmailService','authService',
  function($scope, getEmailService, sendEmailService, authService){
    // authService.checkAuth();
    getEmailService.loadStarredGmailApi();
}]);