/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has the duty to keep the code elegant
 */

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
