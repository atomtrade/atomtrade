/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has the duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.factory('wdStorage', ['$window', function($window) {
    function get(name) {
        return $window.localStorage.getItem(name);
    }

    function set(name, value) {
        return $window.localStorage.setItem(name, value);
    }

    function remove(name) {
        $window.localStorage.removeItem(name);
    }
    return {
        item: function(name, value) {
            switch (arguments.length) {
                case 1:
                return get(name);
                case 2:
                return set(name, value);
            }
        },
        remove: function(name) {
            remove(name);
        },
        removeAll: function() {
            var list = ['userInfo'];
            $.each(list, function(i, v) {
                remove(v);
            });
        }
    };
    // 结束 
}]);
