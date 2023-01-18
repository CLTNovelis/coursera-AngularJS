(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com/");

    function FoundItems() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'found',
            bindToController: true //,
            //link: NarrowItDownLink
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var found = this;
        found.searchTerm = "";

        found.search = function () {
            var promise = MenuSearchService.getMatchedMenuItems(found.searchTerm);
            promise.then(function (response) {
                found.foundItems = response.data;
                found.errorMessage = (found.foundItems.length == 0 ? "No results" : null);
            })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });

        };

        found.removeItem = function (itemIndex) {
            found.foundItems.splice(itemIndex, 1);
            found.errorMessage = (found.foundItems.length == 0 ? "No more results!" : null);
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

})();

