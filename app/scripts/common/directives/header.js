'use strict';

angular.module('atomApp')
.directive('wdHeader', ['$location', '$window', 'wdAccount',
function($location, $window, wdAccount) {
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
                if (data.is_succ) {
                    $location.path('/index');
                }
            });
        };
    }
};
}]);
