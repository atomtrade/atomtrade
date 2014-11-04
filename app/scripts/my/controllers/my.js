/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

'use strict';
angular.module('atomApp')
.controller('myCtrl', 
['$scope', 'wdAccount', '$location',
function ($scope, wdAccount, $location) {
    $scope.loading = true;
    $scope.userInfo = {
        phone: '',
        usCash: 0,
        hkCash: 0
    };
    wdAccount.check().then(function(data) {
        if (data.is_succ) {
            return wdAccount.getInfo();
        } else {
            $location.path('/account-login');
        }
    }).then(function(data) {
        if (data && data.is_succ) {
            $scope.userInfo = {
                phone: data.phone,
                usCash: data.usstock_cash,
                hkCash: data.hkstock_cash
            };
        }
        $scope.loading = false;
    });
}]);
