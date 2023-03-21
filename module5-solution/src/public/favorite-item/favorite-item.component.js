(function () {
"use strict";

angular.module('public')
.component('favoriteItem', {
    templateUrl: 'src/public/favorite-item/favorite-item.html',
  bindings: {
    favoriteItem: '<',
    categoryShortName: '<',
     
  }
});

})();
