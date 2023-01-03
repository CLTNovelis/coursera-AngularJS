(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope', '$filter'];
    function LunchCheckController($scope, $filter) {
        $scope.lunchMessage = 'test message';
        $scope.lunchList;
        $scope.lunchAlert = '';
        $scope.lunchListItems;
        $scope.lunchListMessage;

        $scope.checkLunchList = function () {
            // count the number of valid lunch items
            var strLen = countValidItems($scope.lunchList);

            // set the reply based on number of valid items
            // $scope.lunchAlert = strLen;
            $scope.lunchMessage = (strLen <= 0 ? 'Please enter at least one food item' : (strLen <= 3 ? 'Enjoy!' : 'Too much!'));

            // set the form colors based on number of valid items
            if (strLen <= 0) {
                $scope.lunchListItems = { "border-color": "red" };
                $scope.lunchListMessage = { "color": "red" };
            } else {
                $scope.lunchListItems = { "border-color": "green" };
                $scope.lunchListMessage = { "color": "green"};
            }
        }

        //$scope.upper = function () {
        //    var upCase = $filter('uppercase');
        //    $scope.name = upCase($scope.name);
        //};
    }

    function countValidItems(str) {
        if (str) {
            const arr = str.split(',');
            return arr.filter(word => word.trim() !== '').length;
        } else {
            return (-1);
        }
    }

})();