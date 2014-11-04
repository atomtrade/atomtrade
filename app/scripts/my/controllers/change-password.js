'use strict';
angular.module('atomApp')
.controller('myChangePasswordCtrl', 
['$scope', 'wdAccount', '$location', 'wdCheck', '$interval',
function ($scope, wdAccount, $location, wdCheck, $interval) {
    $scope.loading = true;
    $scope.isLogin = false;
    var verifyCodeTime = 60;
    wdAccount.check().then(function(data) {
        $scope.loading = false;
        if (data.is_succ) {
            $scope.isLogin = true;
        }
    });

    $scope.userInfo = {
        phone: '',
        code: '',
        id_no: '',
        pwd: '',
        new_pwd: '',
        uiPhoneError: '',
        uiCodeError: '',
        uiIdNoError: '',
        uiPwdError: '',
        uiNewPwdError: ''
    };

    $scope.checkPhone = function() {
        var res = wdCheck.checkPhone($scope.userInfo.phone);
        if (!res) {
            $scope.userInfo.uiPhoneError = '';
            return true;
        } else {
            $scope.userInfo.uiPhoneError = res;
            return false;
        }
    };

    $scope.checkVerifyCode = function() {
        var res = wdCheck.checkVerifyCode($scope.userInfo.code);
        if (!res) {
            $scope.userInfo.uiCodeError = '';
            return true;
        } else {
            $scope.userInfo.uiCodeError = res;
            return false;
        }
    };

    $scope.startCountdown = function() {
        $scope.uiCountdown = verifyCodeTime;
        var t = $interval(function() {
            $scope.uiCountdown --;
            if (!$scope.uiCountdown) {
                $interval.cancel(t);
            }
        }, 1000);
    };

    $scope.verifyPhone = function() {
        if ($scope.checkPhone()) {
            $scope.startCountdown();
            wdAccount.verifyPasswordPhone($scope.userInfo.phone);
        }
    };

    $scope.checkIdNo = function() {
        var res = wdCheck.checkIdNo($scope.userInfo.id_no);
        if (!res) {
            $scope.userInfo.uiIdNoError = '';
            return true;
        } else {
            $scope.userInfo.uiIdNoError = res;
            return false;
        }
    };

    $scope.checkPassword = function() {
        var res = wdCheck.checkPassword($scope.userInfo.pwd);
        if (!res) {
            $scope.userInfo.uiPwdError = '';
            return true;
        } else {
            $scope.userInfo.uiPwdError = res;
            return false;
        }
    };

    $scope.checkNewPassword = function() {
        var res = wdCheck.checkPassword($scope.userInfo.new_pwd);
        if (!res) {
            $scope.userInfo.uiNewPwdError = '';
            return true;
        } else {
            $scope.userInfo.uiNewPwdError = res;
            return false;
        }
    };

    $scope.changePassword = function() {
        if ($scope.checkPassword() && $scope.checkNewPassword()) {
            $scope.loading = true;
            wdAccount.changePassword($scope.userInfo).then(function(data) {
                $scope.loading = false;
                if (data.is_succ) {
                    wdAccount.logout();
                    $location.path('/account-login');
                }
            });
        }
    };

    $scope.findPassword = function() {
        if ($scope.checkPhone() && $scope.checkVerifyCode() && $scope.checkIdNo() && $scope.checkNewPassword()) {
            $scope.loading = true;
            wdAccount.findPassword($scope.userInfo).then(function(data) {
                $scope.loading = false;
                if (data.is_succ) {
                    $location.path('/account-login');
                }
            });
        }
    };
}]);
