/**
 * Created by Acci on 2017/9/6.
 */
$(function(){
    //导航
	setTimeout(function(){
	    $.ajax({
	        url:'/api/action/account/current/user?'+new Date().getTime(),
	        type:"POST",
	        success:function(res){
	            if(res.resultCode===0) {//成功.
	            	var u=res.resultData;
	            	//if(!window.currentUser){
	            		window.currentUser=u;
	            	//}
	                $("#login_logined [identityId]").not("[identityId="+window.currentUser.identityId+"]").remove();
	        $("#login_logined [identityId] [authStatus]").not("[authStatus="+window.currentUser.authStatus+"]").remove();
	        $("#login_normal").remove();
	        $("#login_logined").show();
	        var headImg=window.currentUser.accountPortrait?("/api/action/oss/getImageStream/"+window.currentUser.accountPortrait):($STATIC_URL+"/account/images/default_head_img/"+window.currentUser.identityId+"/"+window.currentUser.accountId%6+".png");
	        if(window.currentUser.accountPortrait && window.currentUser.accountPortrait.indexOf("http")>-1){
	        	headImg=window.currentUser.accountPortrait;
	        }
	        $("#login_logined .head img").attr("src",headImg);
	        $("#login_logined .head  p").text(window.currentUser.identityId==1?window.currentUser.accountNickname:window.currentUser.univName);
	        
	        $.post(
	                "/api/message/findMaxMsgInfo"           
	            ).success(function(res){
	               if(res.succeed){
	            	   $("#newsNum").html(res.data.msgcount>99?99:res.data.msgcount);
	            	   if(res.data.msgcount==0){
	            		   $("#newsNum").hide();
	            	   }else{
	            		   $("#newsNum").show();
	            	   }
	            	   if(res.data.hasNew){
	            		   showNewsMsg();        
	            	   }
	               }
	               
	            });
	        $("#newsHead").show();
	            }else{ //未登录
	                $("#login_logined").remove();
	                $("#login_normal").show();
	                $("#newsHead").hide();
	                if(!window.$SHOW_LOGINDIALOG_NOT) {
	            		location.href="/pages/dasai/index.html";
	                    //$("#btnShowLoginDialog").trigger("click");
	                }
	            }
	        }
	    });
	},1000);
	
    
    //退出
    $("#login_logined .quit").click(function(){
        $.yehDialog({
            dialogWidth:445,
            title:"信息",
            content:'<p style="padding:0 20px 20px 20px;" class="mt15 h5 center">是否确定退出?</p>',
            okText:"确定",
            cancelText:"取消",
            ok:function(){
                $.post("/api/action/account/current/logout").success(function(res){
                    if(res.resultCode===0){
                        location=$URL_LANQIAOBEIDASAI+"/pages/dasai/index.html";
                    }
                });
            },
            Cancel: function() {
                $(this).dialog( "close" );
            }
        });
    });
    //登录
    /** 20190619 Acci 整合登录
    $("#btnShowLoginDialog").click(function(){
        if($("#loginDialog").length==0) {
            var loginDialog = $('<div class="login" id="loginDialog" >'
                + '<div class="main" style="padding:0;">'
                + '<iframe id="login_iframe" width="358" height="446" frameborder="0" src="'
                //+ '<iframe id="login_iframe" width="430" height="585" frameborder="0" src="'
                //+ '/pages/account/login_sub.html?onload=showLoginDialog&loginOk=loginOk&close=closeLoginDialog" style="padding:0"></iframe>'
                + '/pages/account/login_sub_wxr.html?onload=showLoginDialog&loginOk=loginOk&close=closeLoginDialog" style="padding:0;width: 358px;height: 446px;"></iframe>'
                + '</div>'
                + '</div>');
            loginDialog.appendTo($("body"));
            $(".headerlogin").hide();
            $(".center.picture").hide();
            refreshImgCode($("#loginDialog"));//重置验证码
        }
         //   showLoginDialog();

    });
    */
    $("#btnShowLoginDialog").click(function(){
    	toWxrLoginPage(0,"login"); //学生登录
    });
    $("#btnShowStuReg").click(function(){
    	toWxrLoginPage(0,"register"); //学生注册
    });
    
    $("#btnShowTeacherLogin").click(function(){
    	toWxrLoginPage(1,"login"); //院校入口
    });
   
    function toWxrLoginPage(usertype,action){
    	var backurl= encodeURIComponent(location.href);
    	location.href=$WXR_URL+"/api/outer/entry?usertype="+usertype+"&action="+action+"&backurl="+backurl;
    }
    //----------参数处理结束--------
    window.showLoginDialog=function(){
        showDialog($("#loginDialog"));
    }
    window.loginOk=function(data){
        location.reload();
        return;
        var $scope= $(".userlogin").scope();
        $scope.nickName=data.accountEmail;
        $scope.headImg=data.accountPortrait?data.accountPortrait:$STATIC_URL+"/common/image/logo.png";
        $scope.$apply();
        closeLoginDialog();
    }
    window.closeLoginDialog=function(){
        $("#loginDialog").remove();
    }
    $(".navigation .menu .act").removeClass("act");
    $(".navigation .menu .link").not(".newsHead").find("a").each(function(){
        var href=$(this).attr("href");
        if(!href)return;
        if(location.href.indexOf(href)>-1){
            $(this).parents(".link").addClass("act");
        }
    });
    if($(".navigation .menu .act").length==0){
        $(".navigation .menu .act:first").addClass("act");
    }
})
function openWeixinPage(){	
	console.log("opening......");
	$("#weixin_login_a_to").click();	
}

function showNewsMsg(){
	$("#news-msg").css("visibility","visible");
	$("#news-msg").show();
	setTimeout(function(){
		$("#news-msg").hide();
	},5000);
}