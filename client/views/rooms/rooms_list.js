(function(){
  'use strict';

  angular.module('blackjack')
    .controller('RoomsListCtrl', ['$scope', function($scope){

      $scope.chat = function(msg){
        // msg = $scope.rootUserObject.username + ': ' + msg;
        var msgObj = {pic: 'url(' + $scope.rootUserObject.avatar + ')', msg: msg};
        window.socket.emit('global-chat', JSON.stringify(msgObj));
      };

      window.socket.on('bGlobal-chat', function(data){
        console.log(data);
        data = JSON.parse(data);
        var $msg = $('.hidden-chat-template .chat-message').clone();
        $msg.children('.user-pic').css('background-image', data.pic);
        $msg.children('.chat-message').text(data.msg);
        $('#messages').append($msg);
      });

    }]);
})();
