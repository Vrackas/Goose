;(function () {

    'use strict';

    angular
        .module('app')
        .controller('SubheaderBlockController', SubheaderBlockController);

    SubheaderBlockController.$inject = ['$state', '$timeout', '$translate', 'flightService'];

    function SubheaderBlockController($state, $timeout, $translate, flightService) {
        let vm = this;
        // vm.tour = flightService.getFlightObject();
        // console.log(vm.tour);

    }

})();
