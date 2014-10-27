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
        switch ($location.path()) {
            case '/index':
                btns.eq(0).addClass('active');
            break;
            case '/download':
                btns.eq(1).addClass('active');
            break;
        }
    }
};
}]);
