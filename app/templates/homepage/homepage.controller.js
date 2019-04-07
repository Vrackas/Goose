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
            "adult":"1",
            "child":"1",
        };

        vm.searchModel = {
            from: '',
            to: ''
        };
        vm.searchTour = searchTour;
        vm.changeInput = changeInput;


        function changeInput(query, type) {
            vm.flight[type] = '';
            if (query.length < 3)
                return false;
            flightService.getAirport(query).then(function (result) {
                if (result.length > 0) {
                    vm.flight[type] = result[0].code;
                    vm.searchModel[type] = result[0].cityName + " " + result[0].name + " (" + result[0].code + "), " + result[0].countryCode;
                }
                console.log(result);

            });
        }

        function searchTour() {
            if (vm.flight.from.length === 3 && vm.flight.to.length === 3)
                flightService.save(vm.flight);
            console.log(vm.flight);
        }
    }
})();