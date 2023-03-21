(function () {
    "use strict";

    angular.module('common')
        .service('UserService', UserService);

   UserService.$inject = ['$http', 'ApiPath'];
    function UserService($http, ApiPath) {
        var service = this;
        var user = [];

        service.getUser = function () {
            return user;
        }

        service.setUser = function (firstname, lastname, email, phone, favorite) {
            var userInfo = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                favorite: favorite
            };
            userInfo.firstname = firstname;
            userInfo.lastname = lastname;
            userInfo.email = email;
            userInfo.phone = phone;
            userInfo.favorite = favorite;
            //user.push(userInfo);
            user = userInfo;
        }
    }

})();
