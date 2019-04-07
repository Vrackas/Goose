;(function () {

    'use strict';

    angular
        .module('app.subheader', [])
        .directive('subheaderBlock', subheaderBlock);

    subheaderBlock.$inject = [];

    function subheaderBlock() {
        return {
            bindToController: true,
            controller: 'SubheaderBlockController',
            controllerAs: 'vm',
            templateUrl: 'directives/subheader_block/subheader_block.html',
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