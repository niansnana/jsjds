var $activeTimeInput;
function closeLayDateBox(){
	//console.log('exce')
    if($activeTimeInput.val().length == 0){
		$activeTimeInput.css("border-color","#ff5600");
        if($activeTimeInput.next().size() == 0){
            $('<div class="msg-box"><span class="icon"></span><span class="msg">' +$activeTimeInput.data('rule').substr(8,7)+'</span></div>').appendTo($activeTimeInput.parent())
        }else{
            $activeTimeInput.next().html('<span class="icon"></span><span class="msg">' +$activeTimeInput.data('rule').substr(8,7)+'</span>');
        }
    }
}

//获取前后时间
function getDateStr(datas,addDayCount) {
	var dd = new Date(datas);
	dd.setDate(dd.getDate()+addDayCount);//获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = dd.getMonth()+1;
	var d = dd.getDate();
	return y+"-"+m+"-"+d;
} 

function setTime(obj,datas){
    if( $(obj).next().size()==0 ){
        $('<div class="msg-box"></div>').appendTo($(obj).parent())
    }
    $(obj).next().html('<span class="icon ok"></span>');
    $(obj).css("border-color","#c8d2d7");
    //$(obj).val(datas.substring(0,7));
}
var bir_time1 = {
    elem: '#bir_time1',
    format: 'YYYY-MM-DD',
    event: 'focus',
    min: '1970-01-01 23:59:59',
    max: laydate.now(),
    istoday: false,
    choose: function(datas){
        setTime(this.elem,datas);
        Validate.handlePass(true,$("##bir_time1"));
    }
};
var bir_time2 = {
    elem: '#bir_time2',
    format: 'YYYY-MM-DD',
    event: 'focus',
    min: '1970-01-01 23:59:59',
    max: laydate.now(),
    istoday: false,
    choose: function(datas){
        setTime(this.elem,datas);
        Validate.handlePass(true,$("##bir_time2"));
    }
};

var s_time = {
    elem: '#s_time',
    format: 'YYYY-MM-DD',
    event: 'focus',
    min: '1970-01-01 23:59:59',
    max: laydate.now(),
    istoday: false,
    choose: function(datas){
        setTime(this.elem,datas);
        e_time.min = getDateStr(datas,+1); 
        e_time.start = getDateStr(datas,+1); 
    }
};
var e_time = {
    elem: '#e_time',
    format: 'YYYY-MM-DD',
    event: 'focus',
    min: '1970-01-01 23:59:59',
    istoday: false,
    choose: function(datas){
        setTime(this.elem,datas);
        s_time.max = getDateStr(datas,-1);
    }
};
var s_time1 = {
    elem: '#s_time1',
    format: 'YYYY-MM-DD',
    event: 'focus',
    min: '1970-01-01 23:59:59',
    max: laydate.now(),
    istoday: false,
    choose: function(datas){
        setTime(this.elem,datas);
        e_time1.min = getDateStr(datas,+1); 
        e_time1.start = getDateStr(datas,+1); 
    }
};
var e_time1 = {
    elem: '#e_time1',
    format: 'YYYY-MM-DD',
    event: 'focus',
    min: '1970-01-01 23:59:59',
    istoday: false,
    choose: function(datas){
        setTime(this.elem,datas);
        s_time1.max = getDateStr(datas,-1); 
    }
};
var s_time2 = {
    elem: '#s_time2',
    format: 'YYYY-MM-DD',
    event: 'focus',
    min: '1970-01-01 23:59:59',
    max: laydate.now(),
    istoday: false,
    choose: function(datas){
        setTime(this.elem,datas);
        e_time2.min = getDateStr(datas,+1);
        e_time2.start = getDateStr(datas,+1);
    }
};
var e_time2 = {
    elem: '#e_time2',
    format: 'YYYY-MM-DD',
    event: 'focus',
    min: '1970-01-01 23:59:59',
    istoday: false,
    choose: function(datas){
        setTime(this.elem,datas);
        s_time2.max = getDateStr(datas,-1); 
    }
};
var s_time3 = {
    elem: '#s_time3',
    format: 'YYYY-MM-DD',
    event: 'focus',
    min: '1970-01-01 23:59:59',
    max: laydate.now(),
    istoday: false,
    choose: function(datas){
        setTime(this.elem,datas);
        e_time3.min = getDateStr(datas,+1); 
        e_time3.start = getDateStr(datas,+1); 
    }
};
var e_time3 = {
    elem: '#e_time3',
    format: 'YYYY-MM-DD',
    event: 'focus',
    min: '1970-01-01 23:59:59',
    istoday: false,
    choose: function(datas){
        setTime(this.elem,datas);
        s_time3.max = getDateStr(datas,-1); 
    }
};
var s_time4 = {
    elem: '#s_time4',
    format: 'YYYY-MM-DD',
    event: 'focus',
    min: '1970-01-01 23:59:59',
    max: laydate.now(),
    istoday: false,
    choose: function(datas){
        setTime(this.elem,datas);
        e_time4.min = getDateStr(datas,+1); 
        e_time4.start = getDateStr(datas,+1);
    }
};
var e_time4 = {
    elem: '#e_time4',
    format: 'YYYY-MM-DD',
    event: 'focus',
    min: '1970-01-01 23:59:59',
    istoday: false,
    choose: function(datas){
        setTime(this.elem,datas);
        s_time4.max = getDateStr(datas,-1); 
    }
};




