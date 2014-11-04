/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has the duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.factory('wdMoney', 
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
        deposit: function(opts) {
            opts.amount = Number(opts.amount);
            return $http.post('/deposit', opts);
        },
        withdrawal: function(opts) {
            opts.amount = Number(opts.amount);
            return $http.post('/withdrawal', opts);
        }
    };
// 结束
}]);
