'use strict';
//alert("服务器正在维护,可能产生数据波动,请勿进行任何操作,以免造成损失.");
// Define the `phonecatApp` module
var lanqiaoApp = angular.module('lanqiaoApp', ['ngRoute','lanqiaoControllers'], function($httpProvider) {
    //该方法用于解决不能像JQuery正常提交参数的问题
  // Use x-www-form-urlencoded Content-Type 
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
 
  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */ 
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      
    for(name in obj) {
      value = obj[name];
        
      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
      
    return query.length ? query.substr(0, query.length - 1) : query;
  };
 
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
  $httpProvider.defaults.withCredentials=true; //允许跨域带上cookie
    //----------登录拦截-----------
  $httpProvider.interceptors.push(function ($q) {
      return {
          request: function(config){
              return config;
          },
          requestError: function(err){
              return $q.reject(err);
          },
          response: function(res){

              if(window.$SHOW_LOGINDIALOG_NOT){
                  return res;
              }
              //不再使用此处
              /**
              if(res.status==200&&(res.data.resultCode===300605||res.data.resultCode===300602)){ //需要重新登录
                  if($("#loginDialog").length>0||loginDialogLength>0){return;}
                  loginDialogLength++;
                  var loginDialog=$('<div class="login" id="loginDialog" >'
                        +'<div class="main">'
                            +'<iframe id="login_iframe" width="430" height="585" frameborder="0" src="'
                            +'/pages/account/login_sub.html?onload=showLoginDialog&loginOk=loginOk&close=closeLoginDialog" style="padding:0"></iframe>'
                      +'</div>'
                      +'</div>');
                  loginDialog.appendTo($("body"));
                  $(".headerlogin").hide();
                  $(".center.picture").hide();
                  return;
              }
              return res;
               **/
              return res;
          },
          responseError: function(err){
              if(-1 === err.status) {
                  // 远程服务器无响应
              } else if(500 === err.status) {
                  // 处理各类自定义错误
              } else if(501 === err.status) {
                  // ...
              }
              return $q.reject(err);
          }
      };
  });
    //---------登录拦截结束
});
//----------参数处理结束--------
var showLoginDialog=function(){
    showDialog($("#loginDialog"));
}
var loginOk=function(data){
    location.reload();
    return;
    var $scope= $(".userlogin").scope();
    $scope.nickName=data.accountEmail;
    $scope.headImg=data.accountPortrait?data.accountPortrait:$STATIC_URL+"/common/image/logo.png";
    $scope.$apply();
    closeLoginDialog();
}
var closeLoginDialog=function(){
    $("#loginDialog").remove();
    loginDialogLength=0;
}
var loginDialogLength=0;




