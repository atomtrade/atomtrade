/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.controller('openAccountCtrl', 
['$scope', 'wdAccount', '$timeout', '$location', 'wdStorage', '$window', 'wdCheck', '$interval',
function ($scope, wdAccount, $timeout, $location, wdStorage, $window, wdCheck, $interval) {
    $scope.loading = true;
    wdAccount.check().then(function(data) {
        if (data.is_succ) {
            $scope.loading = false;
        } else {
            $location.path('/account-login');
        }
    });
    $scope.step = 1;
    if (wdStorage.item('is_set_info')) {
        $scope.step = 2;
    }
    if (wdStorage.item('is_set_risk')) {
        $scope.step = 3;
    }
    $scope.uiJobOptions = [
        {name: '受雇', value: 1},
        {name: '自营', value: 2},
        {name: '退休', value: 3},
        {name: '待业', value: 4},
        {name: '其他', value: 5}
    ];
    $scope.uiMoneySourceOptions = [
        {name: '薪资', value: 1},
        {name: '存款', value: 2},
        {name: '遗产/受赠', value: 3},
        {name: '投资收益', value: 4}
    ];
    $scope.uiYearIncomeOptions = [
        {name: '小于 20 万', value: 1},
        {name: '20-50 万', value: 2},
        {name: '50-100 万', value: 3},
        {name: '大于 100 万', value: 4}
    ];
    $scope.uiTotalAssetsOptions = [
        {name: '小于 50 万', value: 1},
        {name: '50-250 万', value: 2},
        {name: '250-500 万', value: 3},
        {name: '大于 500 万', value: 4}
    ];
    $scope.uiEstimatedExpensesOptions = [
        {name: '小于 20 万', value: 1},
        {name: '20-50 万', value: 2},
        {name: '50-100 万', value: 3},
        {name: '大于 100 万', value: 4}
    ];
    $scope.uiInvestKnowledgeOptions = [
        {name: '精通', value: 1},
        {name: '良好', value: 2},
        {name: '较好', value: 3},
        {name: '有限', value: 4},
        {name: '全无', value: 5}
    ];
    $scope.uiInvestObjectiveOptions = [
        {name: '增值', value: 1},
        {name: '收入', value: 2},
        {name: '投机', value: 3},
        {name: '对冲', value: 4},
        {name: '其他', value: 5}
    ];
    $scope.uiRiskToleranceOptions = [
        {name: '低', value: 1},
        {name: '中', value: 2},
        {name: '高', value: 3}
    ];
    $scope.uiStockExpOptions = [
        {name: '没有经验', value: 1},
        {name: '少于 1 年', value: 2},
        {name: '1-2 年', value: 3},
        {name: '3 年以上', value: 4}
    ];
    $scope.uiFixedIncomeExpOptions = [
        {name: '没有经验', value: 1},
        {name: '少于 1 年', value: 2},
        {name: '1-2 年', value: 3},
        {name: '3 年以上', value: 4}
    ];
    $scope.uiBondExpOptions = [
        {name: '没有经验', value: 1},
        {name: '少于 1 年', value: 2},
        {name: '1-2 年', value: 3},
        {name: '3 年以上', value: 4}
    ];
    $scope.uiFutureExpOptions = [
        {name: '没有经验', value: 1},
        {name: '少于 1 年', value: 2},
        {name: '1-2 年', value: 3},
        {name: '3 年以上', value: 4}
    ];
    $scope.uiForexExpOptions = [
        {name: '没有经验', value: 1},
        {name: '少于 1 年', value: 2},
        {name: '1-2 年', value: 3},
        {name: '3 年以上', value: 4}
    ];

    $scope.userInfo = {
        // 交易品种
        usstock: true,
        hkstock: true,
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
        job: 1,
        // 工作单位
        company: '',
        // 所属行业
        business: '',
        work_phone: '',
        work_address: '',
        // 资金来源
        money_source: 1,
        year_income: 1,
        total_assets: 1,
        // 预计入金
        estimated_expenses: 1,
        invest_knowledge: 1,
        invest_objective: 1,
        // 风险承受能力
        risk_tolerance: 1,
        // 股票经验
        stock_exp: 1,
        fixed_income_exp: 1,
        bond_exp: 1,
        future_exp: 1,
        forex_exp: 1,

        uiRealNameError: '',
        uiIdNoError: '',
        uiIdOrgError: '',
        uiHomeAddressError: '',
        uiEmailError: '',
        uiQqError: '',
        // 通信地址
        uiPostAddressError: '',
        // 工作单位
        uiCompanyError: '',
        // 所属行业
        uiBusinessError: '',
        uiWorkPhoneError: '',
        uiWorkAddressError: '',

        // 勾选类
        uiSelect1: true,
        uiSelect2: true,
        uiSelect3: true,
        uiSelect4: true,
        uiSelect5: true,
        uiSelect6: true,
        uiSelect7: true,
        uiSelect1Error: false,
        uiSelect2Error: false,
        uiSelect3Error: false,
        uiSelect4Error: false,
        uiSelect5Error: false,
        uiSelect6Error: false,
        uiSelect7Error: false,

        uiServerError: '',
        uiJobOption: $scope.uiJobOptions[0],
        uiMoneySourceOption: $scope.uiMoneySourceOptions[0],
        uiYearIncomeOption: $scope.uiYearIncomeOptions[0],
        uiTotalAssetsOption: $scope.uiTotalAssetsOptions[0],
        uiEstimatedExpensesOption: $scope.uiEstimatedExpensesOptions[0],
        uiInvestKnowledgeOption: $scope.uiInvestKnowledgeOptions[0],
        uiInvestObjectiveOption: $scope.uiInvestObjectiveOptions[0],
        uiRiskToleranceOption: $scope.uiRiskToleranceOptions[0],
        uiStockExpOption: $scope.uiStockExpOptions[0],
        uiFixedIncomeExpOption: $scope.uiFixedIncomeExpOptions[0],
        uiBondExpOption: $scope.uiBondExpOptions[0],
        uiFutureExpOption: $scope.uiFutureExpOptions[0],
        uiForexExpOption: $scope.uiForexExpOptions[0]
    };

    function fillData() {
        $scope.userInfo.job = $scope.userInfo.uiJobOption.value;
        $scope.userInfo.money_source = $scope.userInfo.uiMoneySourceOption.value;
        $scope.userInfo.year_income = $scope.userInfo.uiYearIncomeOption.value;
        $scope.userInfo.total_assets = $scope.userInfo.uiTotalAssetsOption.value;
        $scope.userInfo.estimated_expenses = $scope.userInfo.uiEstimatedExpensesOption.value;
        $scope.userInfo.invest_knowledge = $scope.userInfo.uiInvestKnowledgeOption.value;
        $scope.userInfo.invest_objective = $scope.userInfo.uiInvestObjectiveOption.value;
        $scope.userInfo.risk_tolerance = $scope.userInfo.uiRiskToleranceOption.value;        
        $scope.userInfo.stock_exp = $scope.userInfo.uiStockExpOption.value;        
        $scope.userInfo.fixed_income_exp = $scope.userInfo.uiFixedIncomeExpOption.value;        
        $scope.userInfo.bond_exp = $scope.userInfo.uiBondExpOption.value;        
        $scope.userInfo.future_exp = $scope.userInfo.uiFutureExpOption.value;        
        $scope.userInfo.forex_exp = $scope.userInfo.uiForexExpOption.value;        
    }

    $scope.uiDraftSuccess = false;

    var userInfo = wdStorage.item('userInfo-mobile');
    if (userInfo) {
        $scope.userInfo = JSON.parse(userInfo);
        $scope.userInfo.uiJobOption = findObj($scope.userInfo.uiJobOption, $scope.uiJobOptions);
        $scope.userInfo.uiMoneySourceOption = findObj($scope.userInfo.uiMoneySourceOption, $scope.uiMoneySourceOptions);
        $scope.userInfo.uiYearIncomeOption = findObj($scope.userInfo.uiYearIncomeOption, $scope.uiYearIncomeOptions);
        $scope.userInfo.uiTotalAssetsOption = findObj($scope.userInfo.uiTotalAssetsOption, $scope.uiTotalAssetsOptions);
        $scope.userInfo.uiEstimatedExpensesOption = findObj($scope.userInfo.uiEstimatedExpensesOption, $scope.uiEstimatedExpensesOptions);
        $scope.userInfo.uiInvestKnowledgeOption = findObj($scope.userInfo.uiInvestKnowledgeOption, $scope.uiInvestKnowledgeOptions);
        $scope.userInfo.uiInvestObjectiveOption = findObj($scope.userInfo.uiInvestObjectiveOption, $scope.uiInvestObjectiveOptions);
        $scope.userInfo.uiRiskToleranceOption = findObj($scope.userInfo.uiRiskToleranceOption, $scope.uiRiskToleranceOptions);
        $scope.userInfo.uiStockExpOption = findObj($scope.userInfo.uiStockExpOption, $scope.uiStockExpOptions);
        $scope.userInfo.uiFixedIncomeExpOption = findObj($scope.userInfo.uiFixedIncomeExpOption, $scope.uiFixedIncomeExpOptions);
        $scope.userInfo.uiBondExpOption = findObj($scope.userInfo.uiBondExpOption, $scope.uiBondExpOptions);
        $scope.userInfo.uiFutureExpOption = findObj($scope.userInfo.uiFutureExpOption, $scope.uiFutureExpOptions);
        $scope.userInfo.uiForexExpOption = findObj($scope.userInfo.uiForexExpOption, $scope.uiForexExpOptions);
    }

    function findObj(obj, objs) {
        var temp;
        $.each(objs, function(i, v) {
            if (obj.name === v.name) {
                temp = v;               
            }
        });
        return temp;
    }

    $scope.blurRealName = function() {
        checkRealName();
    };
    $scope.blurIdNo = function() {
        checkIdNo();
    };
    $scope.blurIdOrg = function() {
        checkIdOrg();
    };
    $scope.blurHomeAddress = function() {
        checkHomeAddress();
    };
    $scope.blurEmail = function() {
        checkEmail();
    };
    $scope.blurQq = function() {
        checkQQ();
    };
    $scope.blurPostAddress = function() {
        checkPostAddress();
    };
    $scope.blurCompany = function() {
        checkCompany();
    };
    $scope.blurBusiness = function() {
        checkBusiness();
    };
    $scope.blurWorkPhone = function() {
        checkWorkPhone();
    };
    $scope.blurWorkAddress = function() {
        checkWorkAddress();
    };

    function checkRealName() {
        if (!$scope.userInfo.real_name) {
            $scope.userInfo.uiRealNameError = '真实姓名不能为空';
            return false;
        } else if (/[u4E00-u9FA5]/.test($scope.userInfo.real_name)) {
            $scope.userInfo.uiRealNameError = '真实姓名必须是中文';
            return false;
        } else {
            $scope.userInfo.uiRealNameError = '';
            return true;
        }
    }

    function checkIdNo() {
        var res = wdCheck.checkIdNo($scope.userInfo.id_no);
        if (!res) {
            $scope.userInfo.uiIdNoError = '';
            return true;
        } else {
            $scope.userInfo.uiIdNoError = res;
            return false;
        }
    }

    function checkIdOrg() {
        if (!$scope.userInfo.id_org) {
            $scope.userInfo.uiIdOrgError = '请填写「签发机构」';
            return false;
        } else {
            $scope.userInfo.uiIdOrgError = '';
            return true;
        }
    }

    function checkHomeAddress() {
        if (!$scope.userInfo.home_address) {
            $scope.userInfo.uiHomeAddressError = '请填写「住宅地址」';
            return false;
        } else {
            $scope.userInfo.uiHomeAddressError = '';
            return true;
        }
    }

    function checkEmail() {
        var res = wdCheck.checkEmail($scope.userInfo.email);
        if (!res) {
            $scope.userInfo.uiEmailError = '';
            return true;
        } else {
            $scope.userInfo.uiEmailError = res;
            return false;
        }
    }

    function checkQQ() {
        if (!$scope.userInfo.qq) {
            $scope.userInfo.uiQqError = '请填写「QQ 号码」';
            return false;
        } else {
            $scope.userInfo.uiQqError = '';
            return true;
        }
    }

    function checkPostAddress() {
        if (!$scope.userInfo.post_address) {
            $scope.userInfo.uiPostAddressError = '请填写「通信地址」';
            return false;
        } else {
            $scope.userInfo.uiPostAddressError = '';
            return true;
        }
    }

    function checkCompany() {
        if (!$scope.userInfo.company) {
            $scope.userInfo.uiCompanyError = '请填写「工作单位」';
            return false;
        } else {
            $scope.userInfo.uiCompanyError = '';
            return true;
        }
    }

    function checkBusiness() {
        if (!$scope.userInfo.business) {
            $scope.userInfo.uiBusinessError = '请填写「所属行业」';
            return false;
        } else {
            $scope.userInfo.uiBusinessError = '';
            return true;
        }
    }

    function checkWorkPhone() {
        if (!$scope.userInfo.work_phone) {
            $scope.userInfo.uiWorkPhoneError = '请填写「工作电话」';
            return false;
        } else {
            $scope.userInfo.uiWorkPhoneError = '';
            return true;
        }
    }
    function checkWorkAddress() {
        if (!$scope.userInfo.work_address) {
            $scope.userInfo.uiWorkAddressError = '请填写「工作地址」';
            return false;
        } else {
            $scope.userInfo.uiWorkAddressError = '';
            return true;
        }
    }

    function checkSelected() {
        var result = true;
        for (var i = 1 ; i <= 7; i ++) {
            if (!$scope.userInfo['uiSelect' + i]) {
                result = false;
                $scope.userInfo['uiSelect' + i + 'Error'] = true;
            } else {
                $scope.userInfo['uiSelect' + i + 'Error'] = false;
            }
        }
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    $scope.backToStep1 = function() {
        $scope.step = 1;
    };

    $scope.nextStep = function() {
        $scope.loading = true;
        fillData();
        $scope.saveDraft();
        switch ($scope.step) {
            case 1:
                if (checkRealName() && 
                    checkIdNo() && 
                    checkIdOrg() && 
                    // checkHomeAddress() && 
                    checkEmail() && 
                    checkQQ() && 
                    // checkPostAddress() && 
                    // checkWorkAddress() && 
                    checkBusiness()) {
                        wdAccount.setInfo($scope.userInfo).then(function(data) {
                            $scope.loading = false;
                            if (data.is_succ) {
                                $scope.step = 2;
                            } else {
                                $scope.userInfo.uiServerError = data.error_msg;
                            }
                        });
                } else {
                    $scope.loading = false;
                }
            break;
            case 2:
                $scope.step = 3;
                $scope.loading = false;
            break;
            case 3:
                if (checkSelected()) {
                    wdAccount.setRisk($scope.userInfo).then(function(data) {
                        $scope.loading = false;
                        if (data.is_succ) {
                            $scope.step = 4;
                        } else {
                            $scope.userInfo.uiServerError = data.error_msg;
                        }
                    });
                } else {
                    $scope.loading = false;
                }
            break;
        }
    };

    function saveDraft() {
        wdStorage.item('userInfo-mobile', JSON.stringify($scope.userInfo));
    }

    $scope.saveDraft = function() {
        saveDraft();
        $scope.uiDraftSuccess = true;
        $timeout(function() {
            $scope.uiDraftSuccess = false;
        }, 2000);
    };

    var timer = $interval(function() {
        saveDraft();
    }, 1000);

    $scope.$on('$destroy', function() {
        $interval.cancel(timer);
    });

}]);
