;(function () {

    'use strict';

    angular
        .module('app.top_button', [])
        .directive('topButton', topButton);

    topButton.$inject = [];

    function topButton() {
        return {
            bindToController: true,
            controller: 'TopButtonController',
            controllerAs: 'vm',
            templateUrl: 'directives/top_button/top_button.html',
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