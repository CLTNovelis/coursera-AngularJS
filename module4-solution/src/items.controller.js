(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['$scope', 'MenuDataService', 'menuitems'];
    function ItemsController($scope, MenuDataService, menuitems ) {
        var items = this;
        items.category = menuitems.data.category.name;
        items.short_name = menuitems.data.category.short_name;
        items.special_instructions = menuitems.data.category.special_instructions;
        items.menu_items = menuitems.data.menu_items;
    }

})();
