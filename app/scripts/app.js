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
['ngCookies', 'ngResource', 'ngRoute', 'ngSanitize'])
.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
$routeProvider
    .when('/account-login', {
        templateUrl: 'views/account/login.html',
        controller: 'loginCtrl'
    })
    .when('/account-register', {
        templateUrl: 'views/account/register.html',
        controller: 'registerCtrl'
    })
    .when('/account-open', {
        templateUrl: 'views/account/open.html',
        controller: 'openAccountCtrl'
    })
    .when('/my-index', {
        templateUrl: 'views/my/my-index.html'
    })
    .otherwise({
        redirectTo: '/account-login'
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
