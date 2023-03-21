(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
    };

    service.getMenuItem = function (short_name, item) {
        console.log('short_name: ' + short_name);
        console.log('item: ' + item);
        console.log('service call: ' + ApiPath + '/menu_items/' + short_name + '/menu_items/' + item + '.json');
        return $http.get(ApiPath + '/menu_items/' + short_name + '/menu_items/' + item + '.json').then(function (response) {
            return response.data;
        });
    };

}



})();
