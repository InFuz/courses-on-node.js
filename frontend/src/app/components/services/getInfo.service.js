(function() {
  'use strict';
  angular
    .module('frontend')
    .service('getInfoService', getInfoService);

  /** @ngInject */
  function getInfoService($log, $http, $q, API_URL) {
    var vm = this;

    /* public */

    vm.getAllUsersInfo = getAllUsersInfo;
    vm.getAllMessages = getAllMessages;

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
          //$log.info(response);
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
