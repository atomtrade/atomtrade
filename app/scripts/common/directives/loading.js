/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.directive('wdLoading', function() {
return {
    restrict: 'A',
    template:
        '<div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div></div>' +
        '</div>',
    replace: true,
    scope: true,
    link: function(scope, element, attributes) {
        element.addClass('wd-loading');
    }
};
});
