/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('frontend')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('API_URL', 'http://localhost:8080/api/');

})();
