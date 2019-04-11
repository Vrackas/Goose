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
                controllerAs: 'vm',
                resolve: {
                    airports: function (flightService) {
                        return flightService.getAirport().then(function (result) {
                            return result;
                        });
                    }
                }
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
                controllerAs: 'vm',
                resolve: {
                    flights: function (flightService, $localStorage) {
                        if (typeof $localStorage.priceDetailObject === 'undefined')
                            return flightService.getFlights().then(function (result) {
                                $localStorage.searchFlightsResult = result;
                                return result;
                            });

                    },
                    priceDetail: function (flightService, $localStorage) {
                        if (typeof $localStorage.priceDetailObject !== 'undefined')
                            return flightService.priceDetail();
                    }
                }
            })
            .state('transfer_choose', {
                url: '/transfer_choose',
                templateUrl: 'templates/transfer_choose/transfer_choose.html',
                controller: 'TransferChooseController',
                controllerAs: 'vm'
            })
            .state('hotel_choose', {
                url: '/hotel_choose',
                templateUrl: 'templates/hotel_choose/hotel_choose.html',
                controller: 'HotelChooseController',
                controllerAs: 'vm'
            })
            .state('hotel_info', {
                url: '/hotel_info',
                templateUrl: 'templates/hotel_info/hotel_info.html',
                controller: 'HotelInfoController',
                controllerAs: 'vm'
            })
            .state('checkout', {
                url: '/checkout',
                templateUrl: 'templates/checkout/checkout.html',
                controller: '' +
                '',
                controllerAs: 'vm'
            })


        // $locationProvider.html5Mode(true);


    }


})();

