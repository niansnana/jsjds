/* 
 * @fileoverview 常用基础方法.
 * @author Acci(Chunsun Qin)
 */

var FormUtil={
    /**
     * 返回form表单的所有值，并连接为json字符串.
     * (基于Jquery)
     * @param {type} formQuery form位置
     * @returns {Acci.formSerializeObj.con|String}
     */
//    formSerializeObj:function(formQuery){
//        var con =decodeURI($(formQuery).serialize());
//        con=con.replace(/&/g,'","').replace(/=/g,'":"');
//        con='{"'+con+'"}';
//        return con;
//    },
    formSerializeObj:function(formQuery,isNotJsonStr){
        //var con =decodeURI($(formQuery).serialize());
        //con=con.replace(/&/g,'","').replace(/=/g,'":"');
        //var contentIndex=con.indexOf('"content":');
        //if(contentIndex>-1){
        //    con=con.substring(0,contentIndex);
        //    con+='"content":'+JSON.stringify($("textarea[name='content']").text());
        //    con='{"'+con+'}';
        //}else{
        //    con='{"'+con+'"}';
        //}
        var con={};
        $(formQuery).find("input").not("[islist='true']").not(":checkbox").not(":radio").each(function(){
            if(!$(this)[0].disabled&&$(this).attr("name")){
                con[$(this).attr("name")]=$(this).val();
            }
        });
        $(formQuery).find("input").not(":checkbox").not(":radio").each(function(){
            if(!$(this)[0].disabled&&$(this).attr("name")&&$(this).attr("islist")){
                if(!con[$(this).attr("name")]){
                    con[$(this).attr("name")]=new Array();
                }
                con[$(this).attr("name")].push($(this).val());
            }
        });
        $(formQuery).find("select").each(function(){
            if(!$(this)[0].disabled&&$(this).attr("name")){
                con[$(this).attr("name")]=$(this).val();
            }
        });
        $(formQuery).find("input[type='radio']:checked").each(function(){
            if(!$(this)[0].disabled&&$(this).attr("name")){
                con[$(this).attr("name")]=$(this).attr("value");
            }
        });
        $(formQuery).find("input[type='checkbox']:checked").each(function(){
            if(!$(this)[0].disabled&&$(this).attr("name")){
                con[$(this).attr("name")]=con[$(this).attr("name")]?(con[$(this).attr("name")]+","+$(this).attr("value")):$(this).attr("value");
            }
        });
        $(formQuery).find("textarea").each(function(){
            if(!$(this)[0].disabled&&$(this).attr("name")){
                con[$(this).attr("name")]=$(this).val();
            }
        });
        
        return isNotJsonStr?con:JSON.stringify(con);
    },
    /**
     * 提交表单.
     * @param {type} formQuery form位置
     * @param {type} url 要提交的URL
     * @param {type} funSuccess 成功后执行的方法
     * @param {type} funError 失败时执行的方法
     * @param {type} isJsonStr 是否转为JSON格式字符串,为true时不转换
     * @returns {undefined}
     */
    submitForm:function(formQuery,url,funSuccess,funError,isNotJsonStr){
        $.ajax({
                type: "POST",
                url: url,
                data: this.formSerializeObj(formQuery,isNotJsonStr),
                headers:isNotJsonStr?"":{'Content-Type': 'application/json'},
                success: function(res) {
                    if(res.succeed){
                        funSuccess(res);
                    }else{
                        funError(res);
                    }
                }
            });
    },
    comboBox:function(selModel, lidata, selectVal, idCol, nameCol,notClear){
        if(!selModel||!lidata){
            return;
        }
        if(!notClear)
            $(selModel).html("");
        if(!idCol) idCol="id";
        if(!nameCol) nameCol="name";
        
        for (var i=0; i< lidata.length; i++){
            var obj=lidata[i];
            var op=$('<option value="'+obj[idCol]+'">'+obj[nameCol]+'</option>');
            op.appendTo($(selModel));
        }
        if(selectVal) {
            $(selModel).val(selectVal);
        }
    },

    arrayComboBox:function(selModel, lidata, selectVal,notClear){
        if(!selModel||!lidata){
            return;
        }
        if(!notClear)
            $(selModel).html("");
        for (var i=0; i< lidata.length; i++){
            var obj=lidata[i];
            var op=$('<option value="'+obj+'">'+obj+'</option>');
            op.appendTo($(selModel));
        }
        if(selectVal) {
            $(selModel).val(selectVal);
        }
    },
    mapComboBox:function(selModel, map, selectVal,idCol, nameCol, notClear){
        if(!selModel||!map){
            return;
        }
        if(!notClear)
            $(selModel).html("");
        for(var key in map){
            var obj=map[key];
            var op=$('<option value="'+(idCol?obj[idCol]:key)+'">'+(nameCol?obj[nameCol]:obj)+'</option>');
            op.appendTo($(selModel));
        }
        if(selectVal) {
            $(selModel).val(selectVal);
        }
    },
    contentlenchange:function (idval,maxlen,idshow){
        
        $(idshow).text(maxlen-$(idval).val().length);
    },
    /**
     * 将对象转为URL形式,便于springMVC接受.
     *
     * @param data
     */
    Json2UrlParam:function(data,baseStr){
        if(!data){
            return "";
        }
        if(!baseStr){
            baseStr="";
        }
        var res="";
        var flag=(data instanceof Array);
        for(var key in data){
            if(data[key]==null)continue; //如果为空则忽略
            if(key[0]=="$") continue;//忽略angular自带属性,以免错误.
            var k=key;
            if(baseStr&&baseStr.length>0) {
                k=flag ? ("[" + key + "]") : ("." + key);
            }
            if(data[key] instanceof Object){
                res+=FormUtil.Json2UrlParam(data[key],baseStr+k )
            }else{
                res+="&"+baseStr+k+"="+data[key];
            }
        }
        return res;
    },
    /**
     * 根据所选ID返回所选对象集合.
     */
    findListBySelectedId:function(ids,li,idCol){
        if(!idCol){
            idCol="id";
        }
        if(!(ids instanceof Array)){
            ids=ids.split(",");
        }
        var newli=new Array();
        for(var i in li){
            for(var j in ids){
                if(li[i][idCol]==ids[j]){
                    newli.push(li[i]);
                }
            }
        }
        return newli;
    },
    /**
     * 给form设置值.
     * @param formSelector 选择器
     * @param data 值
     */
    setFormValues:function(formSelector,data){
        if(!data) return;
        //input,select
        $(formSelector).find("input[name],select[name]").each(function(i,ele){
            var name=$(ele).attr("name");
            if(!name) return;
            $(ele).val(data[name]||"");
        });
        //textarea
        $(formSelector).find("textarea[name]").each(function(i,ele){
            var name=$(ele).attr("name");
            if(!name) return;
            $(ele).html(data[name]||"");
            $(ele).val(data[name]||"");
        });
    }
};

