;(function () {
    'use strict';

    angular.module('app')
        .controller('FlightController', FlightController);

    FlightController.$inject = ['flightService', 'flights'];

    function FlightController(flightService, flights) {
        console.log(flights);
        $(document).ready(function () {

            // accordion effect

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

        });
    }
})();