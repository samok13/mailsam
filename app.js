var Vmail = angular.module('Vmail', ['ui.router'])
  .config(['$urlRouterProvider', '$stateProvider',
    function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/signin');
      $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'templates/signin.html',
        controller: 'authCtrl'
      })
      .state('email', {
        url: '/email',
        templateUrl: 'templates/email.html',
        controller: 'emailCtrl'
      });

    }
  ]);
