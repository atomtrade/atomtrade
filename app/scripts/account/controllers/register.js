/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.controller('registerCtrl', 
['$scope', 'wdAccount', '$timeout', 'wdConfig', 'wdStorage', '$location', '$interval', '$window', 'wdCheck',
function ($scope, wdAccount, $timeout, wdConfig, wdStorage, $location, $interval, $window, wdCheck) {
    var verifyCodeTime = 60;
    $scope.loading = false;
    var phone = wdStorage.item('phone');
    $scope.register = {
        phone: phone || '',
        verify_code: '',
        password: '',
        invite_code: '',
        uiPhoneTip: '',
        uiVerifyCodeTip: '',
        uiPasswordTip: '',
        uiInviteCodeTip: '',
        uiPhoneError: '',
        uiVerifyCodeError: '',
        uiPasswordError: '',
        uiServerError: '',
        uiInviteCodeError: '',
        uiCountdown: 0,
        uiSuccess: false
    };

    $scope.focusPhone = function() {
        $scope.register.uiPhoneTip = '请输入您的手机号码，然后点击下面的「获取验证码」按钮';
        $scope.register.uiPhoneError = '';
    };
    $scope.focusVerifyCode = function() {
        $scope.register.uiVerifyCodeTip = '点击「获取验证码」按钮，然后输入手机短信中的验证码';
        $scope.register.uiVerifyCodeError = '';
    };
    $scope.focusPassword = function() {
        $scope.register.uiPasswordTip = '密码必须要大于 6 个字符，要包含数字和字母';
        $scope.register.uiPasswordError = '';
    };
    $scope.focusInviteCode = function() {
        $scope.register.uiInviteCodeTip = '选填，输入邀请码或者邀请人的手机号';
        $scope.register.uiInviteCodeError = '';
    };

    $scope.blurPhone = function() {
        $scope.register.uiPhoneTip = '';
        $scope.checkPhone();
    };
    $scope.blurVerifyCode = function() {
        $scope.register.uiVerifyCodeTip = '';
        $scope.checkVerifyCode();
    };
    $scope.blurPassword = function() {
        $scope.register.uiPasswordTip = '';
        $scope.checkPassword();
    };
    $scope.blurInviteCode = function() {
        $scope.register.uiInviteCodeTip = '';
    };

    $scope.checkPhone = function() {
        var res = wdCheck.checkPhone($scope.register.phone);
        if (!res) {
            $scope.register.uiPhoneError = '';
            return true;
        } else {
            $scope.register.uiPhoneError = res;
            return false;
        }
    };

    $scope.checkVerifyCode = function() {
        var res = wdCheck.checkVerifyCode($scope.register.verify_code);
        if (!res) {
            $scope.register.uiVerifyCodeError = '';
            return true;
        } else {
            $scope.register.uiVerifyCodeError = res;
            return false;
        }
    };

    $scope.checkPassword = function() {
        var res = wdCheck.checkPassword($scope.register.password);
        if (!res) {
            $scope.register.uiPasswordError = '';
            return true;
        } else {
            $scope.register.uiPasswordError = res;
            return false;
        }
    };

    $scope.startCountdown = function() {
        $scope.register.uiCountdown = verifyCodeTime;
        var t = $interval(function() {
            $scope.register.uiCountdown --;
            if (!$scope.register.uiCountdown) {
                $interval.cancel(t);
            }
        }, 1000);
    };

    $scope.verifyPhone = function() {
        if ($scope.checkPhone()) {
            $scope.startCountdown();
            wdAccount.verifyPhone($scope.register.phone);
        }
    };

    $scope.registerAccount = function() {
        if ($scope.checkPhone() && $scope.checkVerifyCode() && $scope.checkPassword()) {
            $scope.loading = true;
            wdAccount.register($scope.register).then(function(data) {
                $scope.loading = false;
                if (data.is_succ) {
                    $scope.register.uiSuccess = true;
                } else {
                    $scope.register.uiSuccess = false;
                    $scope.register.uiServerError = data.error_msg;
                }
            });
        }
    };

    // 监听上传状态
    // $scope.$on('wd-upload-form-success', function(e, data) {
    //     switch(data.face) {
    //         case 'front':
    //             $scope.$apply(function() {
    //                 $scope.person.uiFrontImageError = '';
    //                 $scope.person.uiFrontImageStatus = 2;
    //             });
    //         break;
    //         case 'back':
    //             $scope.$apply(function() {
    //                 $scope.person.uiBackImageError = '';
    //                 $scope.person.uiBackImageStatus = 2;
    //             });
    //         break;
    //     }
    // });
    // $scope.$on('wd-upload-form-start', function(e, data) {
    //     switch(data.face) {
    //         case 'front':
    //             $scope.$apply(function() {
    //                 $scope.person.uiFrontImageError = '';
    //                 $scope.person.uiFrontImageStatus = 1;
    //             });
    //         break;
    //         case 'back':
    //             $scope.$apply(function() {
    //                 $scope.person.uiBackImageError = '';
    //                 $scope.person.uiBackImageStatus = 1;
    //             });
    //         break;
    //     }
    // });
    // $scope.$on('wd-upload-form-error', function(e, data) {
    //     switch(data.face) {
    //         case 'front':
    //             $scope.$apply(function() {
    //                 $scope.person.uiFrontImageError = '上传失败';
    //                 $scope.person.uiFrontImageStatus = 3;
    //             });
    //         break;
    //         case 'back':
    //             $scope.$apply(function() {
    //                 $scope.person.uiBackImageError = '上传失败';
    //                 $scope.person.uiBackImageStatus = 3;
    //             });
    //         break;
    //     }
    // });

}]);
