Vmail.factory('authService',
  ['$window', 'getEmailService', '$state',
  function($window, getEmailService, $state) {
    // var gapi = $window.gapi;

    var apiKey = "AIzaSyDVWTQxCJ83f2zCXgdvb_Z1Pj1HA1CnyCk";
    var clientId = "964487304071-isgtc4bqnc1otdfj5cegfdqb5gfkmsr1.apps.googleusercontent.com";
    var scopes =
      'https://www.googleapis.com/auth/gmail.readonly '+
      'https://www.googleapis.com/auth/gmail.send ' + 
      'https://www.googleapis.com/auth/gmail.labels ' + 
      'https://mail.google.com';

    var checkAuth = function() {
      $window.gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: true
      }, handleAuthResult);
    };

    var handleAuthClick = function() {
      $window.gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: false
      }, handleAuthResult);
      return false;
    };

    var handleAuthResult = function(authResult) {
      if(authResult && !authResult.error) {
        $state.go('index.inbox');
      }
    };

    return {
      handleAuthClick: handleAuthClick,
      checkAuth: checkAuth
    };
}]);
