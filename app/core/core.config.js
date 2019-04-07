;(function () {
    angular
        .module('app')
        .config(mainConfig);


    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$translateProvider', '$mdGestureProvider'];

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
            .state('flights', {
                url: '/flights',
                templateUrl: 'templates/flight/flight.html',
                controller: 'FlightController',
                controllerAs: 'vm',
                resolve: {
                    flights: function (flightService) {
                        return flightService.getFlights().then(function (result) {
                            return result;
                        });
                    }
                }
            })
            .state('tours', {
            url: '/tours',
            templateUrl: 'templates/tours/tours.html',
            controller: 'ToursController',
            controllerAs: 'vm'
        })


        // $locationProvider.html5Mode(true);


    }


})();

