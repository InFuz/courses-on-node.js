(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(getAndSendInfoService) {
    var main = this;

    main.send = sendMessage;
    getAllMessages();

    function sendMessage() {
      getAndSendInfoService.sendMessagesAndAuthor(main.user.username, main.user.usermessage).then(function() {
        getAllMessages();
      });
      main.user.usermessage = '';
    }

    function getAllMessages() {
      getAndSendInfoService.getAllMessages().then(function(res) {
        console.log(res);
        main.messages = res;
      });
    }

    // getAndSendInfoService.getAllUsersInfo().then(function(res) {
    //   //main.userInfo = res;
    //   console.log(res);
    // });

  }
})();
