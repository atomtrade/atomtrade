'use strict';
angular.module('atomApp')
.controller('myCtrl', 
['$scope', 'wdAccount', '$location',
function ($scope, wdAccount, $location) {
    $scope.loading = true;
    wdAccount.check().then(function(data) {
        if (data.is_succ) {
            $scope.loading = false;
        } else {
            $location.path('/account-login');
        }
    });
}]);
