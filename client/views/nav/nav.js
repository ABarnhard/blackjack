(function(){
  'use strict';

  angular.module('blackjack')
    .controller('NavCtrl', ['$scope', '$state', 'User', function($scope, $state, User){
      $scope.$on('user', function(e, user){
        $scope.user = user;
        $scope.init = true;
        console.log(user);
      });

      $scope.$on('online', function(){
        $scope.online = true;
        $scope.$digest();
      });

      $scope.logout = function(){
        User.logout().then(function(){
          $scope.user = null;
          $scope.rootUserObject = null;
          toastr.success('User successfully logged out.');
          $state.go('home');
        });
      };
    }]);
})();
