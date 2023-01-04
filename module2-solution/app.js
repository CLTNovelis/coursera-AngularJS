(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var ToBuy = this;

        ToBuy.items = ShoppingListCheckOffService.getItemsToBuy();
        ToBuy.message = "Everything is bought!";

        ToBuy.removeItem = function (itemIndex, itemQuantity, itemName) {
            ShoppingListCheckOffService.removeItem(itemIndex);
            ShoppingListCheckOffService.addItem(itemQuantity, itemName);
        };
    }

    // Nothing bought yet.
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var Bought = this;

        Bought.itemName = "";
        Bought.itemQuantity = "";
        Bought.message = "Nothing bought yet.";

        Bought.items = ShoppingListCheckOffService.getItemsBought();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var message;

        // List of shopping items
        var toBuyItems = [{ name: "Milk", quantity: "1 gallon" },
            { name: "Donuts", quantity: "1 dozen" },
            { name: "Cookies", quantity: "1 dozen" },
            { name: "Chocolate", quantity: "5 bars" },
            { name: "Peanut Butter", quantity: "2 jars" },
            { name: "Pepto Bismol", quantity: "1 bottle" },
            { name: "Pepto Bismol (Chocolate flavor)", quantity: "1 bottle" },
            { name: "Pepto Bismol (Cookie flavor)", quantity: "1 bottle" },
            { name: "Almond Milk", quantity: "1/2 gallon" },
            { name: "Dark Chocolate", quantity: "3 bars" },
            { name: "Cashews", quantity: "1 bag" },
            ];
        var boughtItems = [];

        service.addItem = function (itemName, quantity) {
            var item = {
            name: itemName,
            quantity: quantity
            };
            boughtItems.push(item);
            service.errorMessage = "";
        };

        service.removeItem = function (itemIndex) {
            toBuyItems.splice(itemIndex, 1);
            if (toBuyItems.length <= 0) {
                throw new Error("Everything is bought!");
            }
        };

        service.getItemsToBuy = function () {
            return toBuyItems;
        };
        service.getItemsBought = function () {
            return boughtItems;
        };
    }

})();
