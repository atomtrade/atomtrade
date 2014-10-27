'use strict';

angular.module('atomApp')
.controller('registerCtrl', 
['$scope', 'wdAccount', '$timeout', 'wdConfig', 'wdStorage', '$location', '$interval',
function ($scope, wdAccount, $timeout, wdConfig, wdStorage, $location, $interval) {
    $scope.loading = false;
    $scope.register = {
        phone: '',
        verify_code: '',
        password: '',
        nickName: '',
        invite_code: '',
        uiPhoneTip: '',
        uiVerifyCodeTip: '',
        uiPasswordTip: '',
        uiNickNameTip: '',
        uiInviteCodeTip: '',
        uiPhoneError: '',
        uiVerifyCodeError: '',
        uiPasswordError: '',
        uiNickNameError: '',
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
    $scope.focusNickName = function() {
        $scope.register.uiNickNameTip = '4-20 个字符，支持中文、字母、数字和符号';
        $scope.register.uiNickNameError = '';
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
    $scope.blurNickName = function() {
        $scope.register.uiNickNameTip = '';
        $scope.checkNickName();
    };
    $scope.blurInviteCode = function() {
        $scope.register.uiInviteCodeTip = '';
        $scope.checkNickName();
    };

    $scope.checkPhone = function() {
        if (!$scope.register.phone) {
            $scope.register.uiPhoneError = '手机号不能为空';
            return false;
        } else if (/\D/g.test($scope.register.phone)) {
            $scope.register.uiPhoneError = '手机号不能非数字字符';
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

    $scope.checkNickName = function() {
        if (!$scope.register.nickName) {
            $scope.register.uiNickNameError = '昵称不能为空';
            return false;
        } else {
            $scope.register.uiNickNameError = '昵称不能为空';
            return true;
        }
    };

    $scope.startCountdown = function() {
        $scope.register.uiCountdown = 30;
        var t = $interval(function() {
            $scope.register.uiCountdown --;
            if (!$scope.register.uiCountdown) {
                $interval.cancel(t);
            }
        }, 1000);
    };

    $scope.verifyPhone = function() {
        $scope.startCountdown();
        return wdAccount.verifyPhone($scope.register.phone);
    };

    $scope.registerAccount = function() {
        $scope.loading = true;
        $timeout(function() {
            $scope.loading = false;
            $scope.register.uiSuccess = true;
        }, 3000);
        wdAccount.register($scope.register).then(function(data) {
            $scope.register.uiSuccess = true;
            $scope.loading = false;
        }, function(data) {
            console.log(data);
        });
    };

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


/*
    $scope.step = Number(wdStorage.item('register-step')) || 1;
    $scope.loading = true;
    $scope.uploadUrl = wdConfig.apiUrl + '/upload';
    $scope.signIn = {
        phone: '',
        verify_code: '',
        password: '',
        uiPhoneError: '',
        uiVerifyCodeError: '',
        uiPasswordError: '',
        uiInviteCodeError: ''
    };

    $scope.person = {
        real_name: '',
        id_no: '',
        email: '',
        address: '',
        invite_code: '',
        qq: '',
        uiRealNameError: '',
        uiIdNoError: '',
        uiEmailError: '',
        uiAddressError: '',
        uiInvitePhoneError: '',
        uiQQError: '',
        // 上传状态：0、未上传；1、上传中，2、上传成功；3、上传失败；
        uiFrontImageStatus: 0,
        uiBackImageStatus: 0,
        uiFrontImageError: '',
        uiBackImageError: ''
    };

    $scope.goToRegister = function() {
        if (checkPhone() && checkPassword()) {
            verifyPhone().then(function(data) {
                if (data.is_succ) {
                    savePassword();
                    savePhone();
                    $location.path('/register');
                } else {
                    $scope.signIn.uiPhoneError = data.error_msg;
                }
            });
        }
    };

    function goToIndex() {
        $location.path('/index');
    }

    function savePhone() {
        wdStorage.item('phone', $scope.signIn.phone);
    }

    function getPhone() {
        $scope.signIn.phone = wdStorage.item('phone');
        wdStorage.remove('phone');
    }

    function savePassword() {
        wdStorage.item('password', $scope.signIn.password);
    }

    function getPassword() {
        $scope.signIn.password = wdStorage.item('password');
        wdStorage.remove('password');
    }
    $scope.verifyPhone = function() {
        if (checkPhone()) {
            verifyPhone();
        } else {
            goToIndex();
        }
    };



    function checkRealName() {
        if (!$scope.person.real_name) {
            $scope.person.uiRealNameError = '真实姓名不能为空';
            return false;
        } else {
            $scope.person.uiRealNameError = '';
            return true;
        }
    }

    function checkIdNo() {
        if (!$scope.person.id_no) {
            $scope.person.uiIdNoError = '请填写身份证号码';
            return false;
        } else {
            $scope.person.uiIdNoError = '';
            return true;
        }
    }

    function checkEmail() {
        if (!$scope.person.email) {
            $scope.person.uiEmailError = '请填写电子邮件地址';
            return false;
        } else {
            $scope.person.uiEmailError = '';
            return true;
        }
    }

    function checkQQ() {
        if (!$scope.person.qq) {
            $scope.person.uiQQError = '请填写 QQ 号码';
            return false;
        } else {
            $scope.person.uiQQError = '';
            return true;
        }
    }

    function setInfo() {
        return wdAccount.setInfo($scope.person);
    }

    $scope.nextStep = function() {
        switch ($scope.step) {
            case 1:
                if (checkVerifyCode()) {
                    register();
                    nextStep();
                } else {
                    return false;
                }
            break;
            case 2:
                if (checkRealName() && checkIdNo() && checkEmail() && checkQQ()) {
                    setInfo().then(function(data) {
                        if (data.is_succ) {
                            nextStep();
                        } else {
                            $scope.person.uiIdNoError = data.error_msg;
                        }
                    });
                } else {
                    return false;
                }          
            break;
            case 3:
                nextStep();
            break;
            case 4:
                goToMoney();
            break;
            default:
                nextStep();
            break;
        }
    };

    $scope.goToStep = function(step) {
        $scope.step = step;
        wdStorage.item('register-step', step);
    };

    function nextStep() {
        $scope.step ++;
        $scope.goToStep($scope.step);
    }

    $scope.keyDown = function(e) {
        switch($location.path()) {
            case '/index':
                if (e.keyCode === 13) {
                    $scope.goToRegister();
                }
            break;
            case '/register':
                if (e.keyCode === 13) {
                    $scope.nextStep();
                }            
            break;
        }
    };

    function goToMoney() {
        $location.path('/money');
    }



    // 进入时的逻辑
    wdAccount.check().then(function(data) {
        if (wdStorage.item('is_set_info')) {
            $scope.step = 3;
        }
        if (wdStorage.item('is_set_id_pic')) {
            $scope.step = 4;
        }
        if (data.is_succ) {
            $scope.loading = false;
            // 已经完成注册申请过程
            if ($scope.step === 4) {
                $location.path('/money');
            } else {
                $location.path('/register');
                if ($scope.step < 2) {
                    $scope.goToStep(2);
                }
            }
        } else {
            $scope.loading = false;
        }
    }, function(data) {
        $scope.loading = false;
    });
*/

}]);
