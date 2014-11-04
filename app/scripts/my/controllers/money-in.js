/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has the duty to keep the code elegant
 */

'use strict';
angular.module('atomApp')
.controller('myMoneyInCtrl', 
['$scope', 'wdAccount', '$location', 'wdCheck', '$interval', 'wdMoney',
function ($scope, wdAccount, $location, wdCheck, $interval, wdMoney) {
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

    $scope.money = {
        stock_category: 'hkstock', // usstock
        currency: 'usd', //hkd
        amount: 0,
        note: '',
        uiAmountError: '',
        uiSuccess: false
    };

    $scope.checkAmount = function() {
        var res = wdCheck.checkAmount($scope.money.amount);
        if (!res) {
            $scope.money.uiAmountError = '';
            return true;
        } else {
            $scope.money.uiAmountError = res;
            return false;
        }
    };

    $scope.deposit = function() {
        if ($scope.checkAmount()) {
            $scope.loading = true;
            wdMoney.deposit($scope.money).then(function(data) {
                $scope.loading = false;
                if (data.is_succ) {
                    $scope.money.uiSuccess = true;
                }
            });
        }
    };

    $scope.reset = function() {
        $scope.money.uiSuccess = false;
    };
}]);
