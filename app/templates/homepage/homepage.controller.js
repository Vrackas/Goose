;(function () {
    'use strict';

    angular.module('app')
        .controller('HomepageController', HomepageController);


    HomepageController.$inject = ['flightService'];

    function HomepageController(flightService) {
        var vm = this;
        vm.flight =
            {
                "fromAirport": "KBP",
                "allinFromCity": true,
                "toAirport": "DPS",
                "fromDate": "2019-04-23",
                "returnDate": "2019-05-01",
                "adult":  "1",
                "child": "1",
                "usePersonFares": true,
                "getBaggageInfo": true,
                "currency": "EUR"
            };

        vm.searchModel = {
            from: '',
            to: ''
        };
        vm.searchTour = searchTour;
        vm.changeInput = changeInput;
        vm.date = new Date;


        function changeInput(query, type) {
            // vm.flight[type] = {};
            if (query.length < 3)
                return false;
            flightService.getAirport(query).then(function (result) {
                if (result.length > 0) {
                    if (type === 'from') {
                        vm.flight.fromAirport = result[0].code;
                    } else if (type === 'to') {
                        vm.flight.toAirport = result[0].code;
                    }
                    // vm.flight[type].code = result[0].code;
                    // vm.flight[type].cityName = result[0].cityName;
                    vm.searchModel[type] = result[0].cityName + " " + result[0].name + " (" + result[0].code + "), " + result[0].countryCode;
                }
                console.log(result);

            });
        }

        function searchTour() {
            // if (vm.flight.from.code.length === 3 && vm.flight.to.code.length === 3)
                flightService.save(vm.flight);
            console.log(vm.flight);
        }
    }
})();