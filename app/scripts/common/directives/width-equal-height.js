/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

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
