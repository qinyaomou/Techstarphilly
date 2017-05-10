var testPortalApp = angular.module('testPortalApp', ['ui.router', 'ui.bootstrap', 'ui.calendar']);

testPortalApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES  ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'components/home/home.html'
        })

        .state('mockInterview', {
            url: '/mockInterview',
            templateUrl: 'components/mockInterview/home.html'
        })

        .state('baHome', {
            url: '/baHome',
            templateUrl: 'components/ba/home.html'
        })

        .state('uiHome', {
            url: '/uiHome',
            templateUrl: 'components/ui/home.html'
        })

        .state('htmlQuestions', {
            url: '/htmlQuestions',
            templateUrl: 'components/ui/htmlQuestions.html'
        })

        .state('cssQuestions', {
            url: '/cssQuestions',
            templateUrl: 'components/ui/cssQuestions.html'
        })

        .state('javascriptQuestions', {
            url: '/javascriptQuestions',
            templateUrl: 'components/ui/javascriptQuestions.html'
        })

        .state('jqueryQuestions', {
            url: '/jqueryQuestions',
            templateUrl: 'components/ui/jqueryQuestions.html'
        })

        .state('angularjsQuestions', {
            url: '/angularjsQuestions',
            templateUrl: 'components/ui/angularjsQuestions.html'
        })

        .state('otherQuestions', {
            url: '/otherQuestions',
            templateUrl: 'components/ui/otherQuestions.html'
        })

        .state('userProfile', {
            url: '/userProfile',
            templateUrl: 'components/profile/userProfile.html'
        })

        .state('userDetail', {
            url: '/userDetail',
            templateUrl: 'components/profile/userDetail.html'
        })

        .state('userDetail.sendNotification', {
            url: '/sendNotification/{email}',
            templateUrl: 'components/profile/sendNotification.html',
            controller: function($scope, $stateParams) {
                // get the email
                $scope.email = $stateParams.email;
   
            }
        })


    $locationProvider.html5Mode(true);
                
});

