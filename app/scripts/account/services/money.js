/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.factory('wdAccountMoney', 
['$window', '$location', 'wdConfig', '$http',
function($window, $location, wdConfig, $http) {
    var equitySocketUrl = wdConfig.webSocketUrl + '/equity';
    console.log(equitySocketUrl);

    // 当前接口的 socket 对象
    var equitySocket;
    return {
        equitySocket: function() {
            if (equitySocket) {
                return equitySocket;
            } else {
                equitySocket = new WebSocket(equitySocketUrl);
                return equitySocket;
            }
        },
        pay: function(money) {
            $window.open(wdConfig.apiUrl + '/pay?amount=' + money);
        }
    };
// 结束
}]);
