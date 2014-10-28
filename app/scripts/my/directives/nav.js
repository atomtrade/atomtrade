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
        // switch ($location.path()) {
        //     case '/about-company':
        //         btns.eq(0).addClass('active');
        //     break;
        //     case '/about-license':
        //         btns.eq(1).addClass('active');
        //     break;
        // }
    }
};
}]);
