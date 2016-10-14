(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(getAndSendInfoService) {
    var main = this;

    getAllMessages();

    main.send = sendMessage;

    function sendMessage() {
      getAndSendInfoService.sendMessagesAndAuthor(main.user.username, main.user.usermessage).then(function() {
        getAllMessages();
        main.user.usermessage = '';
      });
    }

    function getAllMessages() {
      getAndSendInfoService.getAllMessages().then(function(res) {
        console.log(res);
        if (res.length) {
          main.messages = res;
        }
      });
    }

    // getAndSendInfoService.getAllUsersInfo().then(function(res) {
    //   //main.userInfo = res;
    //   console.log(res);
    // });

  }
})();
