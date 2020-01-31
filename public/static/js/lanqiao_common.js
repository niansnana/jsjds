/**
 一些基本方法
 */


/**
 加了盐的ajax方法(暂未扩展)
 */
$ajax = function (ajaxObj) {
    if(ajaxObj){
        ajaxObj.xhrFields={withCredentials: true};
        ajaxObj.successbak=ajaxObj.success;
        /*
        ajaxObj.success=function(res){

            if(!window.$SHOW_LOGINDIALOG_NOT) {
                if (res.resultCode === 300605) { //需要重新登录
                    if ($("#loginDialog").length > 0 || loginDialogLength > 0) {
                        return;
                    }
                    loginDialogLength++;
                    var loginDialog = $('<div class="login" id="loginDialog" >'
                        + '<div class="main">'
                        + '<iframe id="login_iframe" width="430" height="560" frameborder="0" src="'
                        + '/account/login_sub.html?onload=showLoginDialog&loginOk=loginOk&close=closeLoginDialog" style="padding:0"></iframe>'
                        + '</div>'
                        + '</div>');
                    loginDialog.appendTo($("body"));
                    return;
                }
            }
            try{
                ajaxObj.successbak(res);
            }catch(e){
                console.log(e);
            }

        }
        */
    }
    return $.ajax(ajaxObj);
}


//-------文件上传-------------
var fileUploading = new Array();
var fileUploadingLength=0;
/**
 将img信息推入上传文件列表.
 */
function imgToUploadFile($img, $toShow,$callbackFun) {
    fileUploading.unshift({img: $img, toShow: $toShow,callbackFun:$callbackFun});
    fileUploadingLength++;
    //if ($img.siblings(".lodding").length == 0) {
    //    var loadingImg = $('<img class="lodding" src="/statics/dasai/images/lodding_1.gif">');
    //    $img.after(loadingImg);
    //}
    $img.siblings(".file-selecter").children().hide();
    $img.siblings(".file-selecter").addClass("uploading");
    setTimeout(imgUpFile, 1000);
}
function imgUpFile() {
    if (fileUploading.length == 0) {
        return;
    }
    var toUploadObj = fileUploading.pop();//取最先一个
    fileUploadingLength--;

    var fileType=$(toUploadObj.img).attr("img-type")||"identityimg";
    var imgData=$(toUploadObj.img).attr("img-data");
    var vpoint=$(toUploadObj.img).attr("vpoint");
    var url=$URL_THIRDINTERFACE + "/api/action/oss/putobject";
    if(vpoint=="admin"){ //admin端上传
        url=$URL_THIRDINTERFACE + "/api/action/oss/putobjectadmin";
    }
    $ajax({
        url: url,
        type: "POST",
        async: true,
        data: {data: $(toUploadObj.img).attr("src"),fileType:fileType},//{data:$(toUploadObj.img).attr("src")},
        success: function (res) {
            if(res.resultCode===0) {
                $(toUploadObj.toShow).val(res.resultData.staticfileKey);
                toUploadObj.img.siblings(".uploading").children().show();
                toUploadObj.img.siblings(".uploading").removeClass("uploading");
                toUploadObj.img.parent().parent().find(".msg-box").text("");
                if(toUploadObj.callbackFun){
                    window[toUploadObj.callbackFun](imgData,res.resultData.staticfileKey);
                    //imgData,res.resultData.staticfileKey
                }
            }else {
                toUploadObj.img.siblings(".uploading").children().show();
                toUploadObj.img.siblings(".uploading").removeClass("uploading");
                toUploadObj.img.parent().parent().find(".msg-box").html('<span class="icon"></span><span class="msg">'+(res.resultMsg?res.resultMsg:"上传时发生错误")+'</span>');
                //toUploadObj.img.css("border-color","#ff5600");
            }
            //fileUploadingLength--;
        },
        error: function (res) {
            //fileUploadingLength--; //上传失败也取消上传状态吧
            console.error(res);
        }
    });
    //if (fileUploading.length > 0) {
    //    return;
    //}
    //imgUpFile();
}

function updatePhoto(imgData,staticfileKey){
    $.ajax({
        url:$URL_LANQIAOBEIDASAI + "/api/certificateApplyRecord/updatePhoto",
        type:"post",
        data:{recordId:imgData
            ,accountPhoto:staticfileKey},
        success:function(res){
            console.log(res);
            if(res.resultCode===0){
                showAlert(1, "上传成功");
                var $scope=$("#stulistdiv").scope().$parent;
                $scope.searchList($scope.searchData.page);
            }else{
                showAlert(0,'图片上传失败，请重新上传！');

            }

        },
        error:function(res){
            console.log(res);

        }
    });

}

