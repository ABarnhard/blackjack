(function(){
  'use strict';

  angular.module('blackjack')
    .controller('RoomsListCtrl', ['$scope', function($scope){
      $scope.check = 'I am in the rooms.list state';
    }]);
})();
