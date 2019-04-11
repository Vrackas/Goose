;(function () {
    angular.module('app',
        [
            'app.core',
            'blocks.directives',
            'blocks.request',
            'blocks.services',
            'blocks.filters',
        ])
        .run(runBlock);

    runBlock.$inject = ['$translate', '$localStorage'];

    function runBlock($translate, $localStorage) {

    }
})();
