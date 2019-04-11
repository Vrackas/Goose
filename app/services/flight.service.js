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
            getFlightObject: getFlightObject,
            savePriceDetailObject: savePriceDetailObject,
            priceDetail: priceDetail
        };

        function getAirport(query) {
            return http.get('fake_db/airports.json').then(function (res) {
                return res.result;
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
            return http.post('http://localhost:8888/booking.php?query=flightSearch', data).then(function (res) {
                // return http.get('fake_db/flights.json', data).then(function (res) {
                let result = JSON.parse(JSON.parse(res));
                // result.result.flights.length = 20
                // console.log(result.result);
                // return result.result;
                // return result.result;
                // var result = res.result.filter(function (item) {
                //     return item.code.indexOf(query) !== -1;
                // });
                return result.result;
            });
        }

        function savePriceDetailObject(obj) {
            $localStorage.priceDetailObject = obj;
        }

        function priceDetail() {
            return http.post('http://localhost:8888/booking.php?query=priceDetail', $localStorage.priceDetailObject).then(function (res) {
                let result = JSON.parse(JSON.parse(res))
                return result.result;
            });
        }
    }
})();