;(function () {
    'use strict';

    angular.module('app')
        .controller('CheckoutController', CheckoutController);

    CheckoutController.$inject = ['flightService', '$localStorage'];

    function CheckoutController(flightService, $localStorage) {
        let vm = this;
        vm.selectedFlight = flightService.getSelectedFlight();
        vm.flightPriceDetails = $localStorage.flightPriceDetails;

    }
})();