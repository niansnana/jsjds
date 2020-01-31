// 项目中使用的一些常用方法/组件等
/*
选择学校
 <div class="list relative">
 <span class="list-t">ѧ&emsp;&emsp;У</span>
 <input type="text"  id="univName" placeholder="ѧУ" autocomplete="off" data-rule="require:������ѧУ����" name="educationList[0].univName" onkeyup="getSuggestList(this,event)" val_to="#univCode" name_eq="#univNameEq" />
 <input id="univCode" type="hidden" name="educationList[0].univCode"  data-rule="require:���������б���ѡ��ѧУ" />
 <input id="univNameEq" type="hidden" name="educationList[0].univCode" data-rule = "equals_to:���������б���ѡ��ѧУ" equals_to="#univName" />
 <div class="msg-box"></div>
 <div class="suggest-list" style="z-index: 999;" ></div>
 </div>
*/
var collegeTime=null;
var univNameIndex = -1;
function getSuggestList(obj,e){
    console.log(e.keyCode);
    if(e && (e.keyCode==38 || e.keyCode==40) ) { // 键入上下选择
        var _this = $(obj);
        var val = $.trim(_this.val());
        var _suggest = _this.closest(".list").find(".suggest-list");
        e.preventDefault();//阻值页面滚动
        var liSize=_suggest.find('li').length;
        if( e.keyCode==38 ){
            if(univNameIndex > 0){
                univNameIndex--;
            }
        }else{
            if(univNameIndex+1 < liSize){
                univNameIndex ++;
            }
        }
        var selectedli=_suggest.find('li').eq(univNameIndex);
        if(selectedli) {
            _suggest.find('li').not(selectedli).removeClass("hover");
            selectedli.addClass('hover');
            _this.val(selectedli.text());
            var valTo = _this.attr("val_to");
            valTo = valTo || "#univCode";
            var name_eq = _this.attr("name_eq");
            name_eq = name_eq || "#univNameEq";
            $(valTo).val(selectedli.attr("value"));
            $(name_eq).val(selectedli.text());
            //选中
            try{
                Validate.handlePass(true,_this);
            }catch(e){

            }
        }
        return;
    }
    if(e && e.keyCode==13){ //回车
        e.preventDefault();
        e.stopPropagation();
        var _this = $(obj);
        var val = $.trim(_this.val());
        var _suggest = _this.closest(".list").find(".suggest-list");
        if('block' == _suggest.css('display')){
            if(_suggest.find("li.hover").length==0){
                univNameIndex=0;
            }

            var selectedli=_suggest.find('li').eq(univNameIndex);
            if(selectedli) {
                _suggest.find('li').not(selectedli).removeClass("hover");
                selectedli.addClass('hover');
                _this.val(selectedli.text());
                var valTo = _this.attr("val_to");
                valTo = valTo || "#univCode";
                var name_eq = _this.attr("name_eq");
                name_eq = name_eq || "#univNameEq";
                $(valTo).val(selectedli.attr("value"));
                $(name_eq).val(selectedli.text());
                if(_this.attr("enter_btn")){
                    $(_this.attr("enter_btn")).trigger("click");
                }
                //选中
                try {
                    Validate.handlePass(true, _this);
                }catch(e){

                }
                _suggest.hide();

            }
        }//-- a
        return false;
    }

    if(collegeTime){
        clearTimeout(collegeTime);
        collegeTime=null;
    }
    collegeTime=setTimeout(function(){ getSuggestListTime(obj,e)},200);
}


