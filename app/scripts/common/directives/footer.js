'use strict';

angular.module('atomApp')
.directive('wdFooter', function() {
return {
    restrict: 'A',
    templateUrl: 'views/common/footer.html',
    replace: true,
    scope: true,
    link: function(scope, element, attributes) {
        
    }
};
});
