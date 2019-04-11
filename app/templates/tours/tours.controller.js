;(function () {
    'use strict';

    angular.module('app')
        .controller('ToursController', ToursController);


    ToursController.$inject = ['http', 'flights', 'flightService', 'priceDetail', 'hotels'];

    function ToursController(http, flights, flightService, priceDetail, hotels) {
        let vm = this;
        vm.transformTime = transformTime;
        vm.transformDate = transformDate;
        vm.isFlightsAvailable = true;
        if (typeof priceDetail !== 'undefined') {
            vm.flightPriceDetails = priceDetail;
        }
        vm.selectedFlight = flightService.getSelectedFlight();
        if (typeof vm.selectedFlight === 'undefined') {
            vm.selectedFlight = [];
        }
        if (typeof flights !== 'undefined') {
            vm.isFlightsAvailable = flights.flights.length;
            if (flights.flights.length > 0)
                init();
        }
        vm.flightDetail = flightService.getFlightObject();
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
            vm.selectedFlight.push(_flights[0].legs);


            priceDetailObject.fareRefereces.push(obj);
            /**
             * If 2 tickets
             */
            if (currentOrder.hasOwnProperty('returnDate')) {
                var obj = {
                    itineraryId: _flights[1].id,
                    fareType: _flights[1].fares[0].type
                };
                vm.selectedFlight.push(_flights[1].legs);

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
            flightService.saveSelectedFlight(vm.selectedFlight);
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


        function transformTime(date) {
            if (typeof date !== 'undefined')
                return date.substr(11, 5)
        }

        function transformDate(date) {
            if (typeof date !== 'undefined')
                return date.substr(0, 10)
        }
    }
})();