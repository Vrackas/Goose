;(function () {

    'use strict';

    angular
        .module('app.effect', [])
        .directive('effectScroll', effectScroll);

    effectScroll.$inject = [];

    function effectScroll() {
        return {
            bindToController: true,
            controller: 'effectScrollController',
            controllerAs: 'vm',
            templateUrl: 'directives/effect_scroll/effect_scroll.html',
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