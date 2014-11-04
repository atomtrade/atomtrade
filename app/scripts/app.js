/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has the duty to keep the code elegant
 */

'use strict';

/**
 * @ngdoc overview
 * @name atomApp
 * @description
 * # atomApp
 *
 * Main module of the application.
 */
angular
.module('atomApp', 
['ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngAnimate'])
.config(['$routeProvider', '$httpProvider', 
function ($routeProvider, $httpProvider) {
$routeProvider
    .when('/index', {
        templateUrl: 'views/index/index.html',
        controller: 'indexCtrl'
    })
    .when('/download', {
        templateUrl: 'views/index/download.html',
        controller: 'downloadCtrl'
    })
    .when('/account-register', {
        templateUrl: 'views/account/register.html',
        controller: 'registerCtrl'
    })
    .when('/account-login', {
        templateUrl: 'views/account/login.html',
        controller: 'loginCtrl'
    })
    .when('/account-open', {
        templateUrl: 'views/account/open.html',
        controller: 'openAccountCtrl'
    })
    .when('/about-company', {
        templateUrl: 'views/about/company.html'
    })
    .when('/about-license', {
        templateUrl: 'views/about/license.html'
    })
    .when('/about-contact', {
        templateUrl: 'views/about/contact.html'
    })
    .when('/about-money', {
        templateUrl: 'views/about/money.html'
    })
    .when('/my-index', {
        templateUrl: 'views/my/index.html',
        controller: 'myCtrl'
    })
    .when('/my-change-password', {
        templateUrl: 'views/my/change-password.html',
        controller: 'myChangePasswordCtrl'
    })
    .when('/my-money-in', {
        templateUrl: 'views/my/money-in.html',
        controller: 'myMoneyInCtrl'
    })
    .when('/my-money-out', {
        templateUrl: 'views/my/money-out.html',
        controller: 'myMoneyOutCtrl'
    })
    .otherwise({
        redirectTo: '/index'
    });

    // 全局 $http 请求配置。
    $httpProvider.interceptors.push(['wdConfig', '$location', function(wdConfig, $location) {
        return {
            'request': function(config) {
                config.timeout = wdConfig.httpTimeout;
                if (!/^[http|https]/.test(config.url) && !/\.html$/.test(config.url)) {
                    config.url = wdConfig.apiUrl + config.url;
                }
                return config;
            },
            'response': function(response) {
                if (/\.html/.test(response.config.url)) {
                    return response;
                } else {
                    return response.data;
                }
            }
            // 'responseError': function(response) {
            //     console.log(response.status);
            //     if (response.status !== 200) {
            //         $location.path('/index');
            //     }
            //     return response;
            // }
        };
    }]);
}]);
