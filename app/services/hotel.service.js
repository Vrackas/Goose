(function () {
        'use strict';
        angular
            .module('service.hotel', [])
            .service('hotelService', hotel);

        hotel.$inject = ['http', '$localStorage'];


        function hotel(http, $localStorage) {
            return {
                getAirport: getAirport,
                save: save,
                getHotelsByAutoComplete: getHotelsByAutoComplete,
                getHotelsByAutoCompleteId: getHotelsByAutoCompleteId
            };

            function getAirport(query) {
                return http.get('fake_db/airports.json').then(function (res) {
                    return res.result;
                });
            }

            function save(hotelObject) {
                $localStorage.hotel = hotelObject;
            }

            function gethotelObject() {
                return $localStorage.hotel;
            }

            function getHotelsByAutoComplete() {
                var data = {};
                return http.post('http://localhost:8888/booking.php?query=hotel/autocomplete&city=Kiev', data).then(function (res) {
                    // return http.get('fake_db/hotels.json', data).then(function (res) {
                    let result = JSON.parse(JSON.parse(res));
                    // result.result.hotels.length = 20
                    // console.log(result.result);
                    // return result.result;
                    // return result.result;
                    // var result = res.result.filter(function (item) {
                    //     return item.code.indexOf(query) !== -1;
                    // });
                    return result.result;
                });
            }

            function savePriceDetailObject(obj) {
                $localStorage.priceDetailObject = obj;
            }

            function priceDetail() {
                return http.post('http://localhost:8888/booking.php?query=priceDetail', $localStorage.priceDetailObject).then(function (res) {
                    let result = JSON.parse(JSON.parse(res))
                    return result.result;
                });
            }

            /**
             * Рейс который выбран со всей инфой для показа в плитке на лучших предложениях
             */
            function saveSelectedhotel(hotel) {
                $localStorage.selectedhotel = hotel;
            }

            function getSelectedhotel() {
                return $localStorage.selectedhotel;
            }

            function getHotelsByAutoCompleteId(id) {
                var data = {
                    "autoCompleteId": id,
                    "currency": "USD",
                    "checkinDate": "2019-05-01",
                    "checkoutDate": "2019-05-03",
                }
                return http.post('http://localhost:8888/booking.php?query=hotel/search', data).then(function (res) {
                    // return http.get('fake_db/hotels.json', data).then(function (res) {
                    let result = JSON.parse(JSON.parse(res));
                    // result.result.hotels.length = 20
                    // console.log(result.result);
                    // return result.result;
                    // return result.result;
                    // var result = res.result.filter(function (item) {
                    //     return item.code.indexOf(query) !== -1;
                    // });
                    return result.result;
                });
            }
        }
    }

)();