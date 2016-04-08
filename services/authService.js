Vmail.factory('authService',
  ['$window', 'getEmailService', '$state',
  function($window, getEmailService, $state) {
    // var gapi = $window.gapi;

    var apiKey = "AIzaSyDVWTQxCJ83f2zCXgdvb_Z1Pj1HA1CnyCk";
    var clientId = "964487304071-isgtc4bqnc1otdfj5cegfdqb5gfkmsr1.apps.googleusercontent.com";
    var scopes =
      'https://www.googleapis.com/auth/gmail.readonly '+
      'https://www.googleapis.com/auth/gmail.send';

    var handleClientLoad = function() {
      $window.gapi.client.setApiKey(apiKey);
      $window.setTimeout(checkAuth, 1);
    };

    $window.handleClientLoad = handleClientLoad;

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
        getEmailService.loadGmailApi();
        $('#compose-button').removeClass("hidden");
        $('#authorize-button').remove();
        $('.table-inbox').removeClass("hidden");
        $state.go("index.inbox");
      } else {
        $('#authorize-button').removeClass("hidden");
        // $('#authorize-button').on('click', function(){
        //   handleAuthClick();
        // });
      }
    };

    return {
      handleClientLoad: handleClientLoad,
      handleAuthClick: handleAuthClick
    };
}]);
