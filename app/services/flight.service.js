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
            // var data1 = {
            //     "fromAirport": "KBP",
            //     "allinFromCity": true,
            //     "toAirport": "DPS",
            //     "fromDate": "2019-04-23",
            //     "returnDate": "2019-05-01",
            //     "adult": "1",
            //     "child": "1",
            //     "usePersonFares": true,
            //     "getBaggageInfo": true,
            //     "currency": "EUR"
            // };
            var data = getFlightObject();
            // return http.post('http://localhost:8888/booking.php', data).then(function (res) {
            return http.get('fake_db/flights.json', data).then(function (res) {
                // let result = JSON.parse(JSON.parse(res))
                // result.result.flights.length=20
                // console.log(result.result);
                // return result.result;
                return res;
                // var result = res.result.filter(function (item) {
                //     return item.code.indexOf(query) !== -1;
                // });
                // return res;
            });
        }
    }
})();