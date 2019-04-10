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
            getFlights: getFlights,
            getFlightObject: getFlightObject
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

        function getFlightObject() {
            return $localStorage.flight;
        }

        function getFlights() {
            var data = getFlightObject();
            return http.post('https://testapi.iati.com/rest/flightSearch/FF2DA8C0E6BEA332F970F6CB56A0C953', data).then(function (res) {
                // var result = res.result.filter(function (item) {
                //     return item.code.indexOf(query) !== -1;
                // });
                return res;
            });
        }
    }
})();