(function(){
  'use strict';

  angular.module('blackjack')
    .controller('RoomsListCtrl', ['$scope', 'Room', function($scope, Room){
      $scope.rooms = [];

      Room.findAll().then(function(res){
        $scope.rooms = res.data;
      });

      $scope.chat = function(msg){
        // msg = $scope.rootUserObject.username + ': ' + msg;
        var msgObj = {pic: 'url(' + $scope.rootUserObject.avatar + ')', msg: msg};
        window.socket.emit('global-chat', JSON.stringify(msgObj));
        $scope.message = '';
      };

      window.socket.on('bGlobal-chat', function(data){
        // console.log(data);
        data = JSON.parse(data);
        var $msg = $('.hidden-chat-template .chat-message').clone();
        $msg.children('.user-pic').css('background-image', data.pic);
        $msg.children('.chat-message').text(data.msg);
        $('#messages').append($msg);
        $('#chat-box').focus();
      });

      $scope.createRoom = function(){
        Room.create($scope.newRoom).then(function(res){
          $scope.rooms.push(res.data);
          $scope.newRoom = {};
        }, function(){
          toastr.error('Error during room creation.');
          $scope.newRoom = {};
        });
      };

      $scope.joinRoom = function(room){
        console.log(room);
      };
    }]);
})();
