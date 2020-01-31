/**
 * 
 */
BINDPHONE={};
var index=0;
BINDPHONE.bindsuccess = null;
BINDPHONE.init=function(bindsuccess){
	
	BINDPHONE.bindsuccess=bindsuccess;
	
		$.ajax({
			type:'post',
			url:basePath+'/weixin/showImageAndNickname.do',
			dataType:'html',
			success:function(data){
				index=layer.open({
				    content: data				   
				    ,type:1
				    ,shade:true
				    ,shadeClose:false,
				    style:"position:absolute;top:0;left:0;width:100%;height:100%;overflow-y:auto;-webkit-animation-duration: .5s; animation-duration: .5s;"
				  });
				  var u = navigator.userAgent;
			        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
			            $(".form input").on('focus',function(){			            	
			            	var _this = this;
			            	var h = _this.getBoundingClientRect().top;
			            	$(window).scrollTop(h);
			            })
			            $(".form input").on('blur',function(){			            	
			            	$(window).scrollTop(0);
			            })

			        }
			}
			
		})
	
}


BINDPHONE.layer=function(content,skin){
	
	layer.open({
	    content: content
	    ,skin:skin
	    ,time: 2 //2秒后自动关闭
	  });
}
//BINDPHONE.valideteWeinAccount=function(){
//	var boo=true;
//	var weixinAccount=$("#username").val()
//	$.ajax({
//		type:'post',
//		url:basePath+'/weixin/validatePhoneAndAccount.do',
//		data:'weixinAccount='+weixinAccount,
//		dataType:'json',
//		success:function(data){
//			console.info(data.code+"    微信账号");
//			if(data.code==202){
//				boo=false;
//				BINDPHONE.layer("您的微信账号已经注册","msg");
//				return boo;
//			}	
//		}
//	})
//}

//绑定手机
BINDPHONE.click=function(){
	//var weixinAccount=$("#username").val()
	var phone=$("#phone").val();
	var phone2=$("#phone2").val();
	var imgCode=$("#imgCode").val();
	var yzmCode=$("#yzmCode").val();
	var flag=true;
	
/*	//验证微信账号
	if(weixinAccount.length==0){
		flag=false;
		BINDPHONE.layer("请输入您的微信号或QQ","msg");
		return flag;
	}else{
		//微信账号是否已经注册
		$.ajax({
			type:'post',
			async:false,
			url:basePath+'/weixin/validatePhoneAndAccount.do',
			data:'weixinAccount='+weixinAccount,
			dataType:'json',
			success:function(data){
				console.info(data.code+"    微信账号");
				if(data.code==202){
					flag=false;
					BINDPHONE.layer("您的微信号或QQ号已经注册","msg");
				}	
			}
		})
		console.info(flag);
		if(!flag){
			return flag;
		}
		
	}*/
	console.info(1234);
	//验证手机号
	if(phone.length==0){
		flag=false;
		BINDPHONE.layer("手机号不能为空，请输入手机号","msg");
		return flag;
	}else if(!(/^1\d{10}$/.test(phone))){
		flag=false;
		BINDPHONE.layer("请输入11位正确手机号","msg");
		return flag;
	}
	
	if(imgCode.length==0||yzmCode.length==0){
		flag=false;
		BINDPHONE.layer("验证码不能为空","msg");
		return flag;
	}
	 if(!(phone==phone2)){
		flag=false;
		BINDPHONE.layer("没有获取验证码","msg");
		return flag;
	}else{
		//手机号是否已经注册
		$.ajax({
			type:'post',
			url:basePath+'/weixin/validatePhoneAndAccount.do',
			data:'phone='+phone,
			dataType:'json',
			success:function(data){
				if(data.code==202){
					flag=false;
					BINDPHONE.layer("您的手机号已经注册","msg");
				}
			}
		})
		if(!flag){
			return flag;
		}
	}
	if(imgCode.length==0||yzmCode.length==0){
		flag=false;
		BINDPHONE.layer("验证码不能为空","msg");
		return flag;
	}
	if(flag){
		$.ajax({
			type:'post',
			url:basePath+'/weixin/bindPhoneAndWeixinAccount.do',
			data:$("#bindForm").serialize(),
			dataType:'json',
			success:function(data){
				if(data.code==210){
					BINDPHONE.layer("您输入的图片验证码有误","msg");
				}else if(data.code==212){
					BINDPHONE.layer("您输入的手机验证码有误","msg");
					$("#imgCode").val("");
					BINDPHONE.getImgCode();
				}else if(data.code==202){
					//BINDPHONE.layer("绑定失败请重新更换微信或者QQ绑定","msg");
				}else if(data.code==200){
					BINDPHONE.layer("绑定成功","msg");
					//
					layer.close(index);
					if(typeof BINDPHONE.bindsuccess=="function"){
					BINDPHONE.bindsuccess(true);
					}
					
				}
			}
		})
	}
	
}

var countdown=60;
//短信验证码
BINDPHONE.sendCode=function(val){
	var phone=$("#phone").val();
	var imgCode=$("#imgCode").val();
	var flag=true;
	if(imgCode.length==0){
		flag=false;
		BINDPHONE.layer("请输入图片验证码","msg");
		return flag;
	}
	if(phone.length==0){
		flag=false;
		BINDPHONE.layer("手机号不能为空，请输入手机号","msg");
		return flag;
	}
	if(flag){
		$("#phone2").val(phone);
		$.ajax({
			type:'post',
			url:basePath+'/weixin/sendSmsVerificationCode.do',
			data:'tel='+phone+'&vcode='+imgCode,
			dataType:'json',
			success:function(data){
				if(data.code==210){
					BINDPHONE.layer("图片验证码错误，请重新输入","msg");
					$("#imgCode").val("");
					BINDPHONE.getImgCode();
				}else if(data.code==200){
					$("#getMessageCode").attr("disabled",true);
					$("#getMessageCode").css("color","##b3b9c7");
					var interval = setInterval(function(){
						
						if(countdown<=0){
							$("#getMessageCode").attr("disabled",false);
						$("#getMessageCode").css("color","#e96f63");
						countdown=60;
						clearInterval(interval);
						}else{
							countdown--;
						}
						}, 1000);
					}else if(data.code==202){
						BINDPHONE.layer("时间间隔太短，请稍后重新获取","msg");
					}else if(data.code==201){
						BINDPHONE.layer("系统异常，请稍后再试","msg");
					}
			}
		})
	}
}



//图片验证码刷新
BINDPHONE.getImgCode=function(){
			$("#flushImgCode").attr("src",basePath+'/weixin/validateCode/bindMobile.do?random='+Math.random())
}