function getSuggestListTime(obj,e){
    var _this = $(obj);
    var val = $.trim(_this.val());
    var _suggest = _this.closest(".list").find(".suggest-list");


    if(val.length == 0){
        _suggest.hide();
        univNameIndex=-1;
        if(_this.is(".cannone")){
            _this.siblings("input").val("");
        }
        return false;
    }else{

        var list = '<ul>'
        $.ajax({
            type:"POST",
            //async: false, //不知道为什么,这个参数不能跨域执行
            url:$URL_THIRDINTERFACE+"/api/universities/findAll",
            data:{length:5,name:val},
            //xhrFields:{withCredentials: true},
            success:function(res){
                if(res.resultCode===0){
                    var li=res.resultData.li;
                    var obj;
                    for(var i=0;i<li.length;i++){
                        obj=li[i];
                        list += '<li value="'+obj.univCode+'">'+obj.univName+'</li>';
                    }
                    list += '</ul>'
                    _suggest.html(list);
                    _suggest.show();
                    _suggest.find("li").click(function(){
                        _this.val($(this).text());
                        var valTo=_this.attr("val_to");
                        valTo=valTo||"#univCode";
                        var name_eq=_this.attr("name_eq");
                        name_eq=name_eq||"#univNameEq";
                        $(valTo).val($(this).attr("value"));

                        $(name_eq).val($(this).text());
                        //选中
                        try {
                            Validate.handlePass(true, _this);
                        }catch(e){

                        }
                        _suggest.hide();

                    });
                }
            }
        });

        //list += '<li>'+val+'��ѧ</li><li>'+val+'��ѧ</li><li>'+val+'��ѧ</li><li>'+val+'��ѧ</li>'
        //list += '</ul>'
        //_suggest.html(list);
        //_suggest.show();



    }
}




//ѧ��
/*
 ʾ��
 <select collegetypeli></select>
 */
function initDropDownCollegeType(){
    if($("select[collegetypeli]").length>0) {
        $ajax({
            url: $URL_ACCOUNT + "/api/dict/college/type/li",
            type: "POST",
            success: function (res) {
                if (res.resultCode == 0) {
                    $("select[collegetypeli]").each(function () {
                        FormUtil.comboBox($(this), res.resultData, "", "collegeTypeId", "collegeType",true);
                    });
                    //try {
                    //    $("select[collegetypeli]").easyDropDown({
                    //        cutOff: 10
                    //    });
                    //} catch (e) {
                    //    console.log(e)
                    //}
                }
            }
        });

    }
}



function initAllUnit(){
    initDropDownCollegeType();
    initCropBoxBtn();
}
$(function(){
    initAllUnit();

    //$("select").easyDropDown({
    //    cutOff:10
    //});
});



/**
 * 处理大学名称.
 * 显示处一率在原名称上添加Str.
 * 以下几个方向雷同.
 */
function showUniversitieName($scope,value,key){
    $ajax({url:$URL_THIRDINTERFACE+"/api/universities/find/"+value,success:function(res){
        if(res.resultCode===0){
            setSubValue($scope,key+"Str",res.resultData.univName); //给子项设置值
            try {
                $scope.$apply();
            }catch(e){
                console.log(e);
            }
        }
    }});
}
//性别码
var identitySex=["","男","女"]
function showIdentitySex($scope,value,key){
	var val=identitySex[value]||"";
	setSubValue($scope,key+"Str",val); //给子项设置值
    try {
        $scope.$apply();
    }catch(e){
        console.log(e);
    }
}
//证件类型
var identityCertificateTypes=["","身份证","护照","港澳台通行证","军官证","学生证"];
function showIdentityCertificateType($scope,value,key){
    var val=identityCertificateTypes[value]||"";
    setSubValue($scope,key+"Str",val); //给子项设置值
    try {
        $scope.$apply();
    }catch(e){
        console.log(e);
    }
}
//学校级别
var educationTypeIds=["","博士","硕士","重点本科","普通本科","高职高专"];
function showEducationType($scope,value,key){
    var val=educationTypeIds[value]||"";
    setSubValue($scope,key+"Str",val); //给子项设置值
    try {
        $scope.$apply();
    }catch(e){
        console.log(e);
    }
}
var collegeTypeIds=["","重点本科","普通本科","高职高专"];
function showCollegeTypeId($scope,value,key){
    var val=collegeTypeIds[value]||"";
    setSubValue($scope,key+"Str",val); //给子项设置值
    try {
        $scope.$apply();
    }catch(e){
        console.log(e);
    }
}

