(function(){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.lunchmenu = "";
    $scope.checkmenu = function() {

      var menuItems = $scope.lunchmenu;
      
      var message = "Please enter data first";
      var customInputStyle = {"border-color" : "red"};
      var customMsgStyle = {"color" : "red"};

      if($scope.lunchmenu != "") {
      customMsgStyle = {"color" : "green"};
       //Filter out empty items like ,   ,
       var itemArray = menuItems.split(',').filter(item => item.trim() !== '');

       if(itemArray.length <= 3) {
         message = "Enjoy!";
          customInputStyle = {"border-color" : "green"};
       } else {
         message = "Too much!";
         customInputStyle = {"border-color" : "red"};
       }
      }
    $scope.customMsgStyle  = customMsgStyle;
    $scope.customInputStyle = customInputStyle;
    $scope.message = message;
    };
  }
})();