var lanqiaoControllers= angular.module('lanqiaoControllers',[]);//不同的页面自己去定义处理器.
//顶部登录状态(个人中心)
lanqiaoApp.controller('topUserCtrl', ['$scope', '$http',function ($scope, $http) {
    $http.post('/api/action/account/current/user').success(function (res) {
         //console.log(res);
       if(res.resultCode===0){//成功.
           $scope.$watch("currentUser", function(newVal){
               if($(".center.picture").length>0){
                   $(".center.picture img").attr("src",newVal.accountPortrait?("/api/action/oss/getImageStream/"+newVal.accountPortrait):($STATIC_URL+"/account/images/default_head_img/"+newVal.identityId+"/"+newVal.accountId%6+".png"));
                   $(".center.picture span").text(newVal.accountNickname);

               }
               if($("#leftbar_myauth").length>0){
                   var authHref="";
                   if(newVal.identityId==2){
                       authHref="/pages/dasai/college_auth.html";

                   }else{
                       authHref="/pages/dasai/stupersonalauth.html";
                   }
                   $("#leftbar_myauth").find("a:first").attr("href",authHref);
               }
           });
           $scope.currentUser=res.resultData;
           $scope.nickName=res.resultData.accountNickname;
           $scope.headImg=res.resultData.accountPortrait?("/api/action/oss/getImageStream/"+ res.resultData.accountPortrait):($STATIC_URL+"/account/images/default_head_img/"+res.resultData.identityId+"/"+res.resultData.accountId%6+".png");
       }else{
           $(".headerlogin").hide();
       }
    });
    
   

}]);
//门户页顶部登录信息
lanqiaoApp.controller('personalTopCtrl', ['$scope', '$http',function ($scope, $http) {
    $http.post('/api/action/account/current/user').success(function (res) {
       if(res.resultCode===0){//成功.
           $scope.currentUser=res.resultData;
       }else{
       }
});
    

}]);
//门户页顶部登录信息
lanqiaoApp.controller('indexTopUserCtrl', ['$scope', '$http',function ($scope, $http) {
    console.log(window.currentUser)
    $http.post('/api/action/account/current/user').success(function (res) {
         //console.log(res);
        //$scope.loginHtml_Not='<li class="nav-btn"><a id="btnShowLoginDialog" href="JavaScript:void(0);">登录</a></li>'
        //+'<li class="nav-btn reg"><a href="/account/reg_combine.jsp">注册</a></li>';
        $scope.loginHtml_Not='<li class="nav-btn"><a id="btnShowLoginDialog" href="JavaScript:void(0);">登录</a></li>'
            +'<li class="nav-btn reg"><a href="/pages/account/reg_combine.html">注册</a></li>';

        $scope.loginHtml_OK='<li class="logined" >'+
								'<div class="userinfo">'+
									'<img src="{{headImg}}" class="head-img"/>'+
									//'<span>{{nickName}}</span>'+
									'<span></span>'+
									'<img src="'+$STATIC_URL+'/dasai/images/index/index-account-drop.png" class="dropicon"/>'+
								'</div>'+
								'<ul class="dropmenu" data-show="no">'+
									'<div class="arrow arrow1"></div>'+
									'<div class="arrow arrow2"></div>'+
									'<li><a href="{{myauthhref}}"><img src="'+$STATIC_URL+'/dasai/images/icon/icon-safe.png"/>个人认证</a></li>'+
									'<li id="leftbar_myauth"><a href="/pages/dasai/personal_my_dasai.html"  class="mymatchbtn"><img src="'+$STATIC_URL+'/dasai/images/icon/userdrop-img1.png"/>我的大赛</a></li>'+
									'<li><a href="/pages/dasai/order/myorder.html"><img src="'+$STATIC_URL+'/dasai/images/icon/userdrop-img2.png"/>我的订单</a></li>'+
									'<li><a href="/pages/account/message.html"><img src="'+$STATIC_URL+'/dasai/images/icon/userdrop-img3.png"/>我的消息</a></li>'+
									'<li><a href="/pages/account/stu_address.html"><img src="'+$STATIC_URL+'/dasai/images/icon/icon-address.png">我的地址</a></li>'+
                                    '<li><a href="/pages/account/myaccount_headimg.html"><img src="'+$STATIC_URL+'/dasai/images/icon/icon-account.png">账号设置</a></li>'+
									'<li class="quit"><a href="javascript:void(0);" class="logoutbtn"><img src="'+$STATIC_URL+'/dasai/images/icon/userdrop-img4.png"/>退出</a></li>'+
								'</ul>'+
							 '</li>';

        $scope.loginHtml_OK='<div class="logined">'
            +'<div class="userinfo">'
            +'<img class="head-img" src="{{headImg}}">'
            +'<span></span>'
            +'<img class="dropicon" src="'+$STATIC_URL+'/dasai/images/index/index-account-drop.png">'
            +'</div>'
            +'<div class="dropmenu">'
            +'<div class="arrow arrow1"></div>'
            +'<div class="arrow arrow2"></div>'
            +'<ul class="links">'
            +'<li><a href="{{myauthhref}}"><img src="'+$STATIC_URL+'/dasai/images/icon/icon-safe.png">个人认证</a></li>'
            +'<li id="leftbar_myauth"><a class="mymatchbtn" href="/pages/dasai/personal_my_dasai.html"><img src="'+$STATIC_URL+'/dasai/images/icon/userdrop-img1.png">我的大赛</a></li>'
            +'<li><a href="/pages/dasai/order/myorder.html"><img src="'+$STATIC_URL+'/dasai/images/icon/userdrop-img2.png">我的订单</a></li>'
            +'<li><a href="/pages/account/message.html"><img src="'+$STATIC_URL+'/dasai/images/icon/userdrop-img3.png">我的消息</a></li>'
            +'<li><a href="/pages/account/stu_address.html"><img src="'+$STATIC_URL+'/dasai/images/icon/icon-address.png">我的地址</a></li>'
            +'<li><a href="/pages/account/myaccount_headimg.html"><img src="'+$STATIC_URL+'/dasai/images/icon/icon-account.png">账号设置</a></li>'
            +'<li class="quit"><a class="logoutbtn" href="javascript:void(0);"><img src="'+$STATIC_URL+'/dasai/images/icon/userdrop-img4.png">退出</a></li>'
            +'</ul>'
            +'</div>'
            +'</div>';

       if(res.resultCode===0){//成功.
           $scope.loginHtml=$scope.loginHtml_OK;
           $scope.headImg=res.resultData.accountPortrait?("/api/action/oss/getImageStream/"+ res.resultData.accountPortrait):($STATIC_URL+"/account/images/default_head_img/"+res.resultData.identityId+"/"+res.resultData.accountId%6+".png");
           $scope.nickName=res.resultData.accountNickname;
           $scope.loginHtml=$scope.loginHtml.replace(/{{nickName}}/g,$scope.nickName).replace(/{{headImg}}/g,$scope.headImg);
           //if($("#leftbar_myauth").length>0){
               var authHref="";
               if(res.resultData.identityId==2){
                   authHref="/pages/dasai/college_auth.html";

               }else{
                   authHref="/pages/dasai/stupersonalauth.html";
               }
               //$("#leftbar_myauth").find("a:first").attr("href",authHref);
               $scope.loginHtml=$scope.loginHtml.replace(/{{myauthhref}}/g,authHref);
           //}

           $scope.$watch("currentUser", function(newVal){
               window.currentUser=newVal;
               $(".center.picture img").attr("src",newVal.accountPortrait?("/api/action/oss/getImageStream/"+newVal.accountPortrait):($STATIC_URL+"/account/images/default_head_img/"+newVal.identityId+"/"+newVal.accountId%6+".png"));

                window.leftbarTimer=setInterval(function(){
                    if(($("#leftbar_personal").length==0&&$("#leftbar_tercher").length==0)||$("#leftbar_myauth").length==0){
                        return;
                    }
                    clearInterval(window.leftbarTimer);
                   var authHref="";
                   if(window.currentUser.identityId==2){
                       authHref="/pages/dasai/college_auth.html";
                       $("#leftbar_personal").remove();
                       $("#leftbar_tercher").show();
                   }else{
                       authHref="/pages/dasai/stupersonalauth.html";
                       $("#leftbar_tercher").remove();
                       $("#leftbar_personal").show();
                   }
                   $("#leftbar").show();
//                   $("#leftbar_myauth").find("a:first").attr("href",authHref);
                   $("#leftbar_myauth").find("a:first").attr("href","/pages/dasai/personal_my_dasai.html");
                },100);
               //$scope.loginHtml=$scope.loginHtml.replace(/{{myauthhref}}/g,authHref);

           });
           $scope.currentUser=window.currentUser;//res.resultData;
           //window.currentUser=$scope.currentUser;
           if($scope.currentUser.identityId==2){
               $("#leftbar_personal").remove();
               console.log(window.currentUser.authStatus);
               $http.post( $URL_ACCOUNT + "/api/action/audit/showPersonalInfor").success( function (res) {
                        if(res.resultCode===0){
                            window.currentUser.accountNickname=res.resultData.aoca.univName ;//+"<br/>"+window.currentUser.accountNickname;
                            $(".center.picture span").html(window.currentUser.accountNickname);
                            $(".userinfo span").html(window.currentUser.accountNickname);
                           window.userNameTimer=setInterval(function(){
                                if($(".userinfo span").length>0) {
                                    window.clearInterval(window.userNameTimer);
                                    $(".userinfo span").html(window.currentUser.accountNickname);
                                }
                            },100);
                            var authStatus=res.resultData.authStatusId;
                            if(authStatus!=5){
                                if(res.resultData.aoca){
                                    if(res.resultData.aoca.authStatusId==5){
                                        authStatus=5;
                                    }else if(res.resultData.aoca.authStatusId==2){
                                        authStatus=2;
                                    }

                                }
                            }
                            if(authStatus==4){ //如果认证都通过了,则打开左侧导航
                            	                                $("li[certified]").show();
                                window.certifiedShowTimer = setInterval(function(){
                                    if($("li[certified]").length>0) {
                                        $("li[certified]").show();
                                        clearInterval(window.certifiedShowTimer);
                                    }
                                },1000);

                            }
                            $scope.authStatus=authStatus;
                            window.authStatus=authStatus;

                        }else{
                            window.userNameTimer=setInterval(function(){
                                if($(".userinfo span").length>0) {
                                    window.clearInterval(window.userNameTimer);
                                    $(".userinfo span").text(window.currentUser.accountNickname);
                                }
                            },100);
                        }
                   }
               );



           }else{
               $("#leftbar_tercher").remove();
               if($(".center.picture").length>0){

                   $(".center.picture span").text(window.currentUser.accountNickname);
               }
               window.userNameTimer=setInterval(function(){
                   if($(".userinfo span").length>0) {
                       window.clearInterval(window.userNameTimer);
                       $(".userinfo span").text(window.currentUser.accountNickname);
                   }
               },100);
           }
           $scope.topDasai=$scope.currentUser.identityId==2?"大赛管理":"我的大赛";

       }else{
           $http.get('/api/action/account/current/sessionkey').success(function(res){
               refreshImgCode();
           }); //尝试获取sessionKey
           $scope.loginHtml=$scope.loginHtml_Not;           
           $http.get("/pages/account/index_login.html").success(function(res){
               var loginDialog=$(res);
               loginDialog.appendTo($("body"));
               $("#topUserDiv").on("click","#btnShowLoginDialog",function(){
                   refreshImgCode($("#loginDialog"));//重置验证码
                   showDialog('#loginDialog');
               });
               //$("#btnShowLoginDialog").click(function(){
               //    refreshImgCode($("#loginDialog"));//重置验证码
               //    showDialog('#loginDialog');
               //});
               initRefreshImgCode(loginDialog);

               $("#loginForm input[data-rule]").blur(function(){
                   var rule = $(this).data("rule").split(":");
                   var method = rule[0];
                   var msg = rule[1];
                   Validate.handlePass(Validate[method]($(this)),$(this),msg);
               });
               //图片验证码自检测
               $('#loginForm input[vali="is_imgcode"]').blur(function(){
                   var ele=$(this);
                   valiImg=ele;
                   if (!Validate.require(ele)) {
                       $("#vcode").css("border-color","rgb(255, 86, 0)");
                       $("#vcode").parent().parent().next().text("请输入图片验证码");
                       return;
                   }
                   var val = ele.val();
                   $ajax({
                       url:$URL_THIRDINTERFACE + "/api/action/directmail/checkvcode",
                       data:{vcode:val},
                       type:"POST",
                       success:function(res){
                           if(res.resultCode===0){
                               valiImg.attr("pass","true");
                               $("#vcode").removeAttr("style");
                               $("#vcode").parent().parent().next().text("");
                               return;
                           }
                           valiImg.attr("pass","false");
                           $("#vcode").css("border-color","rgb(255, 86, 0)");
                           $("#vcode").parent().parent().next().text("验证码错误");
                       }
                   });
               });

               ajaxForm($("#loginForm"),function(res){
                   if(res.resultCode===0){ //成功登录
                       location.reload();
                     //var $scope= angular.element($("#topUserDiv")).scope().$parent;
                     //  $scope.loginHtml=$scope.loginHtml_OK;
                     //
                     //  $scope.nickName=res.resultData.accountNickname;
                     //  $scope.loginHtml=$scope.loginHtml.replace(/{{nickName}}/g,$scope.nickName);
                     //  $scope.currentUser=res.resultData;
                     //  $scope.$apply();
                     //  closeDialog('#loginDialog');
                   }else{ //失败
                     $("#loginError").text(res.resultMsg?res.resultMsg:"服务器繁忙,请稍微再试.");   
                   }
                   refreshImgCode($("#loginDialog"));//重置验证码
                     
                },"/api/action/account/login",function(){
                   var flag=true;
                   if(!$("#vcode").val()){
                       $("#vcode").parent().parent().next().text("请输入图片验证码");
                       flag=false;
                   }
                   return flag;
               });
           });
           
       }



    });

    //$scope.headImg="/statics/dasai/images/tmp/touxiang.png";
}]).filter( //该过滤器允许HTML直接输出
    'to_trusted', ['$sce', function ($sce) {  
        return function (text) {  
            return $sce.trustAsHtml(text);  
        }  
    }]  
);

