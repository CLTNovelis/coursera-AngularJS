(function () {
'use strict';

    angular.module('MenuApp').config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
        .state('home', {
            url: '/',
            templateUrl: 'src/templates/home.template.html'
        })

        .state('categories', {
            url: '/categories',
            templateUrl: 'src/templates/categories.template.html',
            controller: 'CategoriesController as categories',
            resolve: {
                items: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }

        })

        .state('items', {
            url: '/items/{short_name}',
            templateUrl: 'src/templates/items.template.html',
            controller: 'ItemsController as items',
            resolve: {
                menuitems: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.short_name);
                }]
            }

        });
    }

})();
