;(function () {
    'use strict';

    angular.module('app')
        .controller('HomepageController', HomepageController);


    HomepageController.$inject = ['flightService', 'airports', '$filter'];

    function HomepageController(flightService, airports, $filter) {
        var vm = this;
        vm.flight =
            {
                "fromAirport": "",
                "allinFromCity": true,
                "toAirport": "",
                // "fromDate": "2019-04-23",
                // "returnDate": "2019-05-01",
                "adult": "1",
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
        vm.dateFrom = new Date;
        vm.dateTo = new Date;
        vm.persons = 1;
        vm.personMath = personMath;
        vm.searchText;
        vm.from = [airports[0], airports[1], airports[2]];
        vm.to = [airports[0], airports[1], airports[2]];

        function changeInput(query, type) {
            if (type === 'from')
                vm.from = airports.filter(function (item) {
                    return item.code.indexOf(query) !== -1 || item.cityName.indexOf(query) !== -1
                });
            if (type === 'to')
                vm.to = airports.filter(function (item) {
                    return item.code.indexOf(query) !== -1 || item.cityName.indexOf(query) !== -1
                });
        }

        function searchTour() {
            vm.flight.fromDate = $filter('date')(vm.flight.fromDate, 'yyyy-MM-dd');
            vm.flight.returnDate = $filter('date')(vm.flight.returnDate, 'yyyy-MM-dd');

            vm.flight.fromAirport = vm.flight.fromAirport.code;
            vm.flight.toAirport = vm.flight.toAirport.code;
            // if (vm.flight.from.code.length === 3 && vm.flight.to.code.length === 3)
            flightService.save(vm.flight);
            console.log(vm.flight);
        }

        function personMath(button) {
            if (button) {
                vm.flight.adult++
            }
            else if (!button) {
                if (vm.flight.adult >= 2) {
                    vm.flight.adult--
                }

            }
        }
    }
})();