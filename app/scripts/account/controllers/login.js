/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.controller('loginCtrl', 
['$scope', 'wdAccount', '$timeout', '$location', 'wdStorage', 'wdCheck',
function ($scope, wdAccount, $timeout, $location, wdStorage, wdCheck) {
    $scope.loading = false;
    $scope.user = {
        phone: '',
        password: '',
        uiPhoneError: '',
        uiPasswordError: '',
        uiServerError: ''
    };

    function checkPhone() {
        var res = wdCheck.checkPhone($scope.user.phone);
        if (!res) {
            $scope.user.uiPhoneError = '';
            return true;
        } else {
            $scope.user.uiPhoneError = res;
            return false;
        }
    }

    function checkPassword() {
        var res = wdCheck.checkPassword($scope.user.password);
        if (!res) {
            $scope.user.uiPasswordError = '';
            return true;
        } else {
            $scope.user.uiPasswordError = res;
            return false;
        }
    }

    $scope.login = function() {
        if (checkPhone() && checkPassword()) {
            $scope.loading = true;
            wdAccount.login($scope.user).then(function(data) {
                if (data.is_succ) {
                    $location.path('/my-index');
                } else {
                    $scope.loading = false;
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
