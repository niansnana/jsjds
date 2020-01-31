/**
 * Created by Acci on 2016/9/2.
 */

function showAuthdiv(authStatusId){
    for(var i=0;i<10;i++){
        if($("#authdiv"+i).length==0) continue;
        if(authStatusId==i){
            $("#authdiv"+i).show();
        }else{
            $("#authdiv"+i).remove();
        }
    }
}
var showPersonalInfor=function(){
    $ajax({
        url:"/api/action/audit/showPersonalInfor",
        type:"POST",
        success:function(res){
            if(res.resultCode===0){
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
                var auth= res.resultData;

                if(authStatus==2||authStatus==4||authStatus==5) { //
                    var $scope = $("#authdiv"+res.resultData.authStatusId).scope();
                    $scope.auth = res.resultData;
                    //完善参数
                    $scope.auth.identityPhotoStr=$URL_THIRDINTERFACE+"/api/action/oss/getImageStream/"+$scope.auth.identityPhoto;
                    $scope.auth.identityCertificateFrontImageStr=$URL_THIRDINTERFACE+"/api/action/oss/getImageStream/"+$scope.auth.identityCertificateFrontImage;
                    $scope.auth.identityCertificateBackImageStr=$URL_THIRDINTERFACE+"/api/action/oss/getImageStream/"+$scope.auth.identityCertificateBackImage;
                    $scope.auth.aoca.collegeOrgImageStr=$URL_THIRDINTERFACE+"/api/action/oss/getImageStream/"+$scope.auth.aoca.collegeOrgImage;
                    $scope.auth.aoca.collegeLogoImageStr=$URL_THIRDINTERFACE+"/api/action/oss/getImageStream/"+$scope.auth.aoca.collegeLogoImage;

                    showUniversitieName($scope,$scope.auth.aoca.univCode,"auth.aoca.univCode");
                    showCollegeTypeId($scope,$scope.auth.aoca.collegeTypeId,"auth.aoca.collegeTypeId");
                    showIdentityCertificateType($scope,$scope.auth.identityCertificateType,"auth.identityCertificateType");
                    //补充手机号码和邮箱
                    var i=0;
                    $scope.showbutton=function(){
                    	i++;
                    	if(i%2==1){
                    		$ajax({
                                url:"/api/action/audit/getemailandphone",
                                type:"POST",
                                success:function(res){
                                	console.log(res);
                                	$("#identityMobile").val(res.resultData.accountMobile);
                                	$("#identityEmail").val(res.resultData.accountEmail);
                                }
                        	})
                    		$("#showbutton").show();
                    	}else{
                    		$("#showbutton").hide();
                    	}
                    }
                    $scope.myphoneshow=function(){
                    	$scope.myphone=true;
                    	$ajax({
                            url:"/api/action/audit/getemailandphone",
                            type:"POST",
                            success:function(res){
                            	$("#identityMobile").val(res.resultData.accountMobile);
                            }
                    	})
                    }
                    $scope.myemailshow=function(){
                    	$scope.myemail=true;
                    	$ajax({
                            url:"/api/action/audit/getemailandphone",
                            type:"POST",
                            success:function(res){
                            	$("#identityEmail").val(res.resultData.accountEmail);
                            }
                    	})
                    }
                    $scope.$apply();

                    if(authStatus==5){
                        //个人认证
                        if(auth.authStatusId==5){

                        }else  if(auth.authStatusId==4){ //通过
                            $("#myidentityedit").find("input,select,textarea").each(function(){
                                $(this)[0].disabled=true;
                                $(this).css("background-color","rgb(235,235,228)");
                                $(this).attr("disabled","disabled");

                            });
                            $("#myidentityedit").find(".file-selecter").remove();
                        }

                        if(auth.aoca.authStatusId==4){ //通过
                            $("#aocaedit").find("input,select,textarea").each(function(){
                                $(this)[0].disabled=true;
                                $(this).css("background-color","rgb(235,235,228)");
                                $(this).attr("disabled","disabled");
                            });
                            $("#aocaedit").find(".file-selecter").remove();
                        }
                    }

                    var authRecordList=auth.authRecordList;
                    if(authRecordList&&authRecordList.length>0){
                        //渲染错误信息
                        for(var i in authRecordList){

                            //个人认证的错误
                            if(authRecordList[i].recordTable=="account_personal_identity_auth"){

                                $("#myidentityedit").find("input,select").each(function(){
                                    var thisName=$(this).attr("name");
                                    if(thisName&&thisName.indexOf(toCamel(authRecordList[i].recordColumn))>-1){
                                        //开始显示错误信息
                                        Validate.handlePass(false,$(this),authRecordList[i].recordComment);
                                        //var errordiv=$('<div class="msg-box"><span class="icon"></span><span class="msg">'+authRecordList[i].recordComment+'</span></div>');
                                        //$(this).addClass("err-border");
                                        //errordiv.insertAfter($(this));
                                    }
                                });
                            }
                            //院校认证信息错误
                            if(authRecordList[i].recordTable=="account_org_college_auth"){
                                $("#aocaedit").find("input,select,textarea").each(function(){
                                    var thisName=$(this).attr("name");
                                    if(thisName&&thisName.indexOf(toCamel(authRecordList[i].recordColumn))>-1){
                                        //开始显示错误信息

                                        Validate.handlePass(false,$(this),authRecordList[i].recordComment);

                                        //var errordiv=$('<div class="msg-box"><span class="icon"></span><span class="msg">'+authRecordList[i].recordComment+'</span></div>');
                                        //$(this).addClass("err-border");
                                        //errordiv.insertAfter($(this));
                                    }
                                });
                            }
                        }

                    }



                    ajaxForm($("#reauthcollege"), function (res) {
                        console.log(res);
                        if (res.resultCode === 0) {
                            location.reload();
                        }
                    }, $URL_ACCOUNT + "/api/action/audit/reauth/college",function(){
                        $("input:disabled,select:disabled,textarea:disabled").each(function(){$(this).removeAttr("data-rule")});
                        $("input:disabled:hidden").remove();
                        var flag=true;
                        if($("input:visible.err-border,textarea:visible.err-border").length > 0){
                            flag=false;
                        }
                        return flag;
                    });

                    ajaxForm($("#phonesave"), function (res) {
                        console.log(res);
                        if (res.resultCode === 0) {
                            location.reload();
                        }
                    }, $URL_ACCOUNT + "/api/action/audit/reauth/college",function(){
                        $("input:disabled,select:disabled,textarea:disabled").each(function(){$(this).removeAttr("data-rule")});
                        $("input:disabled:hidden").remove();
                        var flag=true;	
                        if($("input:visible.err-border,textarea:visible.err-border").length > 0){
                            flag=false;
                        }
                        return flag;
                    });
                    ajaxForm($("#emailsave"), function (res) {
                        console.log(res);
                        if (res.resultCode === 0) {
                            location.reload();
                        }
                    }, $URL_ACCOUNT + "/api/action/audit/reauth/college",function(){
                        $("input:disabled,select:disabled,textarea:disabled").each(function(){$(this).removeAttr("data-rule")});
                        $("input:disabled:hidden").remove();
                        var flag=true;
                        if($("input:visible.err-border,textarea:visible.err-border").length > 0){
                            flag=false;
                        }
                        return flag;
                    });
                    showAuthdiv(authStatus);
                }
            }else if(res.resultCode==130001){ //未认证还是滾去认证吧.
                location="/pages/account/reg_college.html";
            }else{

            }
            console.log(res);
        }
    });
}

