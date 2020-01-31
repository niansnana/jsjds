/**
 * App H5框架
 * 公共参数设置
 * 时间操作
 */
(function(w, undefined) {
    w.h5=w.h5||{};
    w.h5.time=new function () {
        /**
         * 时区偏移量
         * @type {number}
         */
        var _date = new Date(), _atomicTimezone = (function () {
            var _ = /[GMT|UTC]([+|-])(\d+)/.exec(_date.toString());

            return _[1] + _[2] / 100;
        })(), _timezone = '+8';

        /**
         * 获取时间对象
         * @param timestamp
         * @returns Date
         * @private
         */
        function _d(timestamp) {
            if (timestamp && typeof timestamp == 'number') {
                _date = new Date(timestamp + (_timezone - _atomicTimezone) * 3600000);
            } else {
                _date = new Date();
                if (_atomicTimezone != _timezone) {
                    _date.setTime(_date.getTime() + (_timezone - _atomicTimezone) * 3600000)
                }
            }
            return _date;
        }

        /**
         * 获取以毫秒为单位的时间戳
         * @param timestamp
         * @returns {Number}
         * @private
         */
        function _getTimestamp(timestamp) {
            if(!timestamp) {
                return new Date().getTime();
            }
            var timestamp2 = parseInt(timestamp);
            switch (timestamp2.toString().length) {
                case 10:
                    //将timestamp转换为毫秒
                    timestamp2 = timestamp2 * 1000;
                    break;
                case 13:
                case 12:
                    break;
                default :
                   timestamp2 = new Date(timestamp.replace(/-/g,"/")).getTime();
                    break;
            }
            return timestamp2;
        }

        /**
         * 将数字补充到两位数
         * @param number
         * @returns {string}
         * @private
         */
        function _numberPad2(number) {
            return number < 10 ? '0' + number : number;
        }

        /**
         * 设置时区
         * offset 时区偏移值，如:+8,+9
         */
        this.setTimeZone = function (offset) {
            _timezone = offset;
            return this;
        };
        /**
         * 获取时区设置
         * @returns {string}
         */
        this.getTimeZone = function () {
            return _timezone;
        };
        /**
         * 设置当前对象时间
         * @param timestamp
         * @returns {exports}
         */
        this.setTime = function (timestamp) {
            _d(_getTimestamp(timestamp));
            return this;
        };
        /**
         * 和PHP time一样获取unix时间戳，精确到秒
         * @returns {number}
         */
        this.time = function () {
            var d = new Date();
            return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()) / 1000;
        };
        /**
         * 和PHP microtime一样获取unix时间戳，精确到毫秒
         * @returns {number}
         */
        this.microtime = function () {
            var d = new Date();
            return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
        };
        /**
         * 格式化unix时间戳，支持秒或毫秒的时间戳
         * @param format 格式(支持：Y年月d日 H时i分s秒)
         * @param timestamp 时间戳
         * @returns {string}
         */
        this.date = function (format, timestamp) {
            if (!format) {
                format = 'Y-m-d H:i:s';
            }
            var d = _d(_getTimestamp(timestamp));
            return format.replace(/Y/g,function () {
                //替换格式中的年分
                return d.getFullYear();
            }).replace(/m/g,function () {
                //替换格式中的月分
                return _numberPad2(d.getMonth() + 1);
            }).replace(/d/g,function () {
                //替换格式中的日期值
                return _numberPad2(d.getDate());
            }).replace(/H/g,function () {
                //替换格式中的时
                return _numberPad2(d.getHours());
            }).replace(/i/g,function () {
                //替换格式中的分
                return _numberPad2(d.getMinutes());
            }).replace(/s/g,function () {
                //替换格式中的秒
                return _numberPad2(d.getSeconds());
            }).replace(/c/g, function () {
                //替换格式中的c,ISO 8601 格式的日期
                function pad(n) {
                    return n < 10 ? '0' + n : n
                }

                return d.getUTCFullYear() + '-'
                    + pad(d.getUTCMonth() + 1) + '-'
                    + pad(d.getUTCDate()) + 'T'
                    + pad(d.getUTCHours()) + ':'
                    + pad(d.getUTCMinutes()) + ':'
                    + pad(d.getUTCSeconds()) + 'Z'
            });
        };
        /**
         * 为时间增加天数(如果减则填负数)
         */
        this.addDay=function(d,n,format){
        	var dx= new Date(d.getTime()+n*24*60*60*1000);
        	if(format){
        		return this.date(format,dx.getTime());
        	}
        	return dx;
        }
                
    };
})(window);