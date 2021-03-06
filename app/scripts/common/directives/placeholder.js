/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.directive('wdPlaceholder', function() {
return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl) {
        var holder = attr.wdPlaceholder;
        // 标记一下是否是第一次进入
        var firstFlag = false;
        var placehold = function () {
            element.val(holder);
            element.addClass('wd-place-holder');
        };
        var unplacehold = function () {
            element.val('');
            element.removeClass('wd-place-holder');
        };
        scope.$watch(attr.ngModel, function(val) {
            if (!firstFlag && !val) {
                firstFlag = true;
                placehold();
            }
        });
        element.on('focus', function () {
            var v = element.val();
            if (v === holder) {
                unplacehold();
            }
        });
        element.on('blur', function () {
            var v = element.val();
            if (!v) {
                placehold();
            }
        });
    }
};
});