//显示对应状态的div
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
            console.log(res);
            if(res.resultCode===0){

                //看看是不是有未通过的情况.
                var auth=res.resultData;
                var authStatus=auth.authStatusId;
                if(authStatus==1){//保存未提交,则跳转到招聘页面 added by Acci 2018-09-12
                    location="/pages/dasai/personal_auth/rec_info.html";
                }

                if(authStatus!=5) { //看看是否还有其它未通过的项.
                    if (auth.educationList && auth.educationList.length > 0) {
                        for (var i in auth.educationList) {
                            if (auth.educationList[i].authStatusId == 5) {
                                authStatus = 5;
                                break;
                            } else if (auth.educationList[i].authStatusId == 2) {
                                authStatus = 2;
                                break;
                            }
                        }
                    }
                }
                //------
                if(authStatus==2||authStatus==4||authStatus==5) { //审核中或已通过或未通过
                    var $scope = $("#authdiv"+res.resultData.authStatusId).scope();
                    $scope.auth = res.resultData;
                    //修改常用信息
                    $scope.auth.identityPhotoStr=$URL_THIRDINTERFACE+"/api/action/oss/getImageStream/"+$scope.auth.identityPhoto;
                    $scope.auth.identityCertificateFrontImageStr=$URL_THIRDINTERFACE+"/api/action/oss/getImageStream/"+$scope.auth.identityCertificateFrontImage;
                    $scope.auth.identityCertificateBackImageStr=$URL_THIRDINTERFACE+"/api/action/oss/getImageStream/"+String($scope.auth.identityCertificateBackImage);
                    if($scope.auth.identityBirthday) {
                        //不知道为毛js的要少一天~~~
                        $scope.auth.identityBirthday = $scope.auth.identityBirthday;
                            //+ 3600000;
                    }
                    $scope.auth.identityBirthdayStr=showTimeStr($scope.auth.identityBirthday,'Y-m-d');
                    $("input[name='identityBirthday']").val($scope.auth.identityBirthdayStr);
                    if($scope.auth.educationList) {
                        for (var i = 0; i < $scope.auth.educationList.length; i++) {
                            $scope.auth.educationList[i].educationImageStr=$URL_THIRDINTERFACE+"/api/action/oss/getImageStream/"+$scope.auth.educationList[i].educationImage;
                            showUniversitieName($scope,$scope.auth.educationList[i].univCode,"auth.educationList."+i+".univCode");
                            showEducationType($scope,$scope.auth.educationList[i].educationTypeId,"auth.educationList."+i+".educationTypeId");
                            $scope.auth.educationList[i].educationEndDateStr2=showTimeStr($scope.auth.educationList[i].educationEndDate,'Y-m-d');
                            $scope.auth.educationList[i].educationStartDateStr2=showTimeStr($scope.auth.educationList[i].educationStartDate,'Y-m-d');
                            $scope.auth.educationList[i].educationEndDateStr=showTimeStr($scope.auth.educationList[i].educationEndDate,'Y-m-d');
                            $scope.auth.educationList[i].educationStartDateStr=showTimeStr($scope.auth.educationList[i].educationStartDate,'Y-m-d');

                        }
                    }
                    $scope.showbutton=function(){
                    	$scope.myemail=true;
                    		$ajax({
                                url:"/api/action/audit/getemailandphone",
                                type:"POST",
                                success:function(res){
                                	console.log(res);
                                	$("#identityEmail").val(res.resultData.accountEmail);
                                }
                        	})
                   
                    }
                    showIdentityCertificateType($scope,$scope.auth.identityCertificateType,"auth.identityCertificateType");
                    $scope.$apply();

                    if(authStatus==5){

                        var authRecordList=auth.authRecordList;
                        //认证不通过
                        //个人认证
                        if(auth.authStatusId==5){

                        }else  if(auth.authStatusId==4){ //通过
                            //$("#myidentityedit").remove();
                            //$("#myidentityshow").show();
                            $("#myidentityedit").find("input,select").each(function(){
                                $(this)[0].disabled=true;
                                $(this).css("background-color","rgb(235,235,228)");
                            });
                            $("#myidentityedit").find(".file-selecter").remove();
                        }
                        //教育经历
                        var ieduUnpassed=0;//未通过的教育经历

                        for(var i in auth.educationList){

                            if(auth.educationList[i].authStatusId==4){//通过

                                // $("#unpassedu"+auth.educationList[i].educationAuthId).remove();
                                $("#unpassedu"+auth.educationList[i].educationAuthId).find("input,select").each(function(){
                                    $(this)[0].disabled=true;
                                    $(this).css("background-color","rgb(235,235,228)");
                                });
                                $("#unpassedu"+auth.educationList[i].educationAuthId).find(".file-selecter").remove();
                            }else if(auth.educationList[i].authStatusId==5){//未通过

                                // $("#passededu"+auth.educationList[i].educationAuthId).remove();
                                //重置时间选择控件.
                                var stime = {
                                    elem: '#educationStartDate'+auth.educationList[i].educationAuthId,
                                    format: 'YYYY-MM-DD',
                                    event: 'focus',
                                    min: '1970-01-01 23:59:59',
                                    max: laydate.now(),
                                    istoday: false,
                                    choose: function(datas){
                                        $(this.elem).css("border-color","#c8d2d7");
                                        $(this.elem).next().html('<span class="icon ok"></span>');
                                        $(this.elem).val(datas);//);��δ����
                                        e_time.min = getDateStr(datas,+1); //��ʼ��ѡ�ú����ý����յ���с����
                                        e_time.start = getDateStr(datas,+1); //�������յĳ�ʼֵ�趨ϊ��ʼ��
                                        Validate.handlePass(true,$(this.elem));
                                    }
                                };
                                var etime = {
                                    elem: '#educationEndDate'+auth.educationList[i].educationAuthId,
                                    format: 'YYYY-MM-DD',
                                    event: 'focus',
                                    min: '1970-01-01 23:59:59',
                                    istoday: false,
                                    choose: function(datas){
                                        $(this.elem).css("border-color","#c8d2d7");
                                        $(this.elem).next().html('<span class="icon ok"></span>');
                                        setTime(this.elem,datas);
                                        s_time.max = getDateStr(datas,-1); //������ѡ�ú����ÿ�ʼ�յ��������
                                        Validate.handlePass(true,$(this.elem));
                                    }
                                };


                                //var s_time1 = {
                                //    elem: '#s_time1',
                                //    format: 'YYYY-MM-DD',
                                //    event: 'focus',
                                //    min: '1970-01-01 23:59:59',
                                //    max: laydate.now(),
                                //    istoday: false,
                                //    choose: function(datas){
                                //        setTime(this.elem,datas);
                                //        e_time1.min = getDateStr(datas,+1);
                                //        e_time1.start = getDateStr(datas,+1);
                                //    }
                                //};
                                //var e_time1 = {
                                //    elem: '#e_time1',
                                //    format: 'YYYY-MM-DD',
                                //    event: 'focus',
                                //    min: '1970-01-01 23:59:59',
                                //    istoday: false,
                                //    choose: function(datas){
                                //        setTime(this.elem,datas);
                                //        s_time1.max = getDateStr(datas,-1);
                                //    }
                                //};
                                laydate(stime);
                                laydate(etime);




                                //处理list的name


                                $("#unpassedu"+auth.educationList[i].educationAuthId).find("input,select").each(function(){
                                    var thisName= $(this).attr("name");
                                    if(thisName&&thisName.indexOf("educationList[0]")>-1){
                                        $(this).attr("name",thisName.replace("educationList[0]","educationList["+ieduUnpassed+"]"));
                                    }
                                });
                                ieduUnpassed++;
                            }
                        }
                        if(authRecordList&&authRecordList.length>0){
                            //渲染错误信息
                            for(var i in authRecordList){

                                //个人认证的错误
                                if(authRecordList[i].recordTable=="account_personal_identity_auth"){
                                    showErrorMsgAfterIdentity(authRecordList[i].recordColumn,authRecordList[i].recordComment);
                                }
                                //教育经历的错误
                                if(authRecordList[i].recordTable=="account_personal_education_auth"){
                                    showErrorMsgAfterEduAuth(authRecordList[i].recordPrimaryKey,authRecordList[i].recordColumn,authRecordList[i].recordComment);

                                }
                            }



                        }


                        //if(iedupassed==auth.educationList.length){ //全部通过
                        //    $("#passededuli").show();
                        //    $("#unpasseduli").remove();
                        //}else if(iedupassed==0){ //全部通过
                        //    $("#passededuli").remove();
                        //    $("#unpasseduli").show();
                        //}

                        //对废掉的表单重置
                       // setTimeout(function(){
                            initCropBoxBtn("#unpasseduli");
                        //},2000);

                        initFormRule();


                        $(".edudates,select").change(function(){
                            Validate.handlePass(true,$(this));
                        });
                        $("input:radio").click(function(){
                            $(this).parents(".list").find(".msg-box").text('');

                        });
                        ajaxForm($("#reauthForm"),function(res){
                            if(res.resultCode===0){
                                location.reload();
                            }
                        },"/api/action/audit/reauth/personal",function(){
                                var flag=true;
                                if($("input:visible.err-border,textarea:visible.err-border").length > 0){
                                    flag=false;
                                }
                                $(":radio[name='identitySex']").removeClass("err-border"); //点击一次之后取消所有错误提示 (不知道为什么会有这种奇怪的要求)
                                $(":radio[name='identitySex']").parent().siblings(".msg-box").remove();
                                
                                resetEduIndex();
                                var vflag=true;
                                //学校选择验证
                                $.each($(".edu_block:visible input,.edu_block:visible select"),function(i,ele){
                                    if($(ele).attr("xname")){
                                        $(ele).attr("name",$(ele).attr("xname"));
                                    }
                                    if($(ele).attr("xdata-rule")){
                                        $(ele).attr("data-rule",$(ele).attr("xdata-rule"));
                                    }
                                });
                                $.each($(".edu_block:hidden input,.edu_block:hidden select"),function(i,ele){
                                    if($(ele).attr("name")){
                                        $(ele).attr("xname",$(ele).attr("name"));
                                        $(ele).removeAttr("name");
                                    }
                                    if($(ele).attr("data-rule")){
                                        $(ele).attr("xdata-rule",$(ele).attr("data-rule"));
                                        $(ele).removeAttr("data-rule");
                                    }
                                });
                                $.each($(".select.edutype:visible"),function(i,ele){
                                    if(!$(ele).val()){
                                        Validate.handlePass(false,$(ele),"请选择学历");
                                        vflag=false;
                                    }
                                });
//                                $.each($(".select.edutype:visible"),function(i,ele){
//                                    if(!$(ele).val()){
//                                        Validate.handlePass(false,$(ele),"请选择学历");
//                                    }
//                                });
                                $.each($("#s_time1,#s_time2,#s_time3,#s_time4").filter(":visible"),function(i,ele){
                                    if($(ele).val().length<8&&$(ele).val().length>2){
                                        $(ele).val($(ele).val()+"-01");
                                    }
                                });
                                $.each($("#e_time1,#e_time2,#e_time3,#e_time4").filter(":visible"),function(i,ele){
                                    if($(ele).val().length<8&&$(ele).val().length>2){
                                        $(ele).val($(ele).val()+"-01");
                                    }
                                });

                                return flag && vflag;
                            }
                        );

                    }
                    if(authStatus==5){ //未通过审核时间可增加教育经历
                    	 //---添加教育经历处理--
                    	
                        $("button.more_edu").insertBefore($("#a5Line"));

                        $("#edu_container").appendTo($("#auth5addedus"));

                       // $("#edul .line:last").insertAfter($("button.more_edu"));
                        
                    }
                    if(authStatus==4) { //已通过审核
                        //---添加教育经历处理--
                    	/** 通过审核之后将不能再增加教育经历
                        $("button.more_edu").insertBefore($("#addEdusbtn"));

                        $("#edu_container").appendTo($("#auth4addedus"));

                        $("#edul .line:last").insertAfter($("button.more_edu"));
                        */
                        //$("#edulist .line:last").insertAfter($("button.more_edu"));


                        //样式调整
                        $("#auth4addedus").css("min-height", 0);
                        $("button.more_edu").css("margin-bottom", "20px");
                        eduBlockStartIndex = 0;//添加教育经历索引置0
                        ajaxForm($("#addedusform"),function(res){
                            console.log(res);
                            if(res.resultCode===0){ //����ɹ�
                                location.reload();
                            }else if(res.resultMsg){
                                showAlert(0,res.resultMsg)
                            }
                        },"/api/action/audit/reauth/addedus",function(){
                            resetEduIndex();
                            var vflag=true;
                            //学校选择验证
                            $.each($(".edu_block:visible input,.edu_block:visible select"),function(i,ele){
                                if($(ele).attr("xname")){
                                    $(ele).attr("name",$(ele).attr("xname"));
                                }
                                if($(ele).attr("xdata-rule")){
                                    $(ele).attr("data-rule",$(ele).attr("xdata-rule"));
                                }
                            });
                            $.each($(".edu_block:hidden input,.edu_block:hidden select"),function(i,ele){
                                if($(ele).attr("name")){
                                    $(ele).attr("xname",$(ele).attr("name"));
                                    $(ele).removeAttr("name");
                                }
                                if($(ele).attr("data-rule")){
                                    $(ele).attr("xdata-rule",$(ele).attr("data-rule"));
                                    $(ele).removeAttr("data-rule");
                                }
                            });
                            $.each($(".select.edutype:visible"),function(i,ele){
                                if(!$(ele).val()){
                                    Validate.handlePass(false,$(ele),"请选择学历");
                                    vflag=false;
                                }
                            });
//                            $.each($(".select.edutype:visible"),function(i,ele){
//                                if(!$(ele).val()){
//                                    Validate.handlePass(false,$(ele),"请选择学历");
//                                }
//                            });
                            $.each($("#s_time1,#s_time2,#s_time3,#s_time4").filter(":visible"),function(i,ele){
                                if($(ele).val().length<8&&$(ele).val().length>2){
                                    $(ele).val($(ele).val()+"-01");
                                }
                            });
                            $.each($("#e_time1,#e_time2,#e_time3,#e_time4").filter(":visible"),function(i,ele){
                                if($(ele).val().length<8&&$(ele).val().length>2){
                                    $(ele).val($(ele).val()+"-01");
                                }
                            });

                            return vflag;
                        });

                    }

                    if(authStatus==2) {//已提交
                        $("#edul2 p.line:last").remove();

                    }
                    //------------------

                    showAuthdiv(authStatus); //显示对应状态的div


                }
            }else if(res.resultCode==130001){ //未认证过
                var $scope = $("#authdiv1").scope();
                $scope.auth={};
                showAuthdiv(1);
            }else{

            }

        }
    });
}

