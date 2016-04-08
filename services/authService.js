Vmail.factory('authService',
  ['$window',
  function($window) {
    var gapi = $window.gapi;

    var apiKey = "AIzaSyDVWTQxCJ83f2zCXgdvb_Z1Pj1HA1CnyCk";
    var clientId = "964487304071-isgtc4bqnc1otdfj5cegfdqb5gfkmsr1.apps.googleusercontent.com";
    var scopes =
      'https://www.googleapis.com/auth/gmail.readonly '+
      'https://www.googleapis.com/auth/gmail.send';

    var handleClientLoad = function() {
      gapi.client.setApiKey(apiKey);
      window.setTimeout(checkAuth, 1);
    };

    var checkAuth = function() {
      gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: true
      }, handleAuthResult);
    };

    var handleAuthClick = function() {
      gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: false
      }, handleAuthResult);
      return false;
    };

    var handleAuthResult = function(authResult) {
      if(authResult && !authResult.error) {
        loadGmailApi();
        $('#compose-button').removeClass("hidden");
        $('#authorize-button').remove();
        $('.table-inbox').removeClass("hidden");
      } else {
        $('#authorize-button').removeClass("hidden");
        $('#authorize-button').on('click', function(){
          handleAuthClick();
        });
      }
    };

    return {
      handleClientLoad: handleClientLoad
    };
}]);
