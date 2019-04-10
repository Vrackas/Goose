;(function () {
    'use strict';

    angular.module('app')
        .controller('HomepageController', HomepageController);


    HomepageController.$inject = ['flightService'];

    function HomepageController(flightService) {
        var vm = this;
        vm.flight = {
            "fromDate": "2017-11-23",
            "returnDate": "2017-11-30",
            "adult": "1",
            "child": "1",
        };

        vm.searchModel = {
            from: '',
            to: ''
        };
        vm.searchTour = searchTour;
        vm.changeInput = changeInput;
        vm.date = new Date;


        function changeInput(query, type) {
            vm.flight[type] = {};
            if (query.length < 3)
                return false;
            flightService.getAirport(query).then(function (result) {
                if (result.length > 0) {
                    debugger
                    vm.flight[type].code = result[0].code;
                    vm.flight[type].cityName = result[0].cityName;
                    vm.searchModel[type] = result[0].cityName + " " + result[0].name + " (" + result[0].code + "), " + result[0].countryCode;
                }
                console.log(result);

            });
        }

        function searchTour() {
            if (vm.flight.from.code.length === 3 && vm.flight.to.code.length === 3)
                flightService.save(vm.flight);
            console.log(vm.flight);
        }
    }
})();