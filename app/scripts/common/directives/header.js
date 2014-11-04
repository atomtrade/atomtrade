/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.directive('wdHeader', ['$location', 
function($location) {
return {
    restrict: 'A',
    templateUrl: 'views/common/header.html',
    replace: true,
    scope: true,
    link: function(scope, element, attributes) {
        var btns = element.find('.nav-btns').find('.btn').removeClass('active');
        var path = $location.path();
        switch (path) {
            case '/index':
                btns.eq(0).addClass('active');
            break;
            case '/download':
                btns.eq(1).addClass('active');
            break;
        }
        if (/\/about/.test(path)) {
            btns.eq(2).addClass('active');
        }
    }
};
}]);
