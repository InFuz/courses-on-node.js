(function() {
  'use strict';
  angular
    .module('frontend')
    .service('getAndSendInfoService', getAndSendInfoService);

  /** @ngInject */
  function getAndSendInfoService($log, $http, $q, API_URL) {
    var vm = this;

    /* public */

    vm.getAllUsersInfo = getAllUsersInfo;
    vm.getAllMessages = getAllMessages;
    vm.sendMessagesAndAuthor = sendMessagesAndAuthor;

    /* private */

    function getAllUsersInfo() {
      var def = $q.defer();

        $http({
          method: 'GET',
          url: API_URL + 'user'
        }).then(
          function(res) {
            //$log.info('User info response', response);
            def.resolve(res.data);
          },
          function(rej) {
            $log.warn('User info reject', rej);
            def.reject(rej);
          });

      return def.promise;
    }

    function getAllMessages() {
      var def = $q.defer();

      $http({
        method: 'GET',
        url: API_URL + 'message'
      }).then(
        function(res) {
          //$log.info(res);
          def.resolve(res.data);
        },
        function(rej) {
          $log.warn(rej);
          def.reject(rej);
        });

      return def.promise;
    }

    function sendMessagesAndAuthor(author, textMessage) {
      var def = $q.defer();
      $http({
        method: 'POST',
        url: API_URL + 'message',
        data: {
          author: author,
          text: textMessage
        }
      }).then(
        function(res) {
          //$log.info(res);
          def.resolve(res.data);
        },
        function(rej) {
          $log.warn(rej);
          def.reject(rej);
        });

      return def.promise;
    }
  }
})();
