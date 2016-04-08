var apiKey = "AIzaSyDVWTQxCJ83f2zCXgdvb_Z1Pj1HA1CnyCk";
var clientId = "964487304071-isgtc4bqnc1otdfj5cegfdqb5gfkmsr1.apps.googleusercontent.com";
var scopes =
  'https://www.googleapis.com/auth/gmail.readonly '+
  'https://www.googleapis.com/auth/gmail.send';

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth, 1);
}
function checkAuth() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: true
  }, handleAuthResult);
}
function handleAuthClick() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: false
  }, handleAuthResult);
  return false;
}
function handleAuthResult(authResult) {
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
}