//----------------------------

//-----------表单处理----------
//此方法由前端给的表单验证方法改写
var ajaxForm = function ($form, successFun, actionUrl,beforSubmitFun) {
    $form.submit(false);

    $form.find("button[type='submit']").click(function () {
        var beforeFlag=true;
        if(beforSubmitFun){ //提交之前执行
            beforeFlag=beforSubmitFun();
            //if(beforeFlag===false){
            //    return;
            //}
        }
        if (fileUploadingLength > 0) { //如果还有正在上传的文件,就等等吧
            return;
        }
        if (!valiForm($form)||beforeFlag===false) {
            return;
        }
        $ajax({
            url: actionUrl ? actionUrl : $form.attr("action"),
            type: "POST",
            data: FormUtil.formSerializeObj($form, true),
            success: successFun,
            error: function (res) {
                console.error(res);
            }
        });
    });
}
var valiForm = function (ele) {
	
    var noPass = 0;
    ele.find("input[data-rule]").each(function () {
        var rule = $(this).data("rule").split(",");
        for (var i = 0; i < rule.length; i++) {
            var arr = rule[i].split(":");
            method = arr[0],
                msg = arr[1];
            if(method=='equals_to'&&!$(this).val()){ //如果没值,则按默认提示报错.
                msg = $(this).attr("placeholder");
            }
            var isPass = Validate.handlePass(Validate[method]($(this)), $(this), msg);
            if (!isPass) {
                noPass++;
            }
        }
    });
    ele.find("textarea[data-rule]").each(function () {
        var rule = $(this).data("rule").split(":");
        method = rule[0],
            msg = rule[1];
        var isPass = Validate.handlePass(Validate[method]($(this)), $(this), msg);
        if (!isPass) {
            noPass++;
        }
    });

    ele.find("input[type=file]:visible").each(function () {
        var msg = $(this).data("msg") ? $(this).data("msg") : '请上传图片';
        if ($(this).data("pass") == "no") {
            $(this).closest(".file").parent().find(".msg-box").html('<span class="icon"></span><span class="msg">' + msg + '</span>');
            noPass++;
        }
    });
    ele.find(".file:visible input[data-imgurl][require]").each(function () {
        var isPass =Validate.require($(this));
        if(!isPass) {
            var msg = $(this).data("msg") ? $(this).data("msg") : '请上传图片';
            $(this).closest(".file").parent().find(".msg-box").html('<span class="icon"></span><span class="msg">' + msg + '</span>');
            noPass++;
        }
    });

    ele.find("select[data-rule]").each(function () {
        var method = $(this).data("rule").split(":")[0];
        console.log(method)
        var isPass = Validate[method]($(this));
        if (!isPass) {
            noPass++;
            $(this).closest(".dropdown").next().html('<span class="icon"></span><span class="msg">请选择地址</span>');
        } else {
            $(this).closest(".dropdown").next().html('<span class="icon ok"></span>');
        }
    });

    ele.find("label[data-pass]").each(function () {
        var h = $(this).closest(".file").parent().html();
        var msg = $(this).data("msg") ? $(this).data("msg") : '请上传图片';
        if ($(this).data("pass") == "no") {
            var h = $(this).closest(".file").parent().html();
            console.log(h)
            $(this).closest(".file").parent().find(".msg-box").html('<span class="icon"></span><span class="msg">' + msg + '</span>');
            noPass++;
        }
    });

    if (noPass > 0) {
        return false;
    }
    return true;
}


//-----------------------------


//---------验证码处理-------------
var refreshImgCode = function ($ele) {
    $ele = $ele || $("body");
    $ele.find(".code-img").attr("src", $URL_THIRDINTERFACE + "/api/action/directmail/vcode2?_" + new Date().getTime());
}
var initRefreshImgCode = function ($ele) {
    $ele.find(".code-img").click(function () {
        refreshImgCode($(this).parent())
    });
    $ele.find(".code-link").click(function () {
        refreshImgCode($(this).parent())
    });
    refreshImgCode($ele);
}

function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}
function setCookie(name,value,time)
{
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec*1);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

