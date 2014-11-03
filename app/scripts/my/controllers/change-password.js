'use strict';
angular.module('atomApp')
.controller('myChangePasswordCtrl', 
['$scope', 'wdAccount', '$location',
function ($scope, wdAccount, $location) {
    $scope.loading = true;
    $scope.isLogin = false;
    wdAccount.check().then(function(data) {
        $scope.loading = false;
        if (data.is_succ) {
            $scope.isLogin = false;
        }
    });
    $scope.userInfo = {
        phone: '',
        code: '',
        id_no: '',
        new_pwd: ''
    };
    $scope.changePassword = function() {

    };
}]);
