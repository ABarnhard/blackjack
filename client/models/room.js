(function(){
  'use strict';

  angular.module('blackjack')
    .factory('Room', ['$http', function($http){

      function create(room){
        return $http.post('/rooms', room);
      }

      function findAll(){
        return $http.get('/rooms');
      }

      return {create:create, findAll:findAll};
    }]);
})();

