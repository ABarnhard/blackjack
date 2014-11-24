(function(){
  'use strict';

  angular.module('blackjack', ['ui.router', 'LocalForageModule'])
    .config(['$stateProvider', '$urlRouterProvider', '$localForageProvider', function($stateProvider, $urlRouterProvider, $localForageProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home',     {url:'/',         templateUrl:'/views/home/home.html'})
        .state('register', {url:'/register', templateUrl:'/views/users/users.html', controller:'UsersCtrl'})
        .state('login',    {url:'/login',    templateUrl:'/views/users/users.html', controller:'UsersCtrl'});

      $localForageProvider.config({name:'hapi-auth', storeName:'cache', version:1.0});
    }])
    .run(['$rootScope', '$http', function($rootScope, $http){
      $http.get('/status').then(function(response){
        $rootScope.$broadcast('user', response.data);
      }, function(){
        $rootScope.$broadcast('user', null);
      });

      window.socket = io.connect('/');
      window.socket.on('online', function(){
        $rootScope.$broadcast('online');
      });
    }]);
})();
