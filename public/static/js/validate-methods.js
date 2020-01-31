$(function() {

	// 判断整数value是否等于0
	jQuery.validator.addMethod("isIntEqZero", function(value, element) {
		value = parseInt(value);
		return this.optional(element) || value == 0;
	}, "整数必须为0");

	// 判断整数value是否大于0
	jQuery.validator.addMethod("isIntGtZero", function(value, element) {
		value = parseInt(value);
		return this.optional(element) || value > 0;
	}, "整数必须大于0");

	// 判断整数value是否大于或等于0
	jQuery.validator.addMethod("isIntGteZero", function(value, element) {
		value = parseInt(value);
		return this.optional(element) || value >= 0;
	}, "整数必须大于或等于0");

	// 判断整数value是否不等于0
	jQuery.validator.addMethod("isIntNEqZero", function(value, element) {
		value = parseInt(value);
		return this.optional(element) || value != 0;
	}, "整数必须不等于0");

	// 判断整数value是否小于0
	jQuery.validator.addMethod("isIntLtZero", function(value, element) {
		value = parseInt(value);
		return this.optional(element) || value < 0;
	}, "整数必须小于0");

	// 判断整数value是否小于或等于0
	jQuery.validator.addMethod("isIntLteZero", function(value, element) {
		value = parseInt(value);
		return this.optional(element) || value <= 0;
	}, "整数必须小于或等于0");

	// 判断浮点数value是否等于0
	jQuery.validator.addMethod("isFloatEqZero", function(value, element) {
		value = parseFloat(value);
		return this.optional(element) || value == 0;
	}, "浮点数必须为0");

	// 判断浮点数value是否大于0
	jQuery.validator.addMethod("isFloatGtZero", function(value, element) {
		value = parseFloat(value);
		return this.optional(element) || value > 0;
	}, "浮点数必须大于0");

	// 判断浮点数value是否大于或等于0
	jQuery.validator.addMethod("isFloatGteZero", function(value, element) {
		value = parseFloat(value);
		return this.optional(element) || value >= 0;
	}, "浮点数必须大于或等于0");

	// 判断浮点数value是否不等于0
	jQuery.validator.addMethod("isFloatNEqZero", function(value, element) {
		value = parseFloat(value);
		return this.optional(element) || value != 0;
	}, "浮点数必须不等于0");

	// 判断浮点数value是否小于0
	jQuery.validator.addMethod("isFloatLtZero", function(value, element) {
		value = parseFloat(value);
		return this.optional(element) || value < 0;
	}, "浮点数必须小于0");

	// 判断浮点数value是否小于或等于0
	jQuery.validator.addMethod("isFloatLteZero", function(value, element) {
		value = parseFloat(value);
		return this.optional(element) || value <= 0;
	}, "浮点数必须小于或等于0");

	// 判断浮点型
	jQuery.validator.addMethod("isFloat", function(value, element) {
		return this.optional(element) || /^[-\+]?\d+(\.\d+)?$/.test(value);
	}, "只能包含数字、小数点等字符");

	// 匹配integer
	jQuery.validator.addMethod("isInteger", function(value, element) {
		return this.optional(element)
				|| (/^[-\+]?\d+$/.test(value) && parseInt(value) >= 0);
	}, "匹配integer");

	// 判断数值类型，包括整数和浮点数
	jQuery.validator.addMethod("isNumber", function(value, element) {
		return this.optional(element) || /^[-\+]?\d+$/.test(value)
				|| /^[-\+]?\d+(\.\d+)?$/.test(value);
	}, "匹配数值类型，包括整数和浮点数");

	// 只能输入[0-9]数字
	jQuery.validator.addMethod("isDigits", function(value, element) {
		return this.optional(element) || /^\d+$/.test(value);
	}, "只能输入0-9数字");

	// 判断中文字符
	jQuery.validator.addMethod("isChinese", function(value, element) {
		return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
	}, "只能包含中文字符。");

	// 判断英文字符
	jQuery.validator.addMethod("isEnglish", function(value, element) {
		return this.optional(element) || /^[A-Za-z]+$/.test(value);
	}, "只能包含英文字符。");

	// 手机号码验证
	jQuery.validator.addMethod("isMobile", function(value, element) {
		var length = value.length;
		return this.optional(element)
				|| (length == 11 && /^1[3|4|5|6|7|8]\d{9}$/.test(value));
	}, "请正确填写您的手机号码。");

	// 邮箱验证
	jQuery.validator
			.addMethod(
					"isEmail",
					function(value, element) {
						// var length = value.length;
						return this.optional(element)
								||(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value))
								//|| (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value));
					}, "请正确填写您的邮箱。");

	// 电话号码验证
	jQuery.validator.addMethod("isPhone", function(value, element) {
		var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
		return this.optional(element) || (tel.test(value));
	}, "请正确填写您的电话号码。");

	// 联系电话(手机/电话皆可)验证
	jQuery.validator.addMethod("isTel", function(value, element) {
		var length = value.length;
		var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
		return this.optional(element) || tel.test(value)
				|| (length == 11 && mobile.test(value));
	}, "请正确填写您的联系方式");

	// 匹配qq
	jQuery.validator.addMethod("isQq", function(value, element) {
		return this.optional(element) || /^[1-9]\d{4,12}$/.test(value);
	}, "匹配QQ");

	// 邮政编码验证
	jQuery.validator.addMethod("isZipCode", function(value, element) {
		var zip = /^[0-9]{6}$/;
		return this.optional(element) || (zip.test(value));
	}, "请正确填写您的邮政编码。");

	// 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。
	jQuery.validator.addMethod("isPwd", function(value, element) {
		var part = /^\w{6,12}$/;
		return this.optional(element) || part.test(value);
	}, "长度在6-12之间，只能包含字符、数字和下划线。");

	// 身份证号码验证
	jQuery.validator.addMethod("isIdCardNo", function(value, element) {
		// var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;
		return this.optional(element) || isIdCardNo(value);
	}, "请输入正确的身份证号码。");

	// 判断复选框是否选中
	jQuery.validator.addMethod("isCheck", function(value, element) {
		return element.checked;
	}, "请先阅读并选中。");

	// IP地址验证
	jQuery.validator
			.addMethod(
					"ip",
					function(value, element) {
						return this.optional(element)
								|| /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/
										.test(value);
					}, "请填写正确的IP地址。");

	// 字符验证，只能包含中文、英文、数字、下划线等字符。
	jQuery.validator.addMethod("stringCheck", function(value, element) {
		return this.optional(element)
				|| /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(value);
	}, "只能包含中文、英文、数字、下划线等字符");

	// 字符验证，只能包含中文、英文、数字等字符。
	jQuery.validator.addMethod("inputCheck", function(value, element) {
		return this.optional(element)
				|| /^([a-zA-Z0-9\u4e00-\u9fa5]{1,16})+$/.test(value);
	}, "只能包含中文、英文、数字等字符。");

	// 匹配english
	jQuery.validator.addMethod("isEnglish", function(value, element) {
		return this.optional(element) || /^[A-Za-z]+$/.test(value);
	}, "匹配english");

	// 匹配汉字
	jQuery.validator.addMethod("isChinese", function(value, element) {
		return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);
	}, "匹配汉字");

	// 匹配中文(包括汉字和字符)
	jQuery.validator.addMethod("isChineseChar", function(value, element) {
		return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
	}, "匹配中文(包括汉字和字符) ");

	// 判断是否为合法字符(a-zA-Z0-9-_)
	jQuery.validator.addMethod("isRightfulString", function(value, element) {
		return this.optional(element) || /^[A-Za-z0-9_-]+$/.test(value);
	}, "判断是否为合法字符(a-zA-Z0-9-_)");

	// 判断是否包含中英文特殊字符，除英文"-_"字符外
	jQuery.validator
			.addMethod(
					"isContainsSpecialChar",
					function(value, element) {
						var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
						return this.optional(element) || !reg.test(value);
					}, "含有中英文特殊字符");

	
	function isIdCardNo(value) {
	    var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
	    var varArray = new Array();
	    var intValue;
	    var lngProduct = 0;
	    var intCheckDigit;
	    var intStrLen = value.length;
	    var idNumber = value.toUpperCase();
	    // initialize
	    if ((intStrLen != 18)) {
	        // error = "输入身份证号码长度不对！";
	        // alert(error);
	        // frmAddUser.txtIDCard.focus();
	        return false;
	    }
	    // check and set value
	    for (i = 0; i < intStrLen; i++) {
	        varArray[i] = idNumber.charAt(i);
	        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
	            // error = "错误的身份证号码！";
	            // alert(error);
	            // frmAddUser.txtIDCard.focus();
	            return false;
	        } else if (i < 17) {
	            varArray[i] = varArray[i] * factorArr[i];
	        }
	    }
	    if (intStrLen == 18) {
	       
	        // calculate the sum of the products
	        for (i = 0; i < 17; i++) {
	            lngProduct = lngProduct + varArray[i];
	        }
	        // calculate the check digit
	        intCheckDigit = 12 - lngProduct % 11;
	        switch (intCheckDigit) {
	            case 10:
	                intCheckDigit = 'X';
	                break;
	            case 11:
	                intCheckDigit = 0;
	                break;
	            case 12:
	                intCheckDigit = 1;
	                break;
	        }
	        // check last digit
	        if (varArray[17].toUpperCase() != intCheckDigit) {
	            // error = "身份证效验位错误!...正确为： " + intCheckDigit + ".";
	            // alert(error);
	            return false;
	        }
	    } else {
	        return false;
	    }
	    return true;
	}

	

});

