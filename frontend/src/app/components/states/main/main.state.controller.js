(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(getInfoService) {
    var main = this;

    getInfoService.getAllUsersInfo().then(function(res) {
      //main.userInfo = res;
      console.log(res);
    });

    getInfoService.getAllMessages().then(function(res) {
      console.log(res);
    });
  }
})();
