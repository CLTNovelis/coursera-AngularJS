(function () {
    "use strict";

    angular.module('public')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope', '$state', 'UserService', 'MenuService'];
    function SignupController($scope, $state, UserService, MenuService) {
        var user = this;
        //user.favoriteAlert = false;

        user.submit = function () {
            UserService.setUser(user.user.firstname, user.user.lastname, user.user.email, user.user.phone, user.user.favorite)
            var thisUser = UserService.getUser();
            //console.log(thisUser);
            var favorite = user.user.favorite;
            

            var splitval = favorite.match(/[0-9]+/);
            var short_name = favorite.replace(splitval,'');
            var categoryNumber = splitval[0] - 1;

            MenuService.getMenuItem(short_name, categoryNumber).then(function (data) {
                thisUser.favoriteData = [];
                
                if (data) {
                    user.error = "Your information has been saved";
                    user.completed = true;
                    thisUser.favoriteData = data;

                } else {
                    user.error = "That menu item is not found, please try another";
                }
                
            });

            
            //https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/L/menu_items/0.json
            //https://coursera-jhu-default-rtdb.firebaseio.com
        };
    }


})();