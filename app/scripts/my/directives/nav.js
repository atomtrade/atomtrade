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
            case '/my-money-in':
                btns.eq(1).addClass('active');
            break;
            case '/my-money-out':
                btns.eq(2).addClass('active');
            break;
        }
    }
};
}]);
