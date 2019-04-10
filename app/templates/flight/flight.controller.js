;(function () {
    'use strict';

    angular.module('app')
        .controller('FlightController', FlightController);

    FlightController.$inject = ['flightService', 'flights'];

    function FlightController(flightService, flights) {
        // console.log(flights);
        let vm = this;
        vm.flights = flights.flights;


        $(document).ready(function () {

            // accordion effect

            let acc = document.getElementsByClassName("accordion");
            let i;

            for (i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function () {
                    console.log('test');
                    this.classList.toggle("active");
                    let panel = this.nextElementSibling;
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                });
            }

        });
    }
})();