;(function () {
    'use strict';

    angular.module('app')
        .controller('FlightController', FlightController);

    FlightController.$inject = ['flightService', 'flights'];

    function FlightController(flightService, flights) {
        // console.log(flights);

        let vm = this;
        vm.flights = flights.flights;
        vm.filterByStops = filterByStops;
        vm.transformDate = transformDate;
        vm.filterByDuration = filterByDuration;
        vm.transformDay = transformDay;
        vm.setTicket = setTicket;
        vm.backToTheTour = backToTheTour;
        let priceDetailObject = {
            searchId: flights.searchId,
            fareRefereces: [],
            passengers: [],
            currency: 'USD',
            cip: false
        };
        vm.selectedFlight = [];

        function transformDate(date) {
            if (typeof date !== 'undefined')
                return date.substr(11, 5)
        }

        function transformDay(date) {
            var date = new Date(date);
            return date.toString().substr(0, 10);

        }

        /**
         * Need to refactoring
         * @param count
         * @param checked
         * @param more
         */
        function filterByStops(count, checked, more) {
            if (checked) {
                vm.flights = flights.flights;
            }
            else {
                vm.flights = vm.flights.filter(function (item) {
                    if (more) {
                        return item.legs.length >= count;
                    }
                    return item.legs.length === count;
                })
            }
            init();
        }

        /**
         * Need to refactoring
         * @param hour_s
         * @param hour_f
         * @param checked
         */
        function filterByDuration(hour_s, hour_f, checked) {
            if (checked) {
                vm.flights = flights.flights;
            } else {
                vm.flights = vm.flights.filter(function (item) {
                    return (item.flightTimeHour >= hour_s && item.flightTimeHour <= hour_f);
                })
            }
            init();

        }


        function setTicket(flight) {
            vm.selectedFlight.push(flight.legs);
            var obj = {
                itineraryId: flight.id,
                fareType: flight.fares[0].type
            };
            if (_checkTicketIfExist(flight)) {
                _removeTicketIfExist(flight)

            } else {
                priceDetailObject.fareRefereces.push(obj);

            }
            console.log(priceDetailObject);
        }


        function backToTheTour() {
            var tourInfo = flightService.getFlightObject();
            var adult = {
                'type': 'ADULT',
                'count': tourInfo.adult
            };
            priceDetailObject.passengers.push(adult);
            flightService.savePriceDetailObject(priceDetailObject);
            flightService.saveSelectedFlight(vm.selectedFlight);

        }

        function _checkTicketIfExist(flight) {
            return priceDetailObject.fareRefereces.some(function (item) {
                return item.itineraryId === flight.id;
            })
        }

        function _removeTicketIfExist(flight) {
            priceDetailObject.fareRefereces.forEach(function (item, index, array) {
                if (item.itineraryId === flight.id) {
                    array.splice(index, 1);
                }
            })
        }

        $(document).ready(function () {

            init();
        });

        function init() {


            // accordion effect
            setTimeout(function () {
                let acc = document.getElementsByClassName("accordion");
                let i;

                for (i = 0; i < acc.length; i++) {
                    acc[i].addEventListener("click", function () {
                        this.classList.toggle("active");
                        var panel = this.nextElementSibling;
                        if (panel.style.maxHeight) {
                            panel.style.maxHeight = null;
                        } else {
                            panel.style.maxHeight = panel.scrollHeight + "px";
                        }
                    });
                }
            }, 1000);
        }
    }
})();