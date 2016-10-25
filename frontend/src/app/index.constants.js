/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('frontend')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('io', io)
    .constant('SOCKET_URL', 'http://localhost:8088/')
    .constant('API_URL', 'http://localhost:8080/api/');

})();
