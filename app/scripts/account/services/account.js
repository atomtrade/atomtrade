/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has the duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.factory('wdAccount', 
['$rootScope', '$http', 'wdStorage', '$q',
function($rootScope, $http, wdStorage, $q) {
    var isLogin = false;
    // 是否检查过登录状态
    var isCheckLoginFlag = false;
    return {
        check: function() {
            var d = $q.defer();
            if (isCheckLoginFlag) {
                if (isLogin) {
                    d.resolve({
                        is_succ: true
                    });
                } else {
                    d.resolve({
                        is_succ: false
                    });
                }
            } else {
                isCheckLoginFlag = true;
                $http.get('/check').then(function(data) {
                    if (data.is_succ) {
                        isLogin = true;
                        d.resolve({
                            is_succ: true
                        });
                    }
                });
            }
            return d.promise;
        },
        verifyPhone: function(num) {
            return $http.get('/verify', {
                params: {
                    phone: String(num)
                }
            });
        },
        register: function(opts) {
            return $http.post('/register', opts);
        },
        login: function(opts) {
            wdStorage.removeAll();
            var p = $http.post('/login', opts);
            p.then(function(data) {
                if (data.is_succ) {
                    isLogin = true;
                }
            });
            return p;
        },
        logout: function() {
            wdStorage.removeAll();
            isLogin = false;
            return $http.get('/logout');
        },
        setInfo: function(opts) {
            return $http.post('/set_info', opts);
        },
        getInfo: function() {
            return $http.get('/get_info');
        },
        setRisk: function(opts) {
            return $http.post('/risk', opts);
        },
        changePassword: function(opts) {
            return $http.post('/change_password', opts);
        },
        verifyPasswordPhone: function(num) {
            return $http.get('/find_password', {
                params: {
                    phone: String(num)
                }
            });
        },
        findPassword: function(opts) {
            return $http.post('/find_password', opts);
        }
    };
    // 结束 
}]);
