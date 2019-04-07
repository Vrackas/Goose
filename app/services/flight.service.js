(function () {
    'use strict';
    angular
        .module('service.flight', [])
        .service('flightService', flight);

    flight.$inject = ['http', '$localStorage'];


    function flight(http, $localStorage) {
        return {
            getAirport: getAirport,
            save: save,
            getFlights: getFlights
        };

        function getAirport(query) {
            return http.get('fake_db/airports.json').then(function (res) {
                var result = res.result.filter(function (item) {
                    return item.code.indexOf(query) !== -1;
                });
                return result;
            });
        }

        function save(flightObject) {
            $localStorage.flight = flightObject;
        }

        function getFlights() {
            return http.get('fake_db/flights.json').then(function (res) {
                // var result = res.result.filter(function (item) {
                //     return item.code.indexOf(query) !== -1;
                // });
                return res;
            });
        }
    }
})();