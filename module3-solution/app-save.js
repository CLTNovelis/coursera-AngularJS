(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com/");

    function FoundItems() {
        var ddo = {
            //restrict: "E",
            templateUrl: 'foundItems.html',
            myTitle: '@title',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'found',
            bindToController: true,
            //link: FoundItemsDirectiveLink
        };

        return ddo;
    }

    //function FoundItemsDirectiveLink(scope, element, attrs, controller) {
    //    //console.log("Link scope is: ", scope);
    //    //console.log("Controller instance is: ", controller);
    //    //console.log("Element is: ", element);

    //    scope.$watch('found.foundItems', function (newValue, oldValue) {
    //        console.log("Old value: ", oldValue);
    //        console.log("New value: ", newValue);

    //        if (newValue === true) {
    //            console.log('true');
    //        }
    //        else {
    //            console.log('false');
    //        }

    //    });
    //}

    //FoundItemsDirectiveController.$inject = ['$scope'];
    function FoundItemsDirectiveController() {
        var found = this;

        console.log(found.searchTerm);

    };

    NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
    function NarrowItDownController($scope, MenuSearchService) {
        var found = this;
        found.searchTerm = "tofu";

        found.searchBtn = function () {
            console.log(found.searchTerm);

            var promise = MenuSearchService.getMatchedMenuItems(found.searchTerm);
            promise.then(function (response) {
                found.items = response.data;
                found.errorMessage = (found.items.length == 0 ? "No results" : null);
                console.log(found.items);
            })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
        };

        found.removeItem = function (itemIndex) {
            found.items.splice(itemIndex, 1);
            found.errorMessage = (found.items.length == 0 ? "No more results!" : null);
        };

    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        // searchTerm
        // Each item in the list should show the name of the menu item, its short_name, and the description. 
        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (response) {
                var foundItems = [];
                var menu = response.data;
                for (var key in menu) {
                    var mItems = menu[key];
                    for (var item in mItems) {
                        var m2Items = mItems[item];
                        for (var nextItem in m2Items) {
                            var name = m2Items[nextItem].name;
                            var short_name = m2Items[nextItem].short_name;
                            var desc = m2Items[nextItem].description;
                            if (desc) {
                                var sTerm = searchTerm.toLowerCase();
                                if (desc.toLowerCase().indexOf(sTerm) > 0) {
                                    foundItems.push({ "name": name, "short_name": short_name, "description": desc });
                                }
                            }
                        }
                    }
                }
                response.data = foundItems;
                return response;
            });
        };
    }

    //function MenuSearchFactory() {
    //    var factory = function () {
    //        return new MenuSearchService();
    //    };

    //    return factory;
    //}
})();

