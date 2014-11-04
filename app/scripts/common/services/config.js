/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has the duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.factory('wdConfig', 
['$rootScope', '$location', 
function($rootScope, $location) {
    return {
        apiUrl: '/api/v1',
        // webSocketUrl: 'ws://10.1.1.188/api/v1',
        webSocketUrl: 'ws://' + $location.host() + '/api/v1',
        httpTimeout: 10000
    };
    // 结束 
}]);