$(function(){
    //登录下拉
	$("body").on("click",".logined .userinfo",function(){
        var $scope=$("#topUserDiv").scope();
        var user=$scope.currentUser;

        if(user&&user.identityId==2){

            var teacherDown= '<div class="arrow arrow1"></div>'+
                '<div class="arrow arrow2"></div>'+
                '<li><a href="/pages/dasai/college_auth.html"><img src="'+$STATIC_URL+'/dasai/images/icon/icon-safe.png"/>院校认证</a></li>'+
                (window.authStatus==4?(
                '<li id="leftbar_myauth"  certified ><a href="/pages/dasai/college_allstu.html"  class="mymatchbtn"><img src="'+$STATIC_URL+'/dasai/images/icon/userdrop-img1.png"/>大赛管理</a></li>'+
                '<li id="leftbar_myorder"  certified ><a href="/pages/dasai/matchcontact.html#/"  class="mymatchbtn"><img src="'+$STATIC_URL+'/dasai/images/icon/icon-qual.png"/>教师管理</a></li>'+
                '<li id="leftbar_certificate"  certified ><a href="/pages/dasai/certificate/certificate_allstu.html?isFirstApply=1"  class="mymatchbtn"><img src="'+$STATIC_URL+'/dasai/images/icon/icon-certificate.png"/>证书管理</a></li>'+
                '<li id="leftbar_matchpoint" certified><a href="/pages/dasai/match_point_auth.html"><img src="'+$STATIC_URL+'/dasai/images/icon/saidian.png" />赛点申请</a></li> '+
                '<li id="leftbar_examinfodown" certified><a href="/pages/dasai/examinfodown/pointDown.html"><img src="'+$STATIC_URL+'/dasai/images/icon/examDown.png"/>考试下载</a></li> '+
                '<li id="leftbar_myorder"  certified ><a href="/pages/dasai/order/teacher_order.html"  class="mymatchbtn"><img src="'+$STATIC_URL+'/dasai/images/icon/userdrop-img2.png"/>订单管理</a></li>'+
               '<li id="leftbar_record"  certified ><a href="/pages/dasai/college_personal_record.html"  class="mymatchbtn"><img src="'+$STATIC_URL+'/dasai/images/icon/icon-award.png"/>获奖记录</a></li>'+
                '<li id="leftbar_myorder"  certified ><a href="/pages/account/stu_address.html"  class="mymatchbtn"><img src="'+$STATIC_URL+'/dasai/images/icon/icon-address.png"/>地址管理</a></li>'
                ):"")
                +
                '<li id="leftbar_mymessage"><a href="/pages/account/message.html"  class="mymatchbtn"><img src="'+$STATIC_URL+'/dasai/images/icon/userdrop-img3.png"/>我的消息</a></li>'+
                '<li id="leftbar_myaccount"><a href="/pages/account/myaccount_headimg.html"  class="mymatchbtn"><img src="'+$STATIC_URL+'/dasai/images/icon/icon-account.png"/>账号设置</a></li>'+
                '<li class="quit"><a href="javascript:void(0);" class="logoutbtn"><img src="'+$STATIC_URL+'/dasai/images/icon/userdrop-img4.png"/>退出</a></li>';
            $(".dropmenu").html(teacherDown);
        }

		var _tar =  $(this).next();
		if('none' == _tar.css('display')){
			_tar.fadeIn(100)
		}else{
			_tar.fadeOut(100);
		}
	});
	$(document).mouseup(function(e){
		var _con = $(".logined .userinfo");   // 设置目标区域
	  	if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
	    	$('.logined .dropmenu').fadeOut(100)
	  	}
	});

	
	
    $("body").on("click",".logoutbtn",function(){
        $.yehDialog({
            dialogWidth:445,
            title:"信息",
            content:'<p style="padding:0 20px 20px 20px;" class="mt15 h5 center">是否确定退出?</p>',
            okText:"确定",
            cancelText:"取消",
            ok:function(){
            	delCookie("lqtoken");
                $ajax({url:"/api/action/account/current/logout"}).success(function(res){
                    if(res.resultCode===0){
                        location=$URL_LANQIAOBEIDASAI+"/pages/dasai/index.html";
                    }
                });
            },
            Cancel: function() {
                $(this).dialog( "close" );
            }
        });

        //if(confirm("是否确定退出?")){
        //    $ajax({url:"/api/action/account/current/logout"}).success(function(res){
        //        if(res.resultCode===0){
        //            location=$URL_LANQIAOBEIDASAI+"/dasai/index.jsp";
        //        }
        //    });
        //}
    });

    $("body").on("click",".mymatchbtn",function(){
        var header=$(".index-nav").length>0?$(".index-nav"):$(".header");
        var $scope=header.scope();
        var currentUser=$scope.currentUser;
        if(currentUser.identityId==2){
            location="/pages/dasai/college_auth.html";
        }else{
            location="/pages/dasai/stupersonalauth.html";
        }
    });
});
/* 警示窗：1->成功 ，0->失败*/
function showAlert(state,msg,waitTime){
    var $alert = $('<div class="globalAlert"><span>'+msg+'</span></div>');
    if(0 == state){
        $alert.addClass('alert-err');
    }
    $alert.appendTo("body");

    $alert.width($alert.find("span").width() + 120);
    setTimeout(function(){
        $alert.fadeOut(function(){
            $alert.remove();
        });
    },waitTime||800);
}

