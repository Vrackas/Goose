;(function () {
    angular
        .module('app')
        .config(mainConfig);


    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider','$translateProvider','$mdGestureProvider'];

    function mainConfig($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider, $mdGestureProvider) {

        $mdGestureProvider.skipClickHijack();
        $urlRouterProvider.otherwise('/');


        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'templates/homepage/homepage.html',
                controller: 'HomepageController',
                controllerAs: 'vm'
            })



        // $locationProvider.html5Mode(true);


    }


})();

