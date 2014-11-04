/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has the duty to keep the code elegant
 */

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
