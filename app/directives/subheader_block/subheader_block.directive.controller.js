;(function () {

    'use strict';

    angular
        .module('app')
        .controller('SubheaderBlockController', SubheaderBlockController);

    SubheaderBlockController.$inject = ['$state', '$timeout', '$translate', 'flightService', '$localStorage'];

    function SubheaderBlockController($state, $timeout, $translate, flightService, $localStorage) {
        let vm = this;
        vm.tour = flightService.getFlightObject();
        vm.priceLimit = $localStorage.priceLimit;

        // console.log(vm.tour);

    }

})();
