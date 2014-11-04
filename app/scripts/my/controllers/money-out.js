'use strict';
angular.module('atomApp')
.controller('myMoneyOutCtrl', 
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
        bank_name: '',
        bank_account: '',
        amount: 0,
        note: '',
        uiAmountError: '',
        uiSuccess: false,
        uiBankNameError: '',
        uiBankAccountError: ''
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

    $scope.checkBankName = function() {
        if (!$scope.money.bank_name) {
            $scope.money.uiBankNameError = '请填写「开户银行」';
        } else {
            $scope.money.uiBankNameError = '';
            return true;
        }
    };

    $scope.checkBankAccount = function() {
        if (!$scope.money.bank_account) {
            $scope.money.uiBankAccountError = '请填写「银行卡号」';
        } else {
            $scope.money.uiBankAccountError = '';
            return true;
        }
    };
    
    $scope.withdrawal = function() {
        if ($scope.checkBankName() && $scope.checkBankAccount() && $scope.checkAmount()) {
            $scope.loading = true;
            wdMoney.withdrawal($scope.money).then(function(data) {
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
