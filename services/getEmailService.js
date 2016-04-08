Vmail.factory('getEmailService', ['$window', function($window){

  var gapi = $window.gapi;
  var messages = [];

  var loadGmailApi = function() {
    $window.gapi.client.load('gmail', 'v1', displayInbox);
  };

  var displayInbox = function() {
    messages = [];

    var request = $window.gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'labelIds': 'INBOX',
      'maxResults': 10
    });

    request.execute(function(response) {
      $.each(response.messages, function() {
        var messageRequest = $window.gapi.client.gmail.users.messages.get({
          'userId': 'me',
          'id': this.id
        });
        messageRequest.execute(appendMessageRow);
        // messageRequest.execute(function(message) {
        //   message.push(message);
        // });
      });
    });


  };


  var appendMessageRow = function(message) {

    var reply_to = (getHeader(message.payload.headers, 'Reply-to') !== '' ?
      getHeader(message.payload.headers, 'Reply-to') :
      getHeader(message.payload.headers, 'From')).replace(/\"/g, '&quot;');

    var reply_subject = 'Re: '+getHeader(message.payload.headers, 'Subject').replace(/\"/g, '&quot;');

    $('.table-inbox tbody').append(
      '<tr>\
        <td>'+getHeader(message.payload.headers, 'From')+'</td>\
        <td>\
          <a href="#message-modal-' + message.id +
            '" data-toggle="modal" id="message-link-' + message.id+'">' +
            getHeader(message.payload.headers, 'Subject') +
          '</a>\
        </td>\
        <td>'+getHeader(message.payload.headers, 'Date')+'</td>\
      </tr>'
    );
    $('body').append(
      '<div class="modal fade" id="message-modal-' + message.id +
          '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\
        <div class="modal-dialog modal-lg">\
          <div class="modal-content">\
            <div class="modal-header">\
              <button type="button"\
                      class="close"\
                      data-dismiss="modal"\
                      aria-label="Close">\
                <span aria-hidden="true">&times;</span></button>\
              <h4 class="modal-title" id="myModalLabel">' +
                getHeader(message.payload.headers, 'Subject') +
              '</h4>\
            </div>' + 
            '<div class="modal-body">\
              <iframe id="message-iframe-'+message.id+'" srcdoc="<p>Loading...</p>">\
              </iframe>\
            </div>\
            <div class="modal-footer">\
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
              <button type="button" class="btn btn-primary reply-button" data-dismiss="modal" data-toggle="modal" data-target="#reply-modal"\
                onclick="fillInReply(\
                  \''+reply_to+'\', \
                  \''+reply_subject+'\', \
                  \''+getHeader(message.payload.headers, 'Message-ID')+'\'\
                );"\
              >Reply</button>\
            </div>\
          </div>\
        </div>\
      </div>'
    );
    $('#message-link-'+message.id).on('click', function(){
      var ifrm = $('#message-iframe-'+message.id)[0].contentWindow.document;
      $('body', ifrm).html(getBody(message.payload));
    });
  };

  var getHeader = function(headers, index) {
    var header = '';
    $.each(headers, function(){
      if(this.name === index){
        header = this.value;
      }
    });
    return header;
  };

  var getBody = function(message) {
    var encodedBody = '';
    if(typeof message.parts === 'undefined')
    {
      encodedBody = message.body.data;
    }
    else
    {
      encodedBody = getHTMLPart(message.parts);
    }
    encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
    return decodeURIComponent(escape(window.atob(encodedBody)));
  };

  var getHTMLPart = function(arr) {
    for(var x = 0; x <= arr.length; x++)
    {
      if(typeof arr[x].parts === 'undefined')
      {
        if(arr[x].mimeType === 'text/html')
        {
          return arr[x].body.data;
        }
      }
      else
      {
        return getHTMLPart(arr[x].parts);
      }
    }
    return '';
  };

  function fillInReply(to, subject, message_id)
  {
    $('#reply-to').val(to);
    $('#reply-subject').val(subject);
    $('#reply-message-id').val(message_id);
  }

  function sendReply()
  {
    $('#reply-button').addClass('disabled');

    sendMessage(
      {
        'To': $('#reply-to').val(),
        'Subject': $('#reply-subject').val(),
        'In-Reply-To': $('#reply-message-id').val()
      },
      $('#reply-message').val(),
      replyTidy
    );

    return false;
  }

  function replyTidy()
    {
      $('#reply-modal').modal('hide');
      $('#reply-message').val('');
      $('#reply-button').removeClass('disabled');
    }


  return{
    loadGmailApi: loadGmailApi
  };


}]);
