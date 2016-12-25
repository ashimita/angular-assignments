(function() {
    'use strict';

    angular.module('MenuCategoriesApp', [])
        .controller('MenuCategoriesController', MenuCategoriesController)
        .service('MenuCategoriesService', MenuCategoriesService)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;
        list.isEmpty = function() {
            return list.found != undefined && list.found.length === 0;
        }
    }

    MenuCategoriesController.$inject = ['MenuCategoriesService'];

    function MenuCategoriesController(MenuCategoriesService) {
        var controller = this;

        controller.searchTerm = '';
        controller.items = [];
        controller.narrowSearch = function() {
            if (controller.searchTerm === "") {
                controller.items = [];
                return;
            }
            var promise = MenuCategoriesService.getMatchedMenuItems(controller.searchTerm);
            promise.then(function(response) {
                controller.items = response;
            }).catch(function(error) {
                console.log(error);
            });
        }

        controller.removeItem = function(itemIndex) {
            controller.items.splice(itemIndex, 1);
        }
    }

    MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];

    function MenuCategoriesService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function(result) {
                var foundItems = [];
                //loop through result
                // for (var i = 0; i < result.data.menu_items.length; i++) {
                var menuItems = result.data.menu_items;
                for (var i = 0; i < menuItems.length; i++) {
                    if (menuItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                        foundItems.push(menuItems[i]);
                    }
                }
                // }
                return foundItems;
            });
        }

    }
})();
