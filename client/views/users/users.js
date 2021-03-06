(function(){
  'use strict';

  angular.module('blackjack')
    .controller('UsersCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
      $scope.user = {};
      $scope.mode = $state.current.name;

      $scope.submit = function(){
        if($scope.mode === 'register'){
          User.register($scope.user).then(function(response){
            toastr.success('User successfully registered.');
            $state.go('login');
          }, function(){
            toastr.error('Error during registration.');
            $scope.user = {};
          });
        }else{
          User.login($scope.user).then(function(response){
            $rootScope.rootUserObject = response.data;
            $rootScope.$broadcast('user', response.data);
            toastr.success('User successfully authenticated.');
            $state.go('home');
          }, function(){
            toastr.error('Error during authentication.');
            $scope.user = {};
          });
        }
      };
    }]);
})();
