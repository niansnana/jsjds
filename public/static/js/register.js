/**
 * 
 */
REGISTER={};
var index=0;
REGISTER.bindsuccess=null;
REGISTER.init=function(bindsuccess){
	REGISTER.bindsuccess=bindsuccess;
	console.log(typeof bindsuccess);
	$.ajax({
		type:'post',
		url:basePath+'/register/ifregister.do',
		dataType:'json',
		success:function(data){
			if(data.code==200){
				if(typeof REGISTER.bindsuccess=="function"){
					REGISTER.bindsuccess(false);
				}
				
			}else if(data.code==201){
				BINDPHONE.init(bindsuccess);
			}else if(data.code==202){
				$.ajax({
					type:'post',
					 processData :true,
					  data :{
					  url:location.href.split('#').toString()
					  },  
					url:basePath+'/register/showRegister1.do',
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
		}
	})
}

 
 
  
