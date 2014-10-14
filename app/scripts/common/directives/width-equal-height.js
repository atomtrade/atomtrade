'use strict';

angular.module('atomApp')
.directive('wdWidthEqualHeight', function($window) {
var h = $($window).height();
return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attributes) {
        var w = Math.min(element.width(), h);
        element.height(w);
    }
};
});
