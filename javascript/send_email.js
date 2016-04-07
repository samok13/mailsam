      function sendEmail(){
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
      }

      function sendMessage(headers_obj, message, callback)
      {
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
      }

      function composeTidy()
      {
        $('#compose-modal').modal('hide');

        $('#compose-to').val('');
        $('#compose-subject').val('');
        $('#compose-message').val('');

        $('#send-button').removeClass('disabled');
      }