'use strict';

angular.module('atomApp')
.controller('registerCtrl', 
['$scope', 'wdAccount', '$timeout', 'wdConfig', 'wdStorage', '$location', '$interval', '$window',
function ($scope, wdAccount, $timeout, wdConfig, wdStorage, $location, $interval, $window) {
    var verifyCodeTime = 60;
    $scope.loading = false;
    $scope.register = {
        phone: '',
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
        if (!$scope.register.phone) {
            $scope.register.uiPhoneError = '手机号不能为空';
            return false;
        } else if (/\D/g.test($scope.register.phone)) {
            $scope.register.uiPhoneError = '手机号不能非数字字符';
            return false;
        } else if ($scope.register.phone.length !== 11) {
            $scope.register.uiPhoneError = '手机号码位数不对';
            return false;
        } else {
            $scope.register.uiPhoneError = '';
            return true;
        }
    };

    $scope.checkVerifyCode = function() {
        if (!$scope.register.verify_code) {
            $scope.register.uiVerifyCodeError = '验证码不能为空';
            return false;
        } else {
            $scope.register.uiVerifyCodeError = '';
            return true;
        }
    };

    $scope.checkPassword = function() {
        if (!$scope.register.password) {
            $scope.register.uiPasswordError = '密码不能为空';
            return false;
        } else if (!/\D/.test($scope.register.password)) {
            $scope.register.uiPasswordError = '密码不能为纯数字';
            return false;
        } else if (!/[^A-Za-z]/.test($scope.register.password)) {
            $scope.register.uiPasswordError = '密码不能为纯字母';
            return false;
        } else if ($scope.register.password.length < 6) {
            $scope.register.uiPasswordError = '密码不能小于 6 位';
            return false;
        } else {
            $scope.register.uiPasswordError = '';
            return true;
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
