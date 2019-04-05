;(function () {

    'use strict';

    angular
        .module('app')
        .controller('HeaderBlockController', HeaderBlockController);

    HeaderBlockController.$inject = ['$state', '$timeout', '$translate'];

    function HeaderBlockController($state, $timeout, $translate) {
        var vm = this;

        vm.contentActive = false;

        vm.langOpen = langOpen;
        vm.changeLang = changeLang;
        vm.headerWrapperOpen = headerWrapperOpen;
        vm.headerWrapperClose = headerWrapperClose;


        function headerWrapperOpen() {
            // debugger
            $timeout(function () {
                $('.header_wrapper').addClass('active');
            });

            $(document).mouseup(function (e) {
                var container = $('.header_wrapper');
                if (container.has(e.target).length === 0) {
                    container.removeClass('active');
                }
            });
        }

        function headerWrapperClose() {
            $('.header_wrapper').removeClass('active');
        }

        function langOpen(style) {

            $timeout(function () {
                $(style).addClass('active');
            });

            $(document).mouseup(function (e) {
                var container = $(style);
                if (container.has(e.target).length === 0) {
                    container.removeClass('active');
                }
            });
        }

        function changeLang(lang) {
            $translate.use(lang);
        }

        $(document).ready(function () {
            $('body,html').animate({scrollTop: 0}, 1);
            // $(window).scroll(function () {
            //
            //     var wScroll = $(this).scrollTop();
            //     if (window.screen.width >= 993)     {
            //         // console.log("hi")
            //         if (wScroll > $('#section').offset().top - 50) {
            //             $('#header_site').addClass('active')
            //         }
            //         else if (wScroll > $('#section').offset().top - 160) {
            //             $('#header_site').removeClass('active')
            //         }
            //     }
            //
            //
            //
            // })
        })
    }

})();
