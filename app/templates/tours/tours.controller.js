;(function () {
    'use strict';

    angular.module('app')
        .controller('ToursController', ToursController);


    ToursController.$inject = ['http', 'flights', 'flightService', 'priceDetail'];

    function ToursController(http, flights, flightService, priceDetail) {
        let vm = this;
        if (typeof priceDetail !== 'undefined') {
            vm.flightPriceDetails = priceDetail;
        }
        if (typeof flights !== 'undefined') {
            init();
        }
        vm.flightDetail = flightService.getFlightObject();
        vm.selectedFlight = flightService.getSelectedFlight();
        console.log(vm.selectedFlight);

        function init() {
            let priceDetailObject = {
                searchId: flights.searchId,
                fareRefereces: [],
                passengers: [],
                currency: 'USD',
                cip: false
            };
            var _flights = flights.flights;
            var currentOrder = flightService.getFlightObject();
            var obj = {
                itineraryId: _flights[0].id,
                fareType: _flights[0].fares[0].type
            };

            priceDetailObject.fareRefereces.push(obj);
            /**
             * If 2 tickets
             */
            if (currentOrder.hasOwnProperty('returnDate')) {
                var obj = {
                    itineraryId: _flights[1].id,
                    fareType: _flights[1].fares[0].type
                };
                priceDetailObject.fareRefereces.push(obj)
            }

            /**
             * Saving passengers info
             * @type {{type: string, count: string|boolean}}
             */
            var adult = {
                'type': 'ADULT',
                'count': currentOrder.adult
            };
            priceDetailObject.passengers.push(adult);
            /**
             * Saving object
             */
            flightService.savePriceDetailObject(priceDetailObject);
            /**
             * Get Price details of Flight
             */
            getPriceDetails();
        }


        function getPriceDetails() {
            flightService.priceDetail().then(function (res) {
                vm.flightPriceDetails = res;
            })
        }
    }
})();