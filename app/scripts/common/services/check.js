/**
 * @author wangxiao
 * 
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 */

'use strict';

angular.module('atomApp')
.factory('wdCheck', 
['$rootScope', 
function($rootScope) {

    function isCnNewID(cid) {  
        //加权因子
        var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验码 
        var arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]; 
        if (/^\d{17}\d|x$/i.test(cid)) {  
            var sum = 0, idx;  
            for (var i = 0; i < cid.length - 1; i ++ ) {  
                // 对前17位数字与权值乘积求和  
                sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];  
            }  
            // 计算模（固定算法）  
            idx = sum % 11;  
            // 检验第18为是否与校验码相等  
            return arrValid[idx] === Number(cid.substr(17, 1).toUpperCase());
        } else {
            return false;
        }
    }

    return {
        checkIdNo: function(idNo) {
            if (!idNo) {
                return '请填写「身份证号码」';
            } else if (!isCnNewID(idNo)) {
                return '身份证号有误，请检查';
            } else {
                return false;
            }
        },
        checkPhone: function(phone) {
            if (!phone) {
                return '手机号不能为空';
            } else if (/\D/g.test(phone)) {
                return '手机号不能非数字字符';
            } else if (phone.length !== 11) {
                return '手机号码位数不对';
            } else {
                return false;
            }
        },
        checkPassword: function(password) {
            if (!password) {
                return '密码不能为空';
            } else if (!/\D/.test(password)) {
                return '密码不能为纯数字';
            } else if (!/[^A-Za-z]/.test(password)) {
                return '密码不能为纯字母';
            } else if (password.length < 6) {
                return '密码不能小于 6 位';
            } else if (/[^\dA-Za-z]/.test(password)) {
                return '密码不要用中文或者特殊字符';
            } else {
                return false;
            }
        },
        checkVerifyCode: function(code) {
            if (!code) {
                return '验证码不能为空';
            } else {
                return false;
            }
        },
        checkAmount: function(amount) {
            if (/[^\d|\.]/.test(amount)) {
                return '请填写数字';
            } else if (!amount) {
                return '请填写金额';
            } else {
                return false;
            }
        }
    };
    // 结束 
}]);
