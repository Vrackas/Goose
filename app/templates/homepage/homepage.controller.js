;(function () {
    'use strict';

    angular.module('app')
        .controller('HomepageController', HomepageController);


    HomepageController.$inject = ['http'];

    function HomepageController(http) {
        var vm = this;

        vm.send = send;

        vm.list = [
            {
                img: '/content/img/homepage/main_1.jpeg',
                title: 'Солнечная электростанция',
                link: 'solar_power_plants'
            },
            {
                img: 'content/img/homepage/main_2.jpeg',
                title: 'Ветрогенератор',
                link: 'wind_generator'
            },
            {
                img: 'content/img/homepage/main_3.jpg',
                title: 'Тепловые насосы',
                link: 'heat_pumps'
            },
            {
                img: 'content/img/homepage/main_4.jpg',
                title: 'Оборудывание',
                link: 'equipment'
            },
            {
                img: 'content/img/homepage/main_5.jpg',
                title: 'Услуги',
                link: 'services'
            },
            {
                img: 'content/img/homepage/main_6.jpg',
                title: 'Зелёный тариф',
                link: 'green_fare'
            }
        ];


        function send(data) {
            return http.post("mail.php", data);
        }


    }
})();