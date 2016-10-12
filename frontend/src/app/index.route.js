(function() {
  'use strict';

  angular
    .module('frontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/states/main/main.html'
        //controller: 'MainController',
        //controllerAs: 'main'
      });


    $urlRouterProvider.otherwise('/');
  }

})();
