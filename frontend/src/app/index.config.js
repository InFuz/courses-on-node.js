(function() {
  'use strict';

  angular
    .module('frontend')
    .config(config);

  /** @ngInject */
  function config($locationProvider, $logProvider) {
    $logProvider.debugEnabled(true);

    $locationProvider.html5Mode({
      enabled: true
    });
  }
})();