function selectNationAndProvice(){
	$.post($URL_ACCOUNT + "/api/action/audit/selectNationAndProvice",function(data){
		console.log(data)
		p=data.resultData.provices;
		n=data.resultData.nations
		for(i=0;i<p.length;i++){
			$("#identityOriginPlace").append("<option value='"+p[i].citiesProvinceName+"'>"+p[i].citiesProvinceName+"</option>")
		}
		for(j=0;j<n.length;j++){
			$("#identityNation").append("<option value='"+n[j].nation+"'>"+n[j].nation+"</option>")
		}
	})
}
function pcbind(){
	$("input[name='identityPoliticalStatus']").bind('click',function(){
		$("#pcmsg").html('')
	})
}

function removeSelectmsg(ele){
	if($(ele).val()){
		$(ele).parent(".list").find(".msg-box").html("")
		$(ele).removeClass("err-border")
	}
}

$(function(){
	pcbind()
	selectNationAndProvice();
    //laydate(s_time);
    //laydate(e_time)
    laydate(s_time1);
    laydate(e_time1);
    laydate(s_time2);
    laydate(e_time2);
    laydate(s_time3);
    laydate(e_time3);
    laydate(s_time4);
    laydate(e_time4);
    laydate(bir_time1);
    laydate(bir_time2);

	$('body').on("focus",'input.laydate-icon',function(){
        $activeTimeInput  = $(this);
    })
	ajaxForm($("#emailform"), function (res) {
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
    ajaxForm($("#authForm"),function(res){
        console.log(res);
        if(res.resultCode===0){ //����ɹ�
            location.reload();
        }else if(res.resultMsg){
            showAlert(0,res.resultMsg)
        }
    },"/api/action/audit/sumbitPersonalInfor",function(){
        var flag=true;
        if(!$("#identityNation").val()){
        	Validate.handlePass(false,$("#identityNation"),"请选择民族");
            flag=false;
        }
        if(!$("#identityOriginPlace").val()){
        	Validate.handlePass(false,$("#identityOriginPlace"),"请选择籍贯");
            flag=false;
        }
        if(!$("input[name='identityPoliticalStatus']:checked").val()){
        	$("#pcmsg").html('<span class="icon"></span><span class="msg">请选择政治面貌</span>')
        	 flag=false;
        }else{
        	$("#pcmsg").html('')
        }
        //学校选择验证
        $.each($(".edu_block:visible input,.edu_block:visible select"),function(i,ele){
            if($(ele).attr("xname")){
                $(ele).attr("name",$(ele).attr("xname"));
            }
            if($(ele).attr("xdata-rule")){
                $(ele).attr("data-rule",$(ele).attr("xdata-rule"));
            }
        });
        $.each($(".edu_block:hidden input,.edu_block:hidden select"),function(i,ele){
            if($(ele).attr("name")){
                $(ele).attr("xname",$(ele).attr("name"));
                $(ele).removeAttr("name");
            }
            if($(ele).attr("data-rule")){
                $(ele).attr("xdata-rule",$(ele).attr("data-rule"));
                $(ele).removeAttr("data-rule");
            }
        });
        $.each($("#s_time1,#s_time2,#s_time3,#s_time4").filter(":visible"),function(i,ele){
            if($(ele).val().length<8&&$(ele).val().length>2){
                $(ele).val($(ele).val()+"-01");
            }
        });
        $.each($("#e_time1,#e_time2,#e_time3,#e_time4").filter(":visible"),function(i,ele){
            if($(ele).val().length<8&&$(ele).val().length>2){
                $(ele).val($(ele).val()+"-01");
            }
        });
        $.each($(".edutype:visible"),function(i,ele){
            if(!$(ele).val()){
                Validate.handlePass(false,$(ele),"请选择学历");
                flag=false;
            }
        });
        if($("input:visible.err-border,textarea:visible.err-border").length > 0){
            flag=false;
        }
        return flag;
    });
    //subForm($("form"));




    //watchHeader()


    // showPersonalInfor();

});

//顶部渲染完成之后执行.
//lanqiaoApp.directive('finishHeaderFilters', function ($timeout) {
//    return {
//        restrict: 'A',
//        link: function(scope, element, attr) {
//            var $headerScope=$("header").scope();
//            $headerScope.$watch("currentUser",function(newVal){
//                //console.log(newVal);
//                if(newVal){
//                    var user=newVal;
//                    switch (user.identityId){
//                        case 1:
//                            break;
//                        case 2:
//                            //身份是老师
//                            location="/pagescollege_auth.html";
//                            return;
//                        default :
//                            location="/pagesindex.html";
//                            return;
//                    }
//                    showPersonalInfor();
//
//
//                }
//            });
//        }
//    };
//});


var showErrorMsgAfterIdentity = function ( recordColumn, recordComment) {

    $("#myidentityedit").find("input,select").each(function(){
        var thisName=$(this).attr("name");
        var type=$(this).attr("type");
        if(thisName&&thisName.indexOf(toCamel(recordColumn))>-1){
            //开始显示错误信息

            var errordiv;
            errordiv=errordiv = $('<div class="msg-box"><span class="icon"></span><span class="msg">' + recordComment + '</span></div>');

            $(this).addClass("err-border");
            switch (type){
                case "radio"://性别
                    if($(this).parent().siblings(".msg-box").length>0) {
                        break;
                    }
                    $(this).parent().parent().append(errordiv);
                    break;
                case "hidden":
                    if($(this).is("[showcropbox]")){
                        $(this).parent().parent().append(errordiv);
                        break;
                    }


                default :
                    //errordiv.insertAfter($(this));
					errordiv.appendTo($(this).closest(".list"));
                    break;
            }

        }
    });


}
var showErrorMsgAfterEduAuth = function (recordPrimaryKey, recordColumn, recordComment) {

    $("#unpassedu"+recordPrimaryKey).find("input,select").each(function(){
        var thisName=$(this).attr("name");
        var type=$(this).attr("type");
        if(thisName&&thisName.indexOf(toCamel(recordColumn))>-1){
            //开始显示错误信息
            var errordiv=$('<div class="msg-box"><span class="icon"></span><span class="msg">'+recordComment+'</span></div>');
            $(this).addClass("err-border");
            switch (type){
                case "radio"://性别
                    if($(this).parent().siblings(".msg-box").length>0) {
                        break;
                    }
                    $(this).parent().parent().append(errordiv);
                    break;
                case "hidden":
                    if($(this).is("[showcropbox]")){
                        var bb=$(this).parent().parent().find(".msg-box");
                        if(bb.length>0){
                            bb.html(errordiv.html());
                        }else {
                            $(this).parent().parent().append(errordiv);
                        }
                        break;
                    }
                    if(!$(this).is("[require]")){
                        break;
                    }
                default :
                   // errordiv.insertAfter($(this));
				   errordiv.appendTo($(this).closest(".list"));
                   break;
            }

        }
    });


}


Validate.handlePass=function(flag,ele,msg){

//	alert("dddddddd")
    var msg_box;
    if($(ele).is("[name_eq]")){
        msg_box=$(ele).parent().find(".msg-box");
        if(msg_box.length==0){
            msg_box=$('<div class="msg-box"></div>');
            msg_box.appendTo($(ele).parent());
        }
    }else if ($(ele).is(".edutype")){
        msg_box=$(ele).siblings(".msg-box");
    } else {
        msg_box = ele.next().size() > 0 ? ele.next() : $('<div class="msg-box"></div>');
        if (!ele.next().size() > 0) {
            msg_box.appendTo(ele.parent());
        }
    }
    if(flag){
        msg_box.html('<span class="icon ok"></span>');
        ele.css("border-color","#c8d2d7");
        return false;
    }else{
        msg_box.html('<span class="icon"></span><span class="msg">'+msg+'</span>');

        ele.css("border-color","#ff5600");

        return true;
    }
}


//------新增教育经历处理-----
$(function(){
    //增加教育经历里的删除按钮处理
    $(".wrap .clearfix").on("click",".del_edu_block",function(){
        $(this).parent().hide();
        $(this).parent().find("input,select").val("");
        $(this).parent().find("input,select").removeAttr("style");
        $(this).parent().find(".msg-box").text("");
        $(this).parent().insertAfter($("#edu_container .edu_block:last"));
        $("button.more_edu").show();
        resetEduIndex();
        if(eduBlockStartIndex==0&&$(".del_edu_block:visible").length==0){//如果是在已认证状态下
            $("#toApplybtn").show();
            $("#addEdusbtn").hide();
        }
    });

})
//
var eduBlockStartIndex=1;
var resetEduIndex=function(){
    $("#edu_container .edu_block:visible").each(function(index, domEle){
        var inps=$(this).find("input,select");
        for(var i=0;i< inps.length;i++){
            var inp=$(inps[i]);
            var name=inp.attr("name");
            if(name&&name.indexOf("educationList")>-1){
                var nameLast=name.substring(name.indexOf("]")+1);
                inp.attr("xname","educationList["+(eduBlockStartIndex+index)+"]"+nameLast);
            }
        }
    });
}

function addMoreEduInfo(){
    var pre=$("#edu_container .edu_block:visible:last");
    var willShow;
    if(pre.length==0){ //第一个
        willShow=$("#edu_container .edu_block:eq(0)");
        willShow.find("input,select").removeAttr("disabled");
        willShow.show();
    }else{
        willShow=pre.next(".edu_block");
        if(willShow.length==0){
            $("button.more_edu").hide();
            return;
        }
        willShow.find("input,select").removeAttr("disabled");
        willShow.show();
    }
    if(willShow.next(".edu_block").length==0){
        $("button.more_edu").hide();
    }
    resetEduIndex();
    if(eduBlockStartIndex==0){//如果是在已认证状态下
        $("#toApplybtn").hide();
        $("#addEdusbtn").show();
    }
    //
    //
    //if(hasMoreEdu<4){
    //    $("#more_edu" + hasMoreEdu + " input,#more_edu" + hasMoreEdu + " select").removeAttr("disabled");
    //    $("#more_edu" + hasMoreEdu).show();
    //    if(hasMoreEdu == 3){
    //        $("button.more_edu").hide();
    //    }
    //}
}
//------教育经历处理结束-----

$(function(){
    $("input:text,input:password").val("");
    $("textarea").text("");
    $(".edutype").change(function(){
        console.log($(this).val());
        Validate.handlePass($(this).val(),$(this),"请选择学历");
    });


    //身份证-生日联动处理
    $("input[name='identityCertificateNumber']").blur(function(){
        if($("select[name='identityCertificateType']").val()!=1){
            return;
        }
        var idno=$(this).val();
        if(idno.length==18){
	        if(!$("input[name='identityBirthday']").val()){
	            try{               
	                
	                    var ddd=new Date(idno.substr(6,4)+"/"+idno.substr(10,2)+"/"+idno.substr(12,2));
	
	                    if(!ddd.getTime()){
	                        return;
	                    }
	                    $("input[name='identityBirthday']").val(showTimeStr(ddd.getTime(),'Y-m-d'));
	                   
	                    Validate.handlePass(true,$("input[name='identityBirthday']"));
	                
	            }catch(e){
	                console.log(e);
	            }
	        }
	        var last2No=idno.substr(idno.length-2,1);
            if(last2No%2==1){
            	$("[name='identitySex'][value=1]").trigger("click");
            }else  if(last2No%2==0){
            	$("[name='identitySex'][value=2]").trigger("click");
            }
        }
    });

    //性别红隐藏红框问题
    $("input:radio[name='identitySex']").click(function(){
        var name=$(this).attr("name");
        $("input:radio[name='"+name+"']").parent().removeClass("active");
        $(this).parent().addClass("active");
        $("input:radio[name='"+name+"']").removeClass("err-border");
    })
    showPersonalInfor();
})
