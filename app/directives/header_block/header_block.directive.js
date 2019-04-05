;(function () {

    'use strict';

    angular
        .module('app.header', [])
        .directive('headerBlock', headerBlock);

    headerBlock.$inject = [];

    function headerBlock() {
        return {
            bindToController: true,
            controller: 'HeaderBlockController',
            controllerAs: 'vm',
            templateUrl: 'directives/header_block/header_block.html',
            link: link,
            restrict: 'AE',
            scope: {
                model: '='
            }
        };


        function link(scope, element, attrs) {

        }
    }
})();