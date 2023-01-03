(function () {
    'use strict';

    angular.module('myFirstApp', [])

        .controller('MyFirstController', function ($scope) {
            $scope.name = "Catherine";
            $scope.sayHello = function () {
                return "Hello Coursera!";
            };
        });

})();