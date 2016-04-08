Vmail.factory('sendEmailService', ['$window', function($window){

  var gapi = $window.gapi;

  var sendEmail = function(){
    $('#send-button').addClass('disabled');
    sendMessage(
      {
        'To': $('#compose-to').val(),
        'Subject': $('#compose-subject').val()
      },
      $('#compose-message').val(),
      composeTidy
    );
    return false;
  };

  var sendMessage = function(headers_obj, message, callback){
    var email = '';

    for(var header in headers_obj)
      email += header += ": "+headers_obj[header]+"\r\n";

    email += "\r\n" + message;

    var sendRequest = gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': {
        'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
      }
    });

    return sendRequest.execute(callback);
  };

  var composeTidy = function(){
    $('#compose-modal').modal('hide');
    $('#compose-to').val('');
    $('#compose-subject').val('');
    $('#compose-message').val('');
    $('#send-button').removeClass('disabled');
  };

  return{
    sendEmail: sendEmail,
    sendMessage: sendMessage
  };

}]);
