'use strict';

angular.module('atomApp')
.directive('wdHeader', function() {
return {
    restrict: 'A',
    templateUrl: 'views/common/header.html',
    replace: true,
    scope: true,
    link: function(scope, element, attributes) {
        
    }
};
});
