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
      .state('index', {
        url: '/inbox',
        abstract: true,
        controller: 'authCtrl',
        views: {
          '': {
            templateUrl: 'templates/index.html'
          },
          'navbar': {
            templateUrl: 'templates/navbar.html'
          },
          'leftPanel': {
            templateUrl: 'templates/leftPanel.html'
          }
        }
      })
      // .state('index.compose', {
      //   url: '/compose',
      //   templateUrl: 'templates/compose.html',
      //   controller: 'composeCtrl'
      // })
      .state('index.inbox', {
        url: '',
        templateUrl: 'templates/inbox.html',
        controller: 'inboxCtrl'
      })
      // .state('index.starred', {
      //   url: '/starred',
      //   templateUrl: 'templates/starred.html',
      //   controller: 'starredCtrl'
      // })
      // .state('index.sent', {
      //   url: '/sent',
      //   templateUrl: 'templates/sent.html',
      //   controller: 'sentCtrl'
      // })
      // .state('index.draft', {
      //   url: '/draft',
      //   templateUrl: 'templates/draft.html',
      //   controller: 'draftCtrl'
      // });

    }
  ]);
