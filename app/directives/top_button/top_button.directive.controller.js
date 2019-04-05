;(function () {

    'use strict';

    angular
        .module('app')
        .controller('TopButtonController', TopButtonController);

    TopButtonController.$inject = ['$state'];

    function TopButtonController($state) {
        var vm = this;


            $(document).ready(function () {

                $('.top_button').click(function () {
                    $('body,html').animate({scrollTop: 0}, 1500);
                });

                $(window).scroll(function () {


                    if (window.pageYOffset > 900) {
                        $('.top_button_click').addClass('active_top_button');
                    }
                    else if ( window.pageYOffset < 800) {
                        $('.top_button_click').removeClass('active_top_button');
                    }
                });
            })




    }
})();
