(function () {
    "use strict";

    angular.module('public')
        .controller('MyinfoController', MyinfoController);

    MyinfoController.$inject = ['$scope', '$state', 'UserService', 'MenuService'];
    function MyinfoController($scope, $state, UserService, MenuService) {
        var user = this;
        user.user = UserService.getUser();

        if (user.user.favorite) {
            user.info = true;
            //console.log(user.user);
            var splitval = user.user.favorite.match(/[0-9]+/);
            var short_name = user.user.favorite.replace(splitval, '');
            var categoryNumber = splitval[0] - 1;

            MenuService.getMenuItem(short_name, categoryNumber).then(function (data) {
                user.favoriteData = [];

                if (data) {
                    user.short_name = short_name;
                    user.favoriteData = data;
                } else {
                    user.error = "Favorite menu item not found or no longer available";
                }

            });

        } else {
            user.error = 'Not Signed Up Yet.Sign up Now!';
        }



        

    }


})();