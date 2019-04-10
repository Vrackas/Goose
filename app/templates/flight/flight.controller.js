;(function () {
    'use strict';

    angular.module('app')
        .controller('FlightController', FlightController);

    FlightController.$inject = ['flightService', 'flights'];

    function FlightController(flightService, flights) {
        // console.log(flights);
        var vm = this;
        vm.flights = flights.flights;
        vm.filterByStops = filterByStops;
        vm.transformDate = transformDate;
        vm.filterByDuration = filterByDuration;

        function transformDate(date) {
            return date.substr(11, 5)
        }

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
        }

        function filterByDuration(hour_s, hour_f, checked) {
            if (checked) {
                vm.flights = flights.flights;
            } else {
                vm.flights = vm.flights.filter(function (item) {
                    return (item.flightTimeHour >= hour_s && item.flightTimeHour <= hour_f);
                })
            }

        }

        $(document).ready(function () {

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
            }, 3000)


        });
    }
})();