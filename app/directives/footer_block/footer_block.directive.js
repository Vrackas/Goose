;(function () {

    'use strict';

    angular
        .module('app.footer', [])
        .directive('footerBlock', footerBlock);

    footerBlock.$inject = [];

    function footerBlock() {
        return {
            bindToController: true,
            controller: 'FooterBlockController',
            controllerAs: 'vm',
            templateUrl: 'directives/footer_block/footer_block.html',
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