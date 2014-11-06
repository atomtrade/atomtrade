/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.directive('wdHeader', ['$location', '$window', 'wdAccount', '$interval',
function($location, $window, wdAccount, $interval) {
return {
    restrict: 'A',
    templateUrl: 'views/common/header.html',
    replace: true,
    scope: true,
    link: function($scope, element, attributes) {
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
        
        // 每次打开一个新页面都自动跳转到最上面
        $($window).scrollTop(0);

        $scope.isLogin = false;
        $scope.loading = true;
        wdAccount.check().then(function(data) {
            $scope.loading = false;
            if (data.is_succ) {
                $scope.isLogin = true;
            }
        });
        $scope.logout = function() {
            $scope.loading = true;
            wdAccount.logout().then(function(data) {
                $scope.loading = false;
                $location.path('/index');
            });
        };

        // 循环检测登录状态（出于安全考虑，如果多个 tab 打开，那一个退出，应该全部被退出）
        var timer = $interval(function() {
            switch (path) {
                case '/account-open':
                case '/my-index':
                case '/my-money-in':
                case '/my-money-out':
                    wdAccount.check().then(function(data) {
                        if (!data.is_succ) {
                            $location.path('/account-login');
                        }
                    });
                break;
            }
        }, 5000);
        
        $scope.$on('$destroy', function() {
            $interval.cancel(timer);
        });

    }
};
}]);
