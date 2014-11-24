(function(){
  'use strict';

  angular.module('blackjack')
    .controller('RoomsListCtrl', ['$scope', function($scope){

      $scope.chat = function(msg){
        window.socket.emit('global-chat', msg);
      };
      window.socket.on('bGlobal-chat', function(data){
        console.log(data);
        $('#messages').append('<div>'+data+'</div>');
      });

    }]);
})();
