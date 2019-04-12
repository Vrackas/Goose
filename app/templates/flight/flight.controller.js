;(function () {
    'use strict';

    angular.module('app')
        .controller('FlightController', FlightController);

    FlightController.$inject = ['flightService', 'flights'];

    function FlightController(flightService, flights) {
        // console.log(flights);
        let itemPerPage = 20;
        let vm = this;
        vm.totalProposals = flights.flights.length;
        vm.flights = flights.flights.slice(0, itemPerPage);
        vm.filterByStops = filterByStops;
        vm.transformDate = transformDate;
        vm.filterByDuration = filterByDuration;
        vm.transformDay = transformDay;
        vm.setTicket = setTicket;
        vm.backToTheTour = backToTheTour;
        vm.filterByCabin = filterByCabin;
        vm.filterByLayover = filterByLayover;
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
            vm.currentPage = 1;
            if (checked) {
                vm.flights = flights.flights;
            }
            else {
                vm.flights = flights.flights.filter(function (item) {
                    if (more) {
                        return item.legs.length > 2;
                    }
                    return item.legs.length === count;
                })
            }
            vm.flights = vm.flights.slice(0, itemPerPage);
            init();
        }

        /**
         * Need to refactoring
         * @param hour_s
         * @param hour_f
         * @param checked
         */
        function filterByDuration(hour_s, hour_f, checked) {
            vm.currentPage = 1;
            if (checked) {
                vm.flights = flights.flights;
            } else {
                vm.flights = flights.flights.filter(function (item) {
                    return (item.flightTimeHour >= hour_s && item.flightTimeHour <= hour_f);
                })
            }
            vm.flights = vm.flights.slice(0, itemPerPage);

            init();

        }

        function filterByLayover(hour_s, hour_f, checked) {
            vm.currentPage = 1;
            if (checked) {
                vm.flights = flights.flights;
            } else {
                vm.flights = flights.flights.filter(function (item) {
                    return ((item.layoverTime / 60) >= hour_s && (item.layoverTime / 60) <= hour_f);
                })
            }
            vm.flights = vm.flights.slice(0, itemPerPage);

            init();

        }


        function filterByCabin(type, checked) {
            if (checked) {
                vm.flights = flights.flights;
            } else {
                vm.flights = flights.flights.filter(function (item) {
                    return (item.fares[0].type.toLowerCase() === type.toLowerCase());
                });
                if (type === 'mixed') {
                    vm.flights = flights.flights;

                }
            }
            vm.flights = vm.flights.slice(0, itemPerPage);

            init();
        }


        function setTicket(flight) {
            vm.selectedFlight.push(flight);
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
            if (priceDetailObject.fareRefereces.length > 0)
                flightService.savePriceDetailObject(priceDetailObject);
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
            loadPagination();

            // accordion effect
            setTimeout(function () {
                let acc = document.getElementsByClassName("accordion");
                let i;

                for (i = 0; i < acc.length; i++) {
                    var click = function () {
                        this.classList.toggle("active");
                        var panel = this.nextElementSibling;
                        if (panel.style.maxHeight) {
                            panel.style.maxHeight = null;
                        } else {
                            panel.style.maxHeight = panel.scrollHeight + "px";
                        }
                    }
                    acc[i].removeEventListener("click", click, true);
                    acc[i].addEventListener("click", click);
                }
            }, 1000);
        }


        /**
         * Pagination
         */

        function loadPagination() {
            vm.totalPages = vm.flights.length / itemPerPage;
            vm.currentPage = 1;
        }

        vm.onPageChange = function () {
            var start = (vm.currentPage - 1) * itemPerPage;
            vm.flights = vm.flights.slice(start, itemPerPage * vm.currentPage);
            console.log(vm.currentPage);
        };
    }
})();