(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var list1 = this;
        list1.items = ShoppingListCheckOffService.getToBuyItems();
        list1.name = "";
        list1.quantity = "";

        list1.boughtItem = function(itemIndex) {
            ShoppingListCheckOffService.boughtItem(itemIndex);
        }
    };
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var list2 = this;
        list2.items = ShoppingListCheckOffService.getBoughtItems();
        list2.name = "";
        list2.quantity = "";
    }

    function ShoppingListCheckOffService() {

        var service = this;

        var itemsToBy = [{
            name: "Milk",
            quantity: 5
        }, {
            name: "Donuts",
            quantity: 8
        }, {
            name: "Cookies",
            quantity: 11
        }, {
            name: "Chocolate",
            quantity: 13
        }, {
            name: "Peanut Butter",
            quantity: 11
        }];

        var itemsBought = [];

        service.getToBuyItems = function() {
            return itemsToBy;
        }

        service.boughtItem = function(itemIndex) {
            var itemBought = itemsToBy.splice(itemIndex, 1);
            itemsBought.push({name : itemBought[0].name, quantity : itemBought[0].quantity});
        }

        service.getBoughtItems = function() {
            return itemsBought;
        }

    }


})();
