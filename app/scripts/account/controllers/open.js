/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.controller('openAccountCtrl', 
['$scope', 'wdAccount', '$timeout', '$location', 'wdStorage', '$window', 'wdCheck',
function ($scope, wdAccount, $timeout, $location, wdStorage, $window, wdCheck) {
    $scope.loading = true;
    wdAccount.check().then(function(data) {
        if (data.is_succ) {
            $scope.loading = false;
        } else {
            $location.path('/account-login');
        }
    });

    $scope.step = 1;
    $scope.userInfo = {
        // 交易品种
        // 股票和期权
        stock: true,
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
        uiSelect1: false,
        uiSelect2: false,
        uiSelect3: false,
        uiSelect4: false,
        uiSelect5: false,
        uiSelect6: false,
        uiSelect7: false,
        uiSelect1Error: false,
        uiSelect2Error: false,
        uiSelect3Error: false,
        uiSelect4Error: false,
        uiSelect5Error: false,
        uiSelect6Error: false,
        uiSelect7Error: false,

        uiServerError: ''
    };

    $scope.uiDraftSuccess = false;

    var userInfo = wdStorage.item('userInfo');
    if (userInfo) {
        $scope.userInfo = JSON.parse(userInfo);
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
        if (!$scope.userInfo.email) {
            $scope.userInfo.uiEmailError = '请填写「电子邮件地址」';
            return false;
        } else {
            $scope.userInfo.uiEmailError = '';
            return true;
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
        switch ($scope.step) {
            case 1:
                if (checkRealName() && 
                    checkIdNo() && 
                    checkIdOrg() && 
                    checkHomeAddress() && 
                    checkEmail() && 
                    checkQQ() && 
                    checkPostAddress() && 
                    checkWorkAddress() && 
                    checkBusiness() && 
                    checkWorkPhone() && 
                    checkWorkAddress()) {
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
                if (checkSelected()) {
                    wdAccount.setRisk($scope.userInfo).then(function(data) {
                        $scope.loading = false;
                        if (data.is_succ) {
                            $scope.step = 3;
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

    $scope.saveDraft = function() {
        wdStorage.item('userInfo', JSON.stringify($scope.userInfo));
        $scope.uiDraftSuccess = true;
        $timeout(function() {
            $scope.uiDraftSuccess = false;
        }, 2000);
    };
}]);
