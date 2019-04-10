;(function () {
    'use strict';

    angular.module('app')
        .controller('ToursController', ToursController);


    ToursController.$inject = ['http'];

    function ToursController(http) {
        let vm = this;

    }
})();