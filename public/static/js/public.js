//发送手机验证码
var wait = 60;
function sendCode(obj) {	
    var phone = $("#phone").val();
    if (phone == "") {
        showAlert("请输入手机号");
        $("#phone").focus();
        return false;
    } else {
    	$("#toast").show();
		setTimeout(function () {
	      $("#toast").hide();
	    }, 2000);
        //发送短信
        time(obj);
        
    }
   
}
//倒计时
function time(obj) {
    if (wait == 0) {
        $(obj).text("获取验证码");
        $(obj).prop("disabled",false); 
        wait = 60;
        return;
    } else {    	
        $(obj).attr("disabled",true); 
        $(obj).text("" + wait + "s");
        wait--;
        setTimeout(function () {
            time(obj)
        }, 1000);
    }
}
function subForm(){
	var $username = $("#username");
	if(!$username.val()){
		showAlert('请输入微信号');		
		return false;
	}
	var $phone = $('#phone');
	if(!$phone.val()){
		showAlert('请输入手机号');		
		return false;
	}else if(!/^1[34578]\d{9}$/.test($phone.val())){
		showAlert('手机号格式不正确');		
		return false;
	}	
	var imgCode = $("#imgCode")
	if(!imgCode.val()){
		showAlert('请输入图片验证码');		
		return false;
	}
	var $yzmcode = $("#yzmCode");
	if(!$yzmcode.val()){
		showAlert('请输入短信验证码');		
		return false;
	}	
	$('form').submit()
}
/* 警示窗：1->成功 ，0->失败*/
function showAlert(msg) {
    var $alert = $('<div class="globalAlert"><span>' + msg + '</span></div>');
    $alert.appendTo("body");

    $alert.width($alert.find("span").width() + 120);
    setTimeout(function () {
        $alert.hide(function () {
            $alert.remove();
        });
    }, 3000);
}

/*显示弹框*/
function showDialog(){
	$(".dialog").show();
}
/*关闭弹框*/
function closeDialog(){
	$(".dialog").hide();
}
$(function(){
	
	$("#username").keyup(function(){
		if($(this).val().length>0){
			$(this).closest(".group").find(".icon-clear").css('visibility','visible');
		}
	})
	
	$(".icon-clear").click(function(){
		$(this).closest(".group").find("input").val('');
		$(".icon-clear").css('visibility','hidden');
	});
	
})
