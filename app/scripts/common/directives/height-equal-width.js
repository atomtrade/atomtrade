'use strict';

angular.module('atomApp')
.directive('wdHeightEqualWidth', function() {
return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attributes) {
        var h = element.height();
        element.width(h);
    }
};
});
