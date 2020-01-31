
	//正则
	var reg = {
		"email":/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([(a-zA-Z)|(\.)]{2,20})$/,
		"phone":/^1[23456789]\d{9}$/,
		'len6':/^\d{6}$/
	}
	var Base={};
	//全局服务器错误显示
	Base.serverError=function(str){
		layer.msg(str, {
		  offset: 't',
			skin: 'error-class',
			time:'1000',
		  anim: 6
		});
	}
	Base.timmer='';
	
	//全局服务器成功显示
	Base.sucTip=function(str){
		layer.msg(str, {
		  offset: 't',
		  skin: 'suc-class',
		  anim: 6
		});
	}
	//清除密码登录错误信息
	$('.form-item input').on('focus', function() {
		Base.formErrorHide($(this));
	})
	/*
	 *全局表单报错信息提示 
	 * 
	 */
	
	//验证用户名密码	
	Base.validateUser = function(user) {
		return reg.email.test(user) || reg.phone.test(user)
	}
	//表单错误信息
	Base.formError = function(el, str) {
		$(el).addClass('input-error');
		$(el).parents('.form-item').find('.error').html(str).show();
	}

	//表单错误信息隐藏
	Base.formErrorHide = function(_this) {
		_this.removeClass('input-error');
		_this.parents('.form-item').find('.error').html('');
	}

	Base.baseGetCode=function(param,el){
		
			$.ajax({
				type: "POST",
				xhrFields: {
					withCredentials: true
				},
				data: param,
				dataType: 'json',
				url: Const.baseURL + "/api/comp/sendcode"
			}).done(function(data) {
	
				if(data.code == 200) {
					Base._auto(60,el);
				} else {
					el.prop('disabled', false).html('获取验证码');
					Base.serverError(data.msg);
	
				}
			}).fail(function() {
				Base.serverError('请求失败');
				el.prop('disabled', false).html('获取验证码');
	
			})
		}
		
		

	Base._auto=function(interval,el) {
			el.addClass('disabled').html('重发( ' + interval + '秒)');
			el.prop('disabled', true);

			Base.timmer = setTimeout(function() {
				if(interval > 0) {
					interval--;
					el.html('重发(' + interval + '秒)');
					Base.timmer = setTimeout(arguments.callee, 1000);
				} else {
					clearTimeout(Base.timmer);
					el.removeClass('disabled').html('获取验证码');
					el.prop('disabled', false);
				}
			}, 1000)
		}