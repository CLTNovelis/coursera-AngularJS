(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            // does the templateUrl go here? I already have it in the route
            templateUrl: 'src/templates/categories.template.html',
            bindings: {
                categories: '<',
            }
        });

})();