(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ui.calendar'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
                .state('profil', {
                url: '/profil',
                templateUrl: 'profil/index.html',
                controller: 'Profil.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'profil' }
            })
            .state('servicii', {
                url: '/servicii',
                templateUrl: 'servicii/index.html',
                controller: 'Servicii.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'servicii' }

            })
            
                .state('studenti', {
                url: '/studenti',
                templateUrl: 'studenti/index.html',
                controller: 'Studenti.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'studenti' }
            })
                .state('profesori', {
                url: '/profesori',
                templateUrl: 'profesori/index.html',
                controller: 'Profesori.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'profesori' }
            })
             .state('asii', {
                url: '/asii',
                templateUrl: 'asii/index.html',
                controller: 'Asii.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'asii' }
            });


    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();