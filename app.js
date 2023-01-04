(function () {
    'use strict';

    angular.module('myFirstApp', [])

        .controller('MyFirstController', function ($scope, $filter) {
            $scope.name = "Catherine";
            $scope.sayHello = function () {
                return "Hello Coursera!";
            };

            $scope.value = .23;

            
        });

})();