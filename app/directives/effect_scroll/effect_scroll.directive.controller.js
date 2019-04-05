;(function () {

    'use strict';

    angular
        .module('app')
        .controller('effectScrollController', effectScrollController);

    effectScrollController.$inject = ['$state'];

    function effectScrollController($state) {
        var vm = this;

        vm.scroll = scroll;

        function scroll() {
            event.preventDefault();

            var top = $('#section').offset().top;
            if (top === '#section') {
                top = top - 150;
                $('body,html').animate({scrollTop: top}, 1000);
            }

            $('body,html').animate({scrollTop: top}, 1000);

        }






    }
})();