lanqiaoApp.controller('indexLeftUserCtrl', ['$scope', '$http',function ($scope, $http) {
    if(window.currentUser.authStatus==4){ //如果认证都通过了,则打开左侧导航
        $("li[certified]").show();
      //荣誉院校
    	if(window.currentUser.isHonor==1){
    		$(".center.picture").after('<div class="center"><a href="/pages/dasai/college_awards_recorder/college_honor.html"><i class="icon-honor"></i></a></div>');
    	}

        window.certifiedShowTimer = setInterval(function(){
            if($("li[certified]").length>0) {
                $("li[certified]").show();
                clearInterval(window.certifiedShowTimer);
            }
        },100);

    }else{
        window.certifiedHideTimer = setInterval(function(){
            if($("li[certified]").length>0) {
                $("li[certified]").hide();
                clearInterval(window.certifiedHideTimer);
            }
        },100);

    }
    var headImg=window.currentUser.accountPortrait?("/api/action/oss/getImageStream/"+window.currentUser.accountPortrait):($STATIC_URL+"/account/images/default_head_img/"+window.currentUser.identityId+"/"+window.currentUser.accountId%6+".png");
    if(window.currentUser.accountPortrait && window.currentUser.accountPortrait.indexOf("http")>-1){
    	headImg=window.currentUser.accountPortrait;
    }
    $(".center.picture img").attr("src",headImg);
    $(".center.picture span").text(window.currentUser.identityId==1?window.currentUser.accountNickname:window.currentUser.univName);

}]);

//leftbar左侧导航 当前选择项处理 
lanqiaoApp.directive("activeleft",[function(){
     return {
        restrict: 'A',  
        link: function (scope, elm, attrs) {
            if(attrs.activeleft){
                $(elm).find("li").removeClass("active"); //移除已有的
                $(elm).find("li").each(function(){ 
                    if( $(this).attr("id")==="leftbar_"+attrs.activeleft){
                        $(this).addClass("active");   //当前选择
                    }
                });
            }
        }
         
     }
}]);
function a(){
	alert(0)
}

