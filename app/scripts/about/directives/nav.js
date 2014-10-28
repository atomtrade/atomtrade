'use strict';

angular.module('atomApp')
.directive('wdAboutNav', ['$location', 
function($location) {
return {
    restrict: 'A',
    templateUrl: 'views/about/nav.html',
    replace: true,
    scope: true,
    link: function(scope, element, attributes) {
        var btns = element.find('.item').find('a').removeClass('active');
        switch ($location.path()) {
            case '/about-company':
                btns.eq(0).addClass('active');
            break;
            case '/about-license':
                btns.eq(1).addClass('active');
            break;
            case '/about-contact':
                btns.eq(2).addClass('active');
            break;
        }
    }
};
}]);
