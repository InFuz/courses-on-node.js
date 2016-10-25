(function() {
  'use strict';
  angular
    .module('frontend')
    .service('socketService', socketService);

  /** @ngInject */
  function socketService(io, SOCKET_URL) {
    /*jshint validthis:true */
    var _this = this;
    _this.socket = undefined;
    _this.connect = connect;

    function connect() {
      _this.socket = io.connect(SOCKET_URL);
    }
  }
})();
