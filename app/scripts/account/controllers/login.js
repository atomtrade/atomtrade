'use strict';

angular.module('atomApp')
.controller('loginCtrl', 
['$scope', 'wdAccount', '$timeout', '$location', 'wdStorage',
function ($scope, wdAccount, $timeout, $location, wdStorage) {
    $scope.user = {
        phone: '',
        password: '',
        uiPhoneError: '',
        uiPasswordError: '',
        uiServerError: ''
    };

    function checkPhone() {
        if (!$scope.user.phone) {
            $scope.user.uiPhoneError = '手机号不能为空';
            return false;
        } else if (/\D/g.test($scope.user.phone)) {
            $scope.user.uiPhoneError = '手机号不能非数字字符';
            return false;
        } else if ($scope.user.phone.length !== 11) {
            $scope.user.uiPhoneError = '手机号码位数不对';
            return false;
        } else {
            $scope.user.uiPhoneError = '';
            return true;
        }
    }

    function checkPassword() {
        if (!$scope.user.password) {
            $scope.user.uiPasswordError = '请填密码';
            return false;
        } else {
            $scope.user.uiPasswordError = '';
            return true;
        }
    }

    $scope.login = function() {
        if (checkPhone() && checkPassword()) {
            wdAccount.login($scope.user).then(function(data) {
                console.log(data);
                if (data.is_succ) {
                    $location.path('/my-index');
                } else {
                    $scope.user.uiServerError = data.err_msg;
                }
            });
        }
    };

    $scope.keyDown = function(e) {
        if (e.keyCode === 13) {
            $scope.login();
        }
    };
}]);