//订单状态
var orderStatus=["已支付","未支付","已提交至第三方支付平台","待审核","审核失败","超时关闭","已退款"];
function showOrderStatus($scope,value,key){
    var val=orderStatus[value]||"";
    setSubValue($scope,key+"Str",val); //给子项设置值
    return val;
    //$scope.$apply();
}

//时间更改(由times改为正常格式显示)
//format 默认为 'Y-m-d H:i:s'
//此方法必须引用 h5.time.js
function showTimeStr(value,format){
    if(!format){
        format='Y-m-d H:i:s';
    }
    if(!value){
        return "";
    }
    return h5.time.date(format,value);
}


//给子项设置值
function setSubValue(baseValue,key,value){
    if(key.indexOf(".")<0){
        baseValue[key]=value;
        return;
    }
    var arry=key.split(".");
    var resVal=baseValue;
    for(var i=0;i<arry.length-1;i++){
        resVal=resVal[arry[i]];
    }
    resVal[arry[arry.length-1]]=value;
}

function showDialog($obj){
    $($obj).fadeIn();
}

//--------------------
//裁剪图片插件
function showCropBox(dialogId,title,callBack,width,height){
    if($("#"+dialogId).length>0){
        showDialog("#"+dialogId);
        return;
    }
    var dia=$('<div class="dialog img_upload_dialog" id="'+dialogId+'" style="display: none">'
        +'<div class="content" style="width:600px;margin-left:-300px">'
        +'<img class="close" src="'+$STATIC_URL+'/dasai/images/icon/icon-close.png" onclick=closeCropDialog("#'+dialogId+'")>'
        +'<p class="title">'+title+'</p>'
        +'<iframe id="'+dialogId+'frame" name="'+dialogId+'frame" width="600" height="475" frameborder="0" src="/pages/dasai/common/cropbox.html?okfn='+callBack+(width?'&width='+width:"")+(height?'&height='+height:"")+'" style="padding:0"></iframe>'
        +'</div>'
        +'</div>');
    dia.appendTo($("body"));
    showDialog(dia);
}
function closeCropDialog(selector){
    closeDialog(selector);
    var iframeName=$(selector+" iframe").attr("name");
   // document.frames(iframeName).location.reload(true);
    $(selector+'frame')[0].contentWindow.location.reload(true);//取消则重置,别问我为什么需要这种
}
//初始化裁剪插件
function initCropBoxBtn(basediv){
    if(!basediv){
        basediv="";
    }
    $(basediv+" input[showcropbox]").each(function(){
        var $this=$(this);
        var width=$(this).attr("width");
        var height=$(this).attr("height");
        var id=$(this).attr("id");
        var name=$(this).attr("name");
        var title=$(this).attr("title");
        var dialogId=id?(id+"CropDialog"):(name+"CropDialog");
        var callback=id?(id+"ChangeCallback"):(name+"ChangeCallback");
        var callbackCustomer=$(this).attr("onImgChange");
        $this.siblings(".file-selecter").click(function(){
            showCropBox(dialogId,title,callback,width,height);
        });
        window[callback]=function(img){
            var showImg= $this.siblings("img");
            showImg.attr("src",img);
            imgToUploadFile(showImg,$this,callbackCustomer);
            $(".img_upload_dialog").hide();
        }
    });
}
//---------------------------------
/**
 * 将内部元素直接添加到body下,该方法会直接原来在body下元素,请注意使用
 * @param selector 选择器
 */
function clearNAppendToBody(selector){
    $("body>"+$(selector).selector).remove();
    $(selector).appendTo($("body"));
}





