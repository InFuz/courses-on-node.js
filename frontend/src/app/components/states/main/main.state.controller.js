(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(io, SOCKET_URL, getAndSendInfoService) {
    var main = this;

    main.send = sendMessage;

    var socket = io(SOCKET_URL);
    getAllMessages();

    function sendMessage() {
      socket.emit('chat message', main.user.usermessage);
      getAndSendInfoService.sendMessagesAndAuthor(main.user.username, main.user.usermessage);
      main.user.usermessage = '';
    }

    socket.on('chat message', function(){
      getAllMessages();
    });

    function getAllMessages() {
      getAndSendInfoService.getAllMessages().then(function(res) {
        console.log(res);
        main.messages = res;
      });
    }

  }
})();
