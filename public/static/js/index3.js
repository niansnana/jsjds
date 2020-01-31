// var myindex;

! function(window, $) {
	var Account = function() {
	}
	Account.isValidate = false;
	Account.time = '';
	Account.lqtoken = $.cookie('lqtoken');
	//Account.lqtoken = 'FA80153C38C0265B4DBAAAABC54F7485';
	//初始化
	Account.init = function() {
		
		if(Account.lqtoken){
			this.bindEvent();
			this.info();
			this.initImageCode();
			this.initDrag();
		}else{
			Base.serverError('请您登录')
			return false
		}
	}
	//事件绑定
	Account.bindEvent = function() {
			//cropper图片裁剪
			$('#tailoringImg').cropper({
				aspectRatio: 1 / 1,
				preview: '.previewImg', //预览视图
				guides: false, //裁剪框的虚线(九宫格)
				autoCropArea: 0.8, //0-1之间的数值，定义自动剪裁区域的大小，默认0.8
				movable: false, //是否允许移动图片
				dragCrop: true, //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
				movable: true, //是否允许移动剪裁框
				resizable: true, //是否允许改变裁剪框的大小
				zoomable: false, //是否允许缩放图片大小
				mouseWheelZoom: false, //是否允许通过鼠标滚轮来缩放图片
				touchDragZoom: true, //是否允许通过触摸移动来缩放图片
				rotatable: false, //是否允许旋转图片
				crop: function(e) {
					console.log(e);
				}
			});
			//关闭弹出框
			$( '.close-btn' ).on('click',function(){
				layer.closeAll()
			})
			//时间触发
			$('#chooseImg').change(function() {
				Account.selectImg(this)
			})
			//裁剪后的处理
			$("#sureCut").on("click", Account.uploadHead);
			//绑定元素
			$('#menuTab li').on('click', Account.typeTabEvt);
			//修改头像
			$('#avatar').on('click', function(){
				Account.showPop('编辑头像',['536px', '480px'],$('#alterPhoto'));
				
			})
			//绑定手机获取验证码
			$('#bindGetCode').on('click', Account.getPhoneCode);
			//绑定邮箱获取验证码
			$('#bindGetEmailCode').on('click', Account.getEmailCode);
			//修改昵称弹框
			$('#nickNameUpBtn').on('click',function(){
				Account.showPop('修改昵称',['398px', '252px'],$('#amendName'))
			});
			//提交昵称信息
			$('#nickNameUp').on('click', Account.nickNameUp);
			//修改密码弹框
			$('#alterPaw').on('click',function(){
				 Account.showPop('修改密码',['399px','363px'], $('#password'))
			});
			//提交修改后密码信息
			$('#passWordUp').on('click', Account.passWordUp);
			//绑定手机号码
			$('#bindPhoneBtn').on('click', function() {
				Account.initDrag();
				Account.showPop('绑定手机号',['399px', '383px'],$('#boundPhone'))
			});
			//修改手机号
			$('#alterPhone').on('click', function() {
				Account.initDrag();
				Account.showPop('修改手机号',['399px', '383px'],$('#boundPhone'))
			});
			//提交手机号信息
			$('#phoneUp').on('click', Account.phoneUp);
			//绑定邮箱
			$('#noMail').on('click', function() {
				Account.initDrag();
				Account.showPop('绑定邮箱',['399px', '383px'],$('#boundEmail'))
				
			});
			//修改邮箱
			$('#alteremail').on('click', function() {
				Account.initDrag();
				Account.showPop('修改邮箱',['399px', '383px'],$('#boundEmail'))
			});
			//提交邮箱信息
			$('#emailUp').on('click', Account.emailUp);
			//解绑手机号码
			$('#unPhoneBtn').on('click',function(){
				
				Account.showPop('',['371px', '237px'],$('#unbundlePhone'))
				
			});
			//解绑手机确认
			$('#unbundlePhoneUp').on('click', Account.unbundlePhoneUp)
			//解绑邮箱
			$('#mailBox').on('click', function(){
				Account.showPop('',['371px', '237px'],$('#unbundleEmail'))
			});
			//解绑邮箱确认
			$('#unbundleEmailUp').on('click', Account.unbundleEmailUp)
			//更换微信
			$('#alertwx').on('click',function(){
				Account.showPop('',['371px', '294px'],$('#boundWX'),Account.getQrCode('bind'))
			});
			$( '.shade .refresh' ).on('click',function(){
				Account.getQrCode('bind')
			})
			//隐藏验证码
			$(document).click(function() {
				$(".drag1").hide();
			});
			$('.btn1').on('click', function(event) {
				$(this).parents('.form-item').find('.error').html('');
				$('.drag1').toggle();
				event.stopPropagation();
			})
			$('.drag1').click(function(event) {
				event.stopPropagation();
			});
	};	
	//初始化数据
	Account.info = function() {
		var index=layer.load(1, {
		  shade: [0.1,'#000'] //0.1透明度的白色背景
		});
		$.ajax({
			url: Const.baseURL + 'api/account/userinfo',
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			data: {
				lqtoken: Account.lqtoken
			},
			success: function(res) {
				if(res.code == 200) {
					localStorage.setItem("usertype", res.usertype);
					$( '.amend' ).show();
					layer.close(index);
					var user = res.user
					$('#userPhoto').attr('src', user.faceUrl)
					$('#nickName').text(user.nickName);
					if(user.userPhone == null) {
						$('#mobileNum').html('');
						$('#showPhone a').show();
						$('#bindPhoneBtn').show();
						$('#unPhoneBtn').hide();
						$('#alterPhone').hide();

					} else {
						$('#mobileNum').html(user.userPhone);
						$('#showPhone a').hide();
						$('#bindPhoneBtn').hide();
						$('#unPhoneBtn').show();
						$('#alterPhone').show();
					}

					if(user.userEmail == null) {
						$('#showEmail a').show();
						$('#mailBox').hide();
						$('#noMail').show();
						$('#mailBox').hide;
						$('#alteremail').hide();
						$('#emailNum').html('');

					} else {
						$('#emailNum').html(user.userEmail);
						$('#showEmail a').hide();
						$('#noMail').hide();
						$('#mailBox').show();
						$('#alteremail').show();
					}
					if(res.usertype == 0) {
						$('.showWx').show();
						$( '#unPhoneBtn' ).hide();
						$( '#forgetPassword' ).attr('href','./foundPwd')
					} else {
						$('.showWx').hide();
						$( '#forgetPassword' ).attr('href','./corpfoundPwd')
					}
				}else if(res.code == 1000){
					Account.toLogin();
						
				} else {
					layer.close(index);
					Base.serverError(res.msg)
				}
			},
			error: function(err) {
				layer.close(index);
				Base.serverError(res.msg)
			}
		});

	};
	//上传头像
	Account.uploadHead = function() {
		
		var $this=$(this);
		
		if($("#tailoringImg").attr("src") == null) {
			Base.serverError('请选择上传的图片！')
			return false;
		} else {
			var cas = $('#tailoringImg').cropper('getCroppedCanvas'); //获取被裁剪后的canvas
			var base64url = cas.toDataURL('image/png'); //转换为base64地址形式
			var files = base64url.split(',')[1];
		}
		$this.prop('disabled',true);
		$.ajax({
			url: Const.baseURL + 'api/account/uploadhead',
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			data: {
				lqtoken: Account.lqtoken,
				file: files,
				fileext: 'png'
			},
			success: function(res) {

				if(res.code == 200) {
					Base.sucTip('修改成功')
					Account.info();
					layer.closeAll('page');
					$this.prop('disabled',false);
					

				} else if(res.code == 1000){
					Account.toLogin();
						
				}else {
					Base.serverError(res.msg)
					$this.prop('disabled',false);
					
				}
			},
			error: function(err) {
				Base.serverError(res.msg)
				$this.prop('disabled',false);
				
			}
		});

	};

	//tab导航菜单 切换
	Account.typeTabEvt = function() {
		var index = $(this).index();
		$(this).addClass('choose').siblings().removeClass('choose');
	};

	//提交昵称信息
	Account.nickNameUp = function() {
		var nickname = $('#upNickName').val();
		var $this=$(this);
		if(nickname == '') {
			Base.formError('#upNickName', '昵称不能为空！')
			return false;
		}
		if(Account.getLength(nickname) > 16) {
			Base.formError('#upNickName', '昵称不能超过8位！')
			return false;
		}
		$this.prop('disabled',true);
		$.ajax({
			url: Const.baseURL + 'api/account/updatenickname',
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			data: {
				lqtoken: Account.lqtoken,
				nickname: nickname
			},
			success: function(res) {

				if(res.code == 200) {
					layer.msg('修改成功', {
						offset: 't',
						anim: 5,
						time: 1000
					});
					$this.prop('disabled',false);
					Account.info();
					layer.closeAll('page');
				}else if(res.code == 1000){
					Account.toLogin();
						
				} else {
					Base.serverError(res.msg)
					$this.prop('disabled',false);
					
				}
			},
			error: function(err) {
				Base.serverError(res.msg)
				$this.prop('disabled',false);
				
			}
		});

	};
	//提交修改后的密码
	Account.passWordUp = function() {
		var oldPaw = $('#oldPaw').val(),
			newPaw = $('#newPaw').val(),
			newPaw2 = $('#newPaw2').val(),
			$this=$(this);
		if(oldPaw == '') {
			Base.formError('#oldPaw', '请输入当前密码！')
			return false;
		}
		if(newPaw == '') {
			Base.formError('#newPaw', '请输入新密码！')
			return false;
		}
		if(newPaw.length<6) {
			Base.formError('#newPaw', '密码不能小于6位！');
			return false;
		}
		if(newPaw2 == '') {
			Base.formError('#newPaw2', '请输入确认新密码！')
			return false;
		}
		if(newPaw2 != newPaw) {
			Base.formError('#newPaw2', '两次密码输入不一致！')
			return false;
		}
		$this.prop('disabled',true);
		
		$.ajax({
			url: Const.baseURL + 'api/account/updatepwd',
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			data: {
				lqtoken: Account.lqtoken,
				oldpwd: oldPaw,
				newpwd: newPaw
			},
			success: function(res) {
				if(res.code == 200) {
					Base.sucTip('修改成功')
					Account.info();
					layer.closeAll('page');
					$this.prop('disabled',false);
					
				}else if(res.code == 1000){
					Account.toLogin();
						
				} else {
					Base.serverError(res.msg);
					$this.prop('disabled',false);
				}
			},
			error: function(err) {
				Base.serverError(res.msg);
				$this.prop('disabled',false);
			}
		});
	};
	//绑定手机号码
	Account.phoneUp = function() {
		var phone = $('#bindPhone').val(),
			code = $('#bindPhoneCode').val(),
			$this=$(this);
				
		if(phone == '') {
			Base.formError('#bindPhone', '请输入手机号！')
			return false;
		}
		if(!reg.phone.test(phone)) {
			Base.formError('#bindPhone', '手机号格式不正确！')
			return false;
		}
		if(!reg.phone.test(phone)) {
			Base.formError('#bindPhone', '手机号格式不正确！')
			return false;
		}
		if(!Account.isValidate) {
			Base.formError('.drag-big', '请完成验证！');
			return false;
		}
		if(code == '') {
			Base.formError('#bindPhoneCode', '验证码不能为空！');
			return false;
		}
		if(!reg.len6.test(code)) {
			Base.formError('#bindPhoneCode', '验证码输入有误！');
			return false;
		}
		$this.prop('disabled', true);
		$.ajax({
			url: Const.baseURL + 'api/account/bindphone',
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			data: {
				lqtoken: Account.lqtoken,
				phone: phone,
				userinputcode: code
			},
			success: function(res) {

				if(res.code == 200) {
					Base.sucTip('绑定成功')
					Account.info();
					layer.closeAll('page');
					$this.prop('disabled', false);
				}else if(res.code == 1000){
					Account.toLogin();
						
				} else {
					Base.serverError(res.msg)
					$this.prop('disabled', false);
					
				}
			},
			error: function(err) {
				Base.serverError(res.msg)
				$this.prop('disabled', false);

			}
		});
	}
	//获取短信验证码
	Account.getPhoneCode = function() {
		var userName = $('#bindPhone').val(),
			$this = $(this);
		if(userName == '') {
			Base.formError('#bindPhone', '请输入手机号！')
			return false;
		}
		if(!reg.phone.test(userName)) {
			Base.formError('#bindPhone', '手机号格式不正确！')
			return false;
		}
		if(!Account.isValidate) {
			Base.formError('.drag-big', '请完成验证！');
			return false;
		}
		$this.prop('disabled', true).html('发送中');
		var param ={
			loginname: userName,
			codetype: 3
		}
		Base.baseGetCode(param,$this);
	}
	//获取绑定短信验证码
	Account.getEmailCode = function() {
		var userName = $('#bindEmail').val(),
			interval = 60,
			$this = $(this);
		if(userName == '') {
			Base.formError('#bindEmail', '请输入邮箱！')
			return false;
		}
		if(!reg.email.test(userName)) {
			Base.formError('#bindEmail', '邮箱格式不正确！')
			return false;
		}
		if(!Account.isValidate) {
			Base.formError('.drag-big', '请完成验证！');
			return false;
		}
		$this.prop('disabled', true).html('发送中');
		var param ={
			loginname: userName,
			codetype: 3
		}
		Base.baseGetCode(param,$this);
	}
	//提交绑定信息
	Account.emailUp = function() {
		var email = $('#bindEmail').val(),
			code = $('#bindEmailCode').val(),
			$this=$(this);

		if(email == '') {
			Base.formError('#bindEmail', '请输入邮箱！')
			return false;
		}
		if(!reg.email.test(email)) {
			Base.formError('#bindEmail', '邮箱格式不正确！')
			return false;
		}
		if(!Account.isValidate) {
			Base.formError('.drag-big', '请完成验证！');
			return false;
		}

		if(code == '') {
			Base.formError('#bindEmailCode', '验证码不能为空！');
			return false;
		}

		if(!reg.len6.test(code)) {
			Base.formError('#bindEmailCode', '验证码输入有误！');
			return false;
		}

		$this.prop('disabled',true);
		$.ajax({
			url: Const.baseURL + 'api/account/bindemail',
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			data: {
				lqtoken: Account.lqtoken,
				email: email,
				userinputcode: code
			},
			success: function(res) {
				$this.prop('disabled',false);
				if(res.code == 200) {
					Base.sucTip('绑定成功')
					Account.info();
					layer.closeAll('page');
					
				}else if(res.code == 1000){
					Account.toLogin();
						
				} else {
					Base.serverError(res.msg)
				}
			},
			error: function(err) {
				Base.serverError(res.msg);
				$this.prop('disabled',false);
			}
		});

	}
	//确认解绑手机号
	Account.unbundlePhoneUp = function() {
		var $this=$(this);
		$this.prop('disabled',true);
		$.ajax({
			url: Const.baseURL + 'api/account/unbindphone',
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			data: {
				lqtoken: Account.lqtoken
			},
			success: function(res) {
				if(res.code == 200) {
					Base.sucTip('修改成功')
					Account.info();
					layer.closeAll('page');
					$this.prop('disabled',false);
					
				}else if(res.code == 1000){
					Account.toLogin();
						
				} else {
					Base.serverError(res.msg)
					$this.prop('disabled',false);
					
				}
			},
			error: function(err) {
				Base.serverError(res.msg)
				$this.prop('disabled',false);
				
			}
		});
	}
	// 确认解绑邮箱
	Account.unbundleEmailUp = function() {
		var $this=$(this);
		$this.prop('disabled',true)
		$.ajax({
			url: Const.baseURL + 'api/account/unbindemail',
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			data: {
				lqtoken: Account.lqtoken
			},
			success: function(res) {
				if(res.code == 200) {
					Base.sucTip('修改成功')
					Account.info();
					layer.closeAll('page');
					$this.prop('disabled',false)
				}else if(res.code == 1000){
					Account.toLogin();
						
				} else {
					Base.serverError(res.msg)
					$this.prop('disabled',false)
					
				}
			},
			error: function(err) {
				Base.serverError(res.msg)
				$this.prop('disabled',false)
			}
		});

	}

	//获取验证码图片
	Account.initImageCode = function() {
		$.ajax({
			url: Const.baseURL + 'api/imagecode',
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			data: {},
			success: function(res) {

				if(res.code == 200) {

					$('.drag-big .drag-img-big img').attr('src', res.data.bkimage);
					$('.drag-big .drag-img-small img').attr('src', res.data.dragimage);
				}else if(res.code == 1000){
					Account.toLogin();
						
				} else {
					Base.serverError(res.msg)
				}
			},
			error: function(err) {
				Base.serverError(res.msg)
			}
		});
	}
	//初始化验证码
	Account.initDrag = function() {
		Account.isValidate = false;
		$('.drag-tag-info').show();
		$('.drag-tag-suc').hide();
		var dragImg = new DragImg('.dragTag', {
			getLeft: function(left) {
				$.ajax({
					url: Const.baseURL + 'api/imagecodecheck',
					xhrFields: {
						withCredentials: true
					},
					type: 'POST',
					dataType: 'json',
					data: {
						x: left
					},
					success: function(res) {
						if(res.code == 200) {
							//成功方法
							Account.isValidate = true;
							$('.drag-big .drag-tag-info').hide();
							$('.drag-big .drag-tag-suc').show();
							$('.drag-pop').hide();
						} else {
							//失败
							Login.initImageCode();
							dragImg.toLeft();
							$('.drag-pop').addClass('shake animated');
							setTimeout(function() {
								$('.drag-pop').removeClass('shake animated');
							}, 300)
						}
					},
					error: function(err) {
						Base.serverError(res.msg)
					}
				});
			}
		})
		dragImg.init();
		dragImg.toLeft();
	}
	//图片上传js
	Account.selectImg = function(file) {
		
		var fileLast=file.value.split('.')[1];
		
		var imgFormat=['jpg','gif','bmp','jpeg','png']
		
		if(imgFormat.indexOf(fileLast)<0){
			$('#chooseImg').val('');
			Base.serverError('图片格式有误！');
			return;
		}
		
		if(!file.files || !file.files[0]) {
			return;
		}
		var size=file.files[0].size/1024/1024
		
		if(size>5){
			$('#chooseImg').val('');
			Base.serverError('图片不能超过5M');
			return;
		}
		var reader = new FileReader();
		reader.onload = function(evt) {

			var replaceSrc = evt.target.result;

			$('#tailoringImg').cropper('replace', replaceSrc, false);
		}
		reader.readAsDataURL(file.files[0]);
	}

	//公共获取二维码
	Account.getQrCode = function(type) {
		//重置样式
		$('.shade').hide();
		$('.code-confirm').hide();
		$('#codeImg').attr('src', '');
		window.clearInterval(Account.time);
		$.ajax({
			url: Const.baseURL + 'api/outer/code.do',
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			data: {
				appid: 'xiaozhao',
				action: type
			},
			success: function(res) {
				if(res.code == 200) {
					$('#codeImg').attr('src', res.picurl);
					Account.ticket = res.ticket
					Account.validateQrCode();
				}else if(res.code == 1000){
					Account.toLogin();
						
				} else {
					Base.serverError(res.msg);
				}
			},
			error: function(err) {
				Base.serverError('网络错误！');
			}
		});
	}
	//查看扫码状态
	Account.validateQrCode = function() {
		Account.time = window.setInterval(function() {
			$.ajax({
				url: Const.baseURL + 'api/outer/checkcode.do',
				type: 'POST',
				xhrFields: {
					withCredentials: true
				},
				dataType: 'json',
				data: {
					ticket: Account.ticket
				},
				success: function(res) {
					if(res.code == 200) {
						Account.changeWx();
						window.clearInterval(Account.time);

					} else if(res.code == 203) {

						window.clearInterval(Account.time);

						Base.serverError(res.msg);

					} else if(res.code == 202) {

						$(".code-confirm").show();

					} else if(res.code == 201) {

						window.clearInterval(Account.time);
						$(".code-confirm").hide();
						$('.shade').show();
					} else if(res.code == 0) {

					} else {
						Base.serverError(res.msg);
						window.clearInterval(Account.time);
					}
				},
				error: function(err) {
					Base.serverError('网络错误！');
				}
			});
		}, 1000);
	}
	//修改微信
	Account.changeWx = function() {
		$.ajax({
			url: Const.baseURL + 'api/account/bindwx',
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			data: {
				lqtoken: Account.lqtoken,
				ticket: Account.ticket
			},
			success: function(res) {
				if(res.code == 200) {
					Base.sucTip('更换成功')
					Account.info();
					layer.closeAll('page');

				}else if(res.code == 1000){
					Account.toLogin();
						
				} else {
					Base.serverError(res.msg);
					Account.getQrCode('bind');
				}
			},
			error: function(err) {
				Base.serverError('网络错误！');
			}
		});

	}
	//全局弹框
	Account.showPop = function(title,area,content,sucFn) {
		var skin=""
		if(title==''){
			title=false;
		}
		if(title=="编辑头像"){
			skin='headPop'
			
		}
		layer.open({
			type: 1,
			title: title,
			area: area,
			skin: skin,
			content:content, //这里content是一个DOM
			success: function(layero, index) {
				sucFn
			},
			end:function(){
				$( '.form-item input' ).val('').removeClass('input-error');
				$( '.form-item .error' ).html('');
				//关闭弹出框清楚定时器
				if(Account.time){
					window.clearInterval(Account.time);
				}
				if(Base.timmer){
					window.clearInterval(Base.timmer);
					
				}
				$( '.verification-code' ).prop('disabled',false).html('获取验证码').removeClass('disabled');
			}
		});
	};
	
	//登录过期跳转
	Account.toLogin=function(){
		var usertype=localStorage.getItem("usertype");
		layer.msg('登陆超时', {
			offset: 't',
			skin: 'error-class',
			anim: 5,
			time: 2000
			}, function(){
				if(usertype){
					if(usertype==0){
						window.location.href='./login';
					}else{
						window.location.href='./corpLogin';
					}
				};
			}
		);
		
	}
	//获取字节
	Account.getLength=function (val) {  
        var str = new String(val);  
        var bytesCount = 0;  
        for (var i = 0 ,n = str.length; i < n; i++) {  
            var c = str.charCodeAt(i);  
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {  
                bytesCount += 1;  
            } else {  
                bytesCount += 2;  
            }  
        }  
        return bytesCount;  
    } 
	
	Account.init();

}(window, jQuery)