//字符串骆驼式转换.
function toCamel(str){
    if(!str)return;
    var newStr="";
    var flag=false;
    for(var i in str){
        if(str[i]=='_'||str[i]=='-'){
            flag=true;
            continue;
        }
        newStr+=flag?str[i].toUpperCase():str[i];
        flag=false;
    }
    return newStr;
}

$(function(){
    //需要先验证用户的按钮处理
    $("body").on("click","a.user_check",function(){
        var user=$("#topUserDiv").scope().currentUser;
        if(!user){
            if($("#btnShowLoginDialog").length>0){
                $("#btnShowLoginDialog").trigger("click");
            }else{

            }
            return false;
        }else{
            location=$(this).attr("href");
        }

        return false;
    });

})


function showDasaiLeft(){
    if(!$("#leftbar_dasai ul").is(":visible")){
        $("#leftbar_dasai ul").slideDown("fast");
    }else if($("#leftbar_dasai ul").is(":visible")){
        $("#leftbar_dasai ul").slideUp("fast");
    }
}
function showRecordLeft(){
    if(!$("#leftbar_awardsrecord ul").is(":visible")){
        $("#leftbar_awardsrecord ul").slideDown("fast");
    }else if($("#leftbar_awardsrecord ul").is(":visible")){
        $("#leftbar_awardsrecord ul").slideUp("fast");
    }
}
function showCertificateLeft(){
    if(!$("#leftbar_certificate ul").is(":visible")){
        $("#leftbar_certificate ul").slideDown("fast");
    }else if($("#leftbar_certificate ul").is(":visible")){
        $("#leftbar_certificate ul").slideUp("fast");
    }
}
function showMyaccountLeft(){
    if(!$("#leftbar_myaccount ul").is(":visible")){
        $("#leftbar_myaccount ul").slideDown("fast");
    }else if($("#leftbar_myaccount ul").is(":visible")){
        $("#leftbar_myaccount ul").slideUp("fast");
    }
}

//-----深度拷贝
function getType(o)
{
    var _t;
    return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
}
/**
 * 拷贝对象.
 * @param destination
 * @param source
 */
function extend(destination,source)
{
    for(var p in source)
    {
        if(getType(source[p])=="array"||getType(source[p])=="object")
        {
            destination[p]=getType(source[p])=="array"?[]:{};
            arguments.callee(destination[p],source[p]);
        }
        else
        {
            destination[p]=source[p];
        }
    }
}
//深度拷贝结束

function $getJSON(url,callBack){
    return $.ajax(
        {
            url: $URL_THIRDINTERFACE + "/api/action/http/get",
            type:"POST",
            xhrFields: {withCredentials: true},
            data:{
                url:url
            },
            success:callBack
        });
}

/*
 * 中国大陆身份证号校验
 */
