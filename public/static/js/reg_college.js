$(function(){

    ajaxForm($("#collegeeditform"),function(res) {
        console.log(res);
        if(res.resultCode===0) {//注册成功
            location = "/pages/account/reg_college_result.html";
        }else if(res.resultMsg){
            showAlert(0,res.resultMsg);
        }
    }, "/api/action/audit/sumbitUniversityInfor",function(){
        if(!$("#system").val()){
            Validate.handlePass(false,$("#system"),"请选择学校性质");
            return false;
        }
    });
});


Validate.handlePass=function(flag,ele,msg){


    var msg_box;
    if($(ele).is("[name_eq]")){
        msg_box=$(ele).parent().find(".msg-box");
        if(msg_box.length==0){
            msg_box=$('<div class="msg-box"></div>');
            msg_box.appendTo($(ele).parent());
        }
    }else {
        msg_box = ele.next().size() > 0 ? ele.next() : $('<div class="msg-box"></div>');
        if (!ele.next().size() > 0) {
            msg_box.appendTo(ele.parent());
        }
    }
    if(flag){
        msg_box.html('<span class="icon ok"></span>');
        ele.removeClass("err-border");
        ele.css("border-color","#c8d2d7");

        return true;
    }else{
        msg_box.html('<span class="icon"></span><span class="msg">'+msg+'</span>');

        ele.addClass("err-border");

        return false;
    }

}


$(function(){
    $("#system").blur(function(){
        if(!$(this).val()){
            Validate.handlePass(false,$(this),"请选择学校性质");
        }else{
            Validate.handlePass(true,$(this));
        }
    });

    $("input:text,input:password").val("");
    $("textarea").text("");

});

