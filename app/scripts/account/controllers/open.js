/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.controller('openAccountCtrl', 
['$scope', 'wdAccount', '$timeout', '$location', 'wdStorage',
function ($scope, wdAccount, $timeout, $location, wdStorage) {
    $scope.step = 0;
    $scope.data = {
        // 交易品种
        // 股票和期权
        stock_plus: false,
        // 期货
        future: false,
        real_name: '',
        id_no: '',
        id_org: '',
        home_address: '',
        email: '',
        qq: '',
        // 通信地址
        post_address: '',
        // 职业类别
        job: null,
        // 工作单位
        work_units: '',
        // 所属行业
        industry: '',
        work_phone: '',
        work_address: '',
        // 资金来源
        income_source: null,
        year_income: null,
        total_assets: null,
        invest_knowledge: null,
        invest_objective: null,
        // 月度交易评论
        month_trade_freq: null,
        // 风险承受能力
        risk_tolerance: null,
        // 股票经验
        stock_exp: null
    };

    $scope.nextStep = function() {
        $scope.step ++;
    };
}]);
