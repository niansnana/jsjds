var MypageHome={};
MypageHome.layer=function(content,skin){
	
	layer.open({
	    content: content
	    ,skin:skin
	    ,time: 5 //2秒后自动关闭
	  });
}

MypageHome.loadUser=function(){
	$.ajax({
		type:'post',
		url:basePath+'/mypage/getloginuser.do',
		dataType:'json',
		success:function(data){
			if(data.code ==200)
				{
				$("#pweixincode").html("手机号：" + data.user.phone);
				if(data.user.faceurl != "")
					$("#faceimg").attr("src",data.user.faceurl);
				
				}
		}
	})
	
};