// 车牌号校验
function isPlateNo(plateNo) {
	var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
	if (re.test(plateNo)) {
		return true;
	}
	return false;
}

/*
 * 中国大陆身份证号校验
 */
function identityCardNo(value) {
    var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
    var varArray = new Array();
    var intValue;
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = value.length;
    var idNumber = value.toUpperCase();
    // initialize
    if ((intStrLen != 18)) {
        // error = "输入身份证号码长度不对！";
        // alert(error);
        // frmAddUser.txtIDCard.focus();
        return false;
    }
    // check and set value
    for (i = 0; i < intStrLen; i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
            // error = "错误的身份证号码！";
            // alert(error);
            // frmAddUser.txtIDCard.focus();
            return false;
        } else if (i < 17) {
            varArray[i] = varArray[i] * factorArr[i];
        }
    }
    if (intStrLen == 18) {
        // check date
        var date8 = idNumber.substring(6, 14);
//        if (checkDate(date8) == false) {
//            // error = "身份证中日期信息不正确！.";
//            // alert(error);
//            return false;
//        }
        // calculate the sum of the products
        for (i = 0; i < 17; i++) {
            lngProduct = lngProduct + varArray[i];
        }
        // calculate the check digit
        intCheckDigit = 12 - lngProduct % 11;
        switch (intCheckDigit) {
            case 10:
                intCheckDigit = 'X';
                break;
            case 11:
                intCheckDigit = 0;
                break;
            case 12:
                intCheckDigit = 1;
                break;
        }
        // check last digit
        if (varArray[17].toUpperCase() != intCheckDigit) {
            // error = "身份证效验位错误!...正确为： " + intCheckDigit + ".";
            // alert(error);
            return false;
        }
    } else {
        return false;
    }
    return true;
}