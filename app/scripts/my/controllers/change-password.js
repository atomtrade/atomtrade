/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

'use strict';
angular.module('atomApp')
.controller('myChangePasswordCtrl', 
['$scope', 'wdAccount', '$location', 'wdCheck', '$interval', 'wdStorage',
function ($scope, wdAccount, $location, wdCheck, $interval, wdStorage) {
    $scope.loading = true;
    $scope.isLogin = false;
    var verifyCodeTime = 60;
    wdAccount.check().then(function(data) {
        $scope.loading = false;
        if (data.is_succ) {
            $scope.isLogin = true;
        }
    });

    var phone = wdStorage.item('phone');
    $scope.userInfo = {
        phone: phone || '',
        code: '',
        id_no: '',
        pwd: '',
        new_pwd: '',
        new_pwd2: '',
        uiPhoneError: '',
        uiCodeError: '',
        uiIdNoError: '',
        uiPwdError: '',
        uiNewPwdError: '',
        uiNewPwd2Error: '',
        uiServerError: ''
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
        } else if ($scope.isLogin && $scope.userInfo.new_pwd === $scope.userInfo.pwd) {
            $scope.userInfo.uiNewPwdError = '新密码与原密码居然一致';
            return false;
        } else {
            $scope.userInfo.uiNewPwdError = res;
            return false;
        }
    };

    $scope.checkNewPassword2 = function() {
        var res = wdCheck.checkPassword($scope.userInfo.new_pwd2);
        if (!res) {
            $scope.userInfo.uiNewPwd2Error = '';
            return true;
        } else if ($scope.userInfo.new_pwd !== $scope.userInfo.new_pwd2) {
            $scope.userInfo.uiNewPwd2Error = '两次密码不一致';
            return false;
        } else {
            $scope.userInfo.uiNewPwd2Error = res;
            return false;
        }
    };

    $scope.changePassword = function() {
        $scope.userInfo.phone = '';
        if ($scope.checkPassword() && 
            $scope.checkNewPassword() && 
            $scope.checkNewPassword2()) {
            $scope.loading = true;
            wdAccount.changePassword($scope.userInfo).then(function(data) {
                $scope.loading = false;
                if (data.is_succ) {
                    wdAccount.logout();
                    $location.path('/account-login');
                } else {
                    $scope.userInfo.uiServerError = data.error_msg;
                }
            });
        }
    };

    $scope.findPassword = function() {
        if ($scope.checkPhone() && 
            $scope.checkVerifyCode() && 
            $scope.checkIdNo() && 
            $scope.checkNewPassword() && 
            $scope.checkNewPassword2()) {
            $scope.loading = true;
            wdAccount.findPassword($scope.userInfo).then(function(data) {
                $scope.loading = false;
                if (data.is_succ) {
                    $location.path('/account-login');
                } else {
                    $scope.userInfo.uiServerError = data.error_msg;
                }
            });
        }
    };
}]);
