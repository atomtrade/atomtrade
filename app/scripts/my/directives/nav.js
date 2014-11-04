/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has the duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.directive('wdMyNav', ['$location', 
function($location) {
return {
    restrict: 'A',
    templateUrl: 'views/my/nav.html',
    replace: true,
    scope: true,
    link: function(scope, element, attributes) {
        var btns = element.find('.item').find('a').removeClass('active');
        switch ($location.path()) {
            case '/my-index':
                btns.eq(0).addClass('active');
            break;
            case '/my-change-password':
                btns.eq(1).addClass('active');
            break;
            case '/my-money-in':
                btns.eq(2).addClass('active');
            break;
            case '/my-money-out':
                btns.eq(3).addClass('active');
            break;
        }
    }
};
}]);
