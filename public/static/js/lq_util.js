/**
 * 空值判断
 * 
 * @param value
 * @returns {Boolean}
 */
function isNotNull(value) {
	if (null != value && "null" != value && "" != value && undefined != value
			&& "undefined" != value) {
		return true;
	} else {
		return false;
	}
}

/**
 * 判断值是否为空并返回值
 * 
 * @param value
 * @returns
 */
function isNotNullReturnValue(value) {
	if (null != value && "null" != value && "" != value && undefined != value
			&& "undefined" != value) {
		return value;
	} else {
		return "";
	}
}

/**
 * 获取url中的value根据key
 * 
 * 使用时使用encodeURIComponent(data)编码
 * 
 * @param key
 * @returns
 */
function getUrlParamByKey(key) {
	var paramValue = null;
	if (null != key && undefined != key && "" != key && "null" != key
			&& "undefined" != key && key.length > 0) {
		var param = document.location.search;
		if (null != param && undefined != param && "" != param
				&& "null" != param && "undefined" != param && param.length > 0) {
			param = decodeURIComponent(param);
			param = param.substring(param.indexOf("?", 0) + 1, param.length);
			for (var i = 0; i < param.split("&").length; i++) {
				if (null != String(param.split("&")[i])
						&& undefined != String(param.split("&")[i])
						&& "" != String(param.split("&")[i])
						&& "null" != String(param.split("&")[i])
						&& "undefined" != String(param.split("&")[i])
						&& String(param.split("&")[i]).length > 0
						&& String(param.split("&")[i]).split("=").length > 0) {
					var paramkey = String(param.split("&")[i]).split("=")[0];
					//
					if (null != paramkey && undefined != paramkey
							&& "" != paramkey && "null" != paramkey
							&& "undefined" != paramkey && paramkey.length > 0
							&& paramkey.toUpperCase() == key.toUpperCase()) {
						paramValue = String(param.split("&")[i]).split("=")[1];
						break;
					}
				}
			}
		}
	}

	return paramValue;
}
/**
 * 删除url中的value根据key 使用时使用encodeURIComponent(data)编码
 * 
 * @param key
 * @returns
 */
function funcUrlDel(name) {
	var loca = window.location;
	var baseUrl = loca.origin + loca.pathname + "?";
	var query = loca.search.substr(1);
	if (query.indexOf(name) > -1) {
		var obj = {}
		var arr = query.split("&");
		for (var i = 0; i < arr.length; i++) {
			arr[i] = arr[i].split("=");
			obj[arr[i][0]] = arr[i][1];
		}
		;
		delete obj[name];
		var url = baseUrl
				+ JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g,
						"=").replace(/\,/g, "&");
		return url
	}
	;
}

/**
 * 连接数组.
 */
function concatArray() {
	var array = new Array();
	for (var i = 0; i < arguments.length; i++) {
		var arr = arguments[i];
		if (arr instanceof Array) {
			for ( var j in arr) {
				array.push(arr[j]);
			}
		}
	}
	return array;
}
/**
 * 将原join方法改写为可以连接对象(的属性)的方法
 * 
 * @param joinKey
 *            连接符 如 ","
 * @param array
 *            数组
 * @param attribute
 *            要连接的属性
 */
function joinArray(joinKey, array, attribute) {
	if (!array || array.length == 0 || !attribute || !array[0][attribute]) {
		return "";
	}
	var arr = [];
	for ( var i in array) {
		arr.push(array[i][attribute]);
	}
	return arr.join(joinKey);
}

/**
 * 日期格式化
 * 
 * @param now
 * @param mask
 * @returns
 */
function dateFormat(now, mask) {
	var d = new Date(Date.parse(now));
	var zeroize = function(value, length) {
		if (!length)
			length = 2;
		value = String(value);
		for (var i = 0, zeros = ''; i < (length - value.length); i++) {
			zeros += '0';
		}
		return zeros + value;
	};

	return mask
			.replace(
					/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g,
					function($0) {
						switch ($0) {
						case 'd':
							return d.getDate();
						case 'dd':
							return zeroize(d.getDate());
						case 'ddd':
							return [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri',
									'Sat' ][d.getDay()];
						case 'dddd':
							return [ 'Sunday', 'Monday', 'Tuesday',
									'Wednesday', 'Thursday', 'Friday',
									'Saturday' ][d.getDay()];
						case 'M':
							return d.getMonth() + 1;
						case 'MM':
							return zeroize(d.getMonth() + 1);
						case 'MMM':
							return [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
									'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ][d
									.getMonth()];
						case 'MMMM':
							return [ 'January', 'February', 'March', 'April',
									'May', 'June', 'July', 'August',
									'September', 'October', 'November',
									'December' ][d.getMonth()];
						case 'yy':
							return String(d.getFullYear()).substr(2);
						case 'yyyy':
							return d.getFullYear();
						case 'h':
							return d.getHours() % 12 || 12;
						case 'hh':
							return zeroize(d.getHours() % 12 || 12);
						case 'H':
							return d.getHours();
						case 'HH':
							return zeroize(d.getHours());
						case 'm':
							return d.getMinutes();
						case 'mm':
							return zeroize(d.getMinutes());
						case 's':
							return d.getSeconds();
						case 'ss':
							return zeroize(d.getSeconds());
						case 'l':
							return zeroize(d.getMilliseconds(), 3);
						case 'L':
							var m = d.getMilliseconds();
							if (m > 99)
								m = Math.round(m / 10);
							return zeroize(m);
						case 'tt':
							return d.getHours() < 12 ? 'am' : 'pm';
						case 'TT':
							return d.getHours() < 12 ? 'AM' : 'PM';
						case 'Z':
							return d.toUTCString().match(/[A-Z]+$/);
							// Return quoted strings with the surrounding quotes
							// removed
						default:
							return $0.substr(1, $0.length - 2);
						}
					});
};