function identityCardNo(value) {
    var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
    var varArray = new Array();
    var intValue;
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = value.length;
    var idNumber = value.toUpperCase();
    // initialize
    if ((intStrLen != 18)) {
        // error = "输入身份证号码长度不对！";
        // alert(error);
        // frmAddUser.txtIDCard.focus();
        return false;
    }
    // check and set value
    for (i = 0; i < intStrLen; i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
            // error = "错误的身份证号码！";
            // alert(error);
            // frmAddUser.txtIDCard.focus();
            return false;
        } else if (i < 17) {
            varArray[i] = varArray[i] * factorArr[i];
        }
    }
    if (intStrLen == 18) {
        // check date
        var date8 = idNumber.substring(6, 14);
        if (checkDate(date8) == false) {
            // error = "身份证中日期信息不正确！.";
            // alert(error);
            return false;
        }
        // calculate the sum of the products
        for (i = 0; i < 17; i++) {
            lngProduct = lngProduct + varArray[i];
        }
        // calculate the check digit
        intCheckDigit = 12 - lngProduct % 11;
        switch (intCheckDigit) {
            case 10:
                intCheckDigit = 'X';
                break;
            case 11:
                intCheckDigit = 0;
                break;
            case 12:
                intCheckDigit = 1;
                break;
        }
        // check last digit
        if (varArray[17].toUpperCase() != intCheckDigit) {
            // error = "身份证效验位错误!...正确为： " + intCheckDigit + ".";
            // alert(error);
            return false;
        }
    } else {
        return false;
    }
    return true;
}

/*
 * 中国大陆身份证号-日期校验
 */
function checkDate(date) {
    return true;
}
function setCache(key,value,timeout,callback){
    $ajax({
        url:$URL_LANQIAOBEIDASAI+ "/api/action/http/cache/set",
        type:"POST",
        data:{key:key,value:value,timeout:timeout},
        success:function(res){
           if(callback) {
               callback(res);
           }
        }
    });
}
function getCache(key,callback){
    $ajax({
        url:$URL_LANQIAOBEIDASAI+ "/api/action/http/cache/get",
        type:"POST",
        data:{key:key},
        success:function(res){
            if(callback) {
                callback(res);
            }
        }
    });
}
//发票内容配置
var invoiceConfigsByOrderType={
    0:{id:1,config:"报名费"}, //默认
    1:{id:1,config:"报名费"}, //1.个人赛
    2:{id:1,config:"报名费"}, // 2.团队赛
    3:{id:1,config:"报名费"}, //3.模拟赛
    4:{id:5,config:"考试管理费"}, //4.证书
    5:{id:1,config:"报名费"} //4.证书
}
window.AcciRef={
		copyExistsProperty:function(sourceInfo,targetObj){
			for(var key in sourceInfo){
				if(sourceInfo[key]){
					targetObj[key]=sourceInfo[key];
				}
			}
		}
}
/**
 * 异步加载js.
 * @type {{load: Function, array: Array, hasScript: Function, hasScriptArray: Function, hasScriptSp: Function, hasScriptArraySp: Function}}
 */
window.AcciLoadJs= {
    //加载JS
    load:function (url, callback, obj) { //异步加载js方式 (强写script标签)
        if(AcciLoadJs.hasScript(url)){ //如果已经加载成功 则不必再次加载.
            return;
        }
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.obj = obj;
        script.url=url;
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    AcciLoadJs.array.push(script.url);
                    if(callback) {
                        callback(script.obj);
                    }
                }
            };
        } else { //Others: Firefox, Safari, Chrome, and Opera
            script.onload = function () {
                AcciLoadJs.array.push(script.url);
                if(callback) {
                    callback(script.obj);
                }
            };
        }
        script.src = url;
        document.body.appendChild(script);

    },
    //用于存放成功加载的jsurl(完整路径)
    array:new Array(),
    //是否已经成功加载jsurl(完整路径)
    hasScript:function(url){
        for(var i=0;i<AcciLoadJs.array.length;i++){
            var src=AcciLoadJs.array[i];
            if(src==url){
                return true;
            }
        }
        return false;
    },
    //是否整个jsurl数组(完整路径)都已经加载完成.
    hasScriptArray:function(arr){
        for(var i=0;i<arr.length;i++){
            if(!hasScript(arr[i])){
                return false;
            }
        }
        return true;
    },
    //是否已经成功加载jsurl(简单路径)
    hasScriptSp:function(url){
        for(var i=0;i<AcciLoadJs.array.length;i++){
            var src=AcciLoadJs.array[i];
            if(src.indexOf(url)>-1){
                return true;
            }
        }
        return false;
    },
    //是否整个jsurl数组(简单路径)都已经加载完成.
    hasScriptArraySp:function(arr){
        for(var i=0;i<arr.length;i++){
            if(!hasScriptSp(arr[i])){
                return false;
            }
        }
        return true;
    }
};

