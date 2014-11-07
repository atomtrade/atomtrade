/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

'use strict';
angular.module('atomApp')
.controller('myCtrl', 
['$scope', 'wdAccount', '$location', 'wdStorage',
function ($scope, wdAccount, $location, wdStorage) {
    $scope.loading = true;
    $scope.userInfo = {
        phone: '',
        offer_id: '',
        usCash: 0,
        hkCash: 0
    };
    $scope.step = 1;
    if (wdStorage.item('is_set_info')) {
        $scope.step = 2;
    }
    if (wdStorage.item('is_set_risk')) {
        $scope.step = 3;
    }
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
                offer_id: data.offer_id,
                usCash: data.usstock_cash,
                hkCash: data.hkstock_cash
            };
        }
        $scope.loading = false;
    });

    $scope.logout = function() {
        $scope.loading = true;
        wdAccount.logout().then(function(data) {
            $scope.loading = false;
            if (data.is_succ) {
                $location.path('/account-login');                
            }
        });
    };
}]);
