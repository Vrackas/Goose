;(function () {
    angular
        .module('app')
        .config(mainConfig);


    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$translateProvider', '$mdGestureProvider', 'cfpLoadingBarProvider'];

    function mainConfig($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider, $mdGestureProvider, cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
        // cfpLoadingBarProvider.includeBar = true;

        cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
        cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">We are looking best proposals for you. Please wait...</div>';
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
                    },
                    hotels: function (hotelService, $localStorage) {
                        // return hotelService.getHotelsByAutoComplete().then(function (res) {
                        //     $localStorage.searchHotelsResult = res;
                        //     return hotelService.getHotelsByAutoCompleteId(res[0].id).then(function (result) {
                        //         debugger
                        //         return result;
                        //     });
                        // })
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

