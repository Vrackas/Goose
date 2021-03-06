;(function () {
    'use strict';

    angular.module('app')
        .controller('HomepageController', HomepageController);


    HomepageController.$inject = ['flightService', 'airports', '$filter', '$state', '$localStorage'];

    function HomepageController(flightService, airports, $filter, $state, $localStorage) {
        $localStorage.$reset();

        var vm = this;
        vm.priceLimit = 0;
        vm.flight =
            {
                // "fromAirport": ,
                "allinFromCity": true,
                // "toAirport": "",
                // "fromDate": "2019-04-23",
                // "returnDate": "2019-05-01",
                "adult": "1",
                "child": "1",
                "usePersonFares": true,
                "getBaggageInfo": true,
                "currency": "USD"
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
                    return item.code.toLowerCase().indexOf(query) !== -1 || item.cityName.toLowerCase().indexOf(query) !== -1
                });
            if (type === 'to')
                vm.to = airports.filter(function (item) {
                    return item.code.toLowerCase().indexOf(query) !== -1 || item.cityName.toLowerCase().indexOf(query) !== -1
                });
        }

        function searchTour() {
            var isValid = flightValidation();
            if (isValid) {
                vm.flight.fromDate = $filter('date')(vm.flight.fromDate, 'yyyy-MM-dd');
                if (typeof vm.flight.returnDate !== 'undefined')
                    vm.flight.returnDate = $filter('date')(vm.flight.returnDate, 'yyyy-MM-dd');
                vm.flight.fromAirport = vm.searchModel.fromAirport.code;
                vm.flight.toAirport = vm.searchModel.toAirport.code;
                $localStorage.priceLimit = vm.priceLimit
                flightService.save(vm.flight);
                $state.go('tours');
            } else {
                alert('Не заполнено одно или несколько полей');
            }
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

        function flightValidation() {
            return typeof vm.flight.fromAirport !== 'undefined' && typeof vm.flight.toAirport !== 'undefined' && typeof vm.flight.fromDate !== 'undefined' || typeof vm.flight.fromDate !== 'undefined' && typeof vm.flight.returnDate !== 'undefined';
        }
    }
})();