$(function() {
    $(".select").change(function(){
        Validate.handlePass($(this).val(),$(this),$(this).attr("placeholder"));
    })
    showPersonalInfor();
});

//顶部渲染完成之后执行.
//lanqiaoApp.directive('finishHeaderFilters', function ($timeout) {
//    return {
//        restrict: 'A',
//        link: function(scope, element, attr) {
//            var $headerScope=$("header").scope();
//            $headerScope.$watch("currentUser",function(newVal){
//                if(newVal){
//                    var user=newVal;
//                    switch (user.identityId){
//                       case 1:
//                        //身份是学生
//                            location="/pages/dasai/stupersonalauth.html";
//                            return;
//                        case 2:
//                            break;
//                        default :
//                           location="/pages/dasai/index.html";
//                           return;
//                    }
//
//                }
//            });
//        }
//    };
//});

Validate.handlePass=function(flag,ele,msg){


    var msg_box;
    if($(ele).is("[name_eq]")){ //选择院校
        msg_box=$(ele).parent().find(".msg-box");
        if(msg_box.length==0){
            msg_box=$('<div class="msg-box"></div>');
            msg_box.appendTo($(ele).parent());
        }
    }else if($(ele).is("[showcropbox]")){ //图片
        msg_box=$(ele).parent().parent().find(".msg-box");
        if(msg_box.length==0){
            msg_box=$('<div class="msg-box"></div>');
            msg_box.appendTo($(ele).parent());
        }
    } else {
        msg_box = ele.next().size() > 0 ? ele.next() : $('<div class="msg-box"></div>');
        if (!ele.next().size() > 0) {
            msg_box.appendTo(ele.parent());
        }
    }
    if(flag){
        msg_box.html('<span class="icon ok"></span>');
        ele.css("border-color","#c8d2d7");
        return true;
    }else{
        msg_box.html('<span class="icon"></span><span class="msg">'+msg+'</span>');

        ele.css("border-color","#ff5600");

        return false;
    }
}

