'use strict';
angular.module('app').run(['$rootScope', '$state', '$stateParams', '$location', '$cookieStore', '$http', '$localStorage', 'appService', '$timeout',
    function($rootScope, $state, $stateParams, $location, $cookieStore, $http, $localStorage, appService, $timeout) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // You can set up the dev / prod / local

        $rootScope.base_url = appService.setEnvironment('local');
        $rootScope.globals = $cookieStore.get('globals') || {};
        /*if ($rootScope.globals && $rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.token;
        }*/
        $rootScope.session = $cookieStore.get('tiauses') || {};
        $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {

        });
    }
]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    function urlBuilder(viewFolderPath, viewPath) {
        return 'components/' + viewFolderPath + '/' + viewPath + '.view.html';
    }

    $urlRouterProvider.otherwise('/login');
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: urlBuilder('auth', 'auth'),
        controller: 'AuthCtrl',
        controllerAs: 'self',
        data: {
            pageTitle: 'Login'
        }
    }).state('app', {
        url: '/app',
        templateUrl: 'layout/sidebar.html'
    }).state('app.nodeserveruptime', {
        url: '/serveruptime',
        templateUrl: urlBuilder('nodeserveruptime', 'nodeserveruptime'),
        controller: 'NodeUptimeCtrl',
        controllerAs: 'self',
        data: {
            pageTitle: 'NodeJS -- server Uptime'
        }
    }).state('app.nodeadmin', {
        url: '/nodeadmin',
        templateUrl: urlBuilder('nodeadmin', 'nodeadmin'),
        controller: 'NodeAdminCtrl',
        controllerAs: 'self',
        data: {
            pageTitle: 'NodeJS -- Admin activities'
        }
    }).state('app.dashboard', {
        url: '/dashboard',
        templateUrl: urlBuilder('dashboard', 'dashboard'),
        controller: 'dashboardCtrl',
        controllerAs: 'self',
        data: {
            pageTitle: 'Control Panel'
        }
    }).state('app.redisadmin', {
        url: '/redisadmin',
        templateUrl: urlBuilder('redisadmin', 'redisadmin'),
        controller: 'redisAdminCtrl',
        controllerAs: 'self',
        data: {
            pageTitle: 'Control Panel'
        }
    });

    //$locationProvider.html5Mode(true);

}]);