//----对公用方法的一些修改
try {
    if (Validate) {
        if (!Validate.equals_to) {
            Validate.equals_to = function (ele) { //与相同
                var val = ele.val();
                if(!val) return false;
                var baseVal = $(ele.attr("equals_to")).val();
                return val == baseVal;
            }
        }
        if (!Validate.phone_or_email) {
            Validate.phone_or_email = function (ele) { //手机或邮箱
                return Validate.require(ele) && (Validate.email(ele) || Validate.phone(ele));
            }
        }
        if (!Validate.phone) {
            Validate.phone = function (ele) { //手机或邮箱
                return Validate.require(ele) &&  Validate.phone(ele);
            }
        }
        if (!Validate.password_reg) {
            Validate.password_reg = function (ele) { //手机或邮箱
                var myReg = /^[0-9A-Za-z]{6,16}$/;
                return myReg.test($(ele).val());
                //return Validate.require(ele) && (Validate.email(ele) || Validate.phone(ele));
            }
        }
        if (!Validate.is_imgcode) {
            Validate.is_imgcode = function (ele) { //验证码
                if (!Validate.require(ele)) return false;
                var val = ele.val();
                $ajax({
                    url: $URL_THIRDINTERFACE + "/api/action/directmail/checkvcode",
                    data: {vcode: val},
                    type: "POST",
                    success: function (res) {

                        if (res.resultCode === 0) {
                            return true;
                        }
                        return false;
                    }
                });

            }
        }

        //Validate.handlePass=function(flag,ele,msg){
        //    var msg_box = ele.next().size()>0 ? ele.next():$('<p class="err"></p>');
        //
        //    if(!ele.next().size()>0){
        //        msg_box.appendTo(ele.parent());
        //    }
        //    if(flag){
        //        msg_box.html('<span class="icon ok"></span>');
        //        ele.css("border-color","#c8d2d7");
        //        return true;
        //    }else{
        //        msg_box.html('<span class="icon"></span><span class="msg">'+msg+'</span>');
        //
        //        ele.css("border-color","#ff5600");
        //
        //        return false;
        //    }
        //}
    }
}catch(e){
    console.log(e);
}

var valiImg=null;
var valiSendCode=null;

var initValiImgCode=function($base){
    if(!$base) {
        $base = "";
    }
    //图片验证码自检测
    $($base+'input[vali="is_imgcode"]').blur(function(){
        var ele=$(this);
        valiImg=ele;
        if (!Validate.require(ele)) {
            Validate.handlePass(false,ele,"请输入图片验证码");
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
                    Validate.handlePass(true,valiImg);
                    return;
                }
                valiImg.attr("pass","false");
                Validate.handlePass(false,valiImg,"验证码错误");
            }
        });
    });
}
var initValiSendCode=function($base){
    if(!$base) {
        $base = "";
    }
//短信验证码自检测
    $($base+'input[vali="is_sendcode"]').blur(function(){
        var ele=$(this);
        valiSendCode=ele;
        if (!Validate.require(ele)) {
            Validate.handlePass(false,ele,"请输入您收到的验证码");
            return;
        }

        var val = ele.val();
        if($("#emailOrPhone").val()){
            $ajax({
                url:$URL_ACCOUNT + "/api/action/account/iscode",
                data:{code:val,login:$("#emailOrPhone").val()},
                type:"POST",
                success:function(res){
                    if(res.resultCode===0){
                        valiSendCode.attr("pass","true");
                        Validate.handlePass(true,valiSendCode);
                        return;
                    }
                    valiSendCode.attr("pass","false");
                    Validate.handlePass(false,valiSendCode,"验证码错误");
                }
            });
        }

    });
}
$(function(){
    initValiImgCode();
    initValiSendCode();
});