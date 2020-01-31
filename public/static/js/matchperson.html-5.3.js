var matchCategoryId;
matchCategoryId=getUrlParamByKey("matchCategoryId");
var matchFlowId;
matchFlowId=getUrlParamByKey("matchFlowId");
if(!matchFlowId){
    matchFlowId=2;
}
if(!matchCategoryId){
    matchCategoryId=1;
}
var periodId;

//var names="";
//顶部渲染完成之后执行.
lanqiaoApp.directive('finishHeaderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            window.authStatusTimer=setInterval(function(){
                if(window.authStatus&&window.authStatus!=4){
                    location=$URL_LANQIAOBEIDASAI + "/pages/dasai/college_auth.html";
                }else if(window.authStatus==4){
                    clearInterval(window.authStatusTimer);
                }
            },100);
        }
    };
});

lanqiaoApp.controller('matchpersonListCtrl', ['$scope', '$http','$timeout',function ($scope, $http, $timeout, $routeParams) {
	$scope.matchflowId=matchFlowId;
	$scope.matchflow =Dict.Flow[matchFlowId];
	$scope.matchCategory =Dict.Category[matchCategoryId];
    inited=true;
    periodId = Dict.PeriodSetting[matchCategoryId];
    $scope.pageLength="";
    $scope.search="";
    $scope.pageNo="";
    $scope.searchData={matchCategoryId:matchCategoryId};


    $scope.matchCategoryId=matchCategoryId;
    $scope.contace1;
    $scope.contace2;
    $scope.contace1Selected;
    $scope.contace1Selected;


    $scope.tempContactId=0;
    $scope.myShow=function(resShow){
        var temp=true;
        if(resShow===$scope.tempContactId){
            temp = false;
        } else {
            temp = true;
        }
        return temp;
    };
    $scope.myHide=function(resHide){
        var temp=false;
        if(resHide===$scope.tempContactId){
            temp= true;
        } else {
            temp= false;
        }
        return temp;
    };

    $scope.showHide=function(res) {

        //if (res===$scope.tempContactId) {
        //    myShow(res);
        //    myHide(res);
        //}
        $scope.tempContactId =res;

    }

    $scope.reloadSelected=function(){
        if($scope.personlist&&$scope.personlist.length>0){
            //去除重复数据
            $.unique($scope.personalApplyIds);
            for(var i in $scope.personlist){
                var pid=$scope.personlist[i].personalApplyId;
                if($("#cbox"+pid).val()){
                    var selected=$("#cbox"+pid)[0].checked;
                    $scope.personlist[i].selected=selected;
                    if($scope.personlist[i].selected){
                        $scope.personalApplyIds.push($scope.personlist[i].personalApplyId);
                        $scope.personalApplyNames[$scope.personlist[i].identityRealname+""]=$scope.personlist[i].identityRealname;
                    }else if($.inArray($scope.personlist[i].personalApplyId, $scope.personalApplyIds)>-1){
                        $scope.personalApplyIds.splice($.inArray($scope.personlist[i].personalApplyId, $scope.personalApplyIds),1);
                        delete $scope.personalApplyNames[$scope.personlist[i].identityRealname+""];//没选择的就删除
                    }
                }
            }
        }
    }
    //$scope.personalApplyNames={};
    $scope.searchList=function(pno) {

        $scope.searchData.page=pno;
        $scope.searchData.matchFlowId=$scope.matchflowId;
        if(!pno){
            $scope.personalApplyIds=[]; //已经选择的项
            $scope.personalApplyNames={}; //已经选择的项
        }else {
            $scope.reloadSelected();
        }
        //$scope.searchData.rows=3;

        getLoadLayer($("#stulistdiv"));
        $http.post($URL_LANQIAOBEIDASAI + "/api/matchApply/matchApplyList"
            , $scope.searchData
        ).success(function (res) {
                console.log(res);
            if (res.resultCode === 0) {
                $scope.personlist = res.resultData.list;

                $scope.page=res.resultData.page;
                //符合条件的人数
                $scope.count=res.resultData.total;
                $scope.totalRecords=$scope.page.totalRecords;
                $scope.pageCount=$scope.page.pageCount;
                $scope.pageNo=$scope.page.pageNo;
                $scope.pageLength=$scope.page.length;

                //勾上已选择的
                var thisPageSelectedLength=0;
                if($scope.personlist&&$scope.personlist.length>0) {
                    for (var i in $scope.personlist) {
                        if($.inArray($scope.personlist[i].personalApplyId, $scope.personalApplyIds)>-1){
                            $scope.personlist[i].selected=true;
                            thisPageSelectedLength++;
                        }else{
                            $scope.personlist[i].selected=false;
                        }
                    }
                    if(thisPageSelectedLength==$scope.personlist.length){
                        $("#checkAll").attr("checked","checked");
                        $("#checkAll").parent().addClass("active");
                    }else{
                        $("#checkAll").removeAttr("checked");
                        $("#checkAll").parent().removeClass("active");
                    }
                }

                $timeout(function(){
                    acciPage(".pagination", $scope.searchList,$scope.pageCount,$scope.pageNo); //分页
                },200);


               removeLoadLayer($("#stulistdiv"));
               window.scrollTo(0,0);
                //setTimeout(function(){ resetCheckBox($("#resetBox"));},500);

            }
        });

    }
   //参加院校报名的人数
    $http.post($URL_LANQIAOBEIDASAI + "/api/matchApply/matchApplyListMainCount"
        ,{matchCategoryId:matchCategoryId,matchFlowId:matchFlowId}
    ).success(function (res) {
        if (res.code === 0) {
            $scope.collegeCount = res.data.mode1;
           // res.additionalProperties.matchflowId==3?"(国赛)":res.additionalProperties.matchflowId==7?"(总决赛)":"";
           // $scope.matchflowId = res.additionalProperties.matchFlowId;
            $scope.personCount = res.data.modeAll;
            /**
            $scope.collegeCount = res.resultData.total;
            $scope.matchflow = res.resultData.matchFlowId==3?"(国赛)":res.resultData.matchFlowId==7?"(总决赛)":"";
            $scope.matchflowId = res.resultData.matchFlowId;
            //总人数
                $http.post($URL_LANQIAOBEIDASAI + "/api/matchApply/matchApplyListCount"
                    ,{applyModeId:2,matchCategoryId:matchCategoryId}
                ).success(function (res) {
                    if (res.resultCode === 0) {
                        $scope.personCount = $scope.collegeCount+res.resultData.total;

                        //matchCategoryId matchCategory
                    }
                });
            console.log(res);
             */
        }

    });
    //报名方式转换按钮
    $http.post($URL_LANQIAOBEIDASAI + "/api/action/dict/translate",{dictColumn:"2-"+matchCategoryId+"-"+matchFlowId}
    ).success(function (res) {
        if (res.resultCode === 0) {
            $scope.translate = res.resultData;
        }
        console.log(res);
    });

    //科目 matchCategoryId 1
    $http.post($URL_LANQIAOBEIDASAI + "/api/dic/match/curren/itemli",
    {matchCategoryId:matchCategoryId}
    ).success(function (res) {
        if (res.resultCode === 0) {
            $scope.lanqiaobeiItemList = res.resultData;

        }
        console.log(res);
    });

    //报名方式
    $http.post($URL_LANQIAOBEIDASAI + "/api/dic/match/applyMode"
    ).success(function (res) {
        if (res.resultCode === 0) {
            $scope.applyModeList = res.resultData;
            //applyModeList  applyModeId applyMode

        }
        console.log(res);
    });
    //院系
    $http.post($URL_LANQIAOBEIDASAI + "/api/matchApply/findAllCollege"
        ,{matchCategoryId:matchCategoryId}
    ).success(function (res) {
        if (res.resultCode === 0) {
            $scope.collegeList = res.resultData;
            //educationCollege（院系） educationCollegeCount(人数)

        }
        console.log(res);
    });

    $scope.checkMatchContact = function(){
    	if($scope.contace2&&$scope.contace1){
    		return true;
    	}else{
    		 $http.post($URL_LANQIAOBEIDASAI+"/api/match_contact/check_match_contact",{
    	            "priodId":periodId,
    	            "matchModelId":1,
    	            "matchCategoryId":$scope.matchCategoryId
    	        }).success(function(res){
    	            $scope.checkMC=res.resultData;
    	            if(res.resultCode===0){
    	                if($scope.checkMC==true){
    	                    setTimeout(function(){
    	                    	if($scope.matchflowId==3||$scope.matchflowId==7){
    	                        	$("#matchContactBtn").html("修改");
//    	                            showAlert(0,'请先添加领队老师！');
    	                        }else if($scope.matchflowId==2||$scope.matchflowId==6){
    	                        	$("#matchContactBtn").html("添加");
    	                            showAlert(0,'请先添加负责人、联系人！');
    	                        }
    	                    },500);
    	                    return false;
    	                }
    	            }else{
    	                setTimeout(function(){
    	                    $("#matchContactBtn").html("修改"); },500);
    	            }
    	        })
    		return false;
    	}
    	
       
    }
    $scope.getSelect =
        $http.post($URL_LANQIAOBEIDASAI+'/api/match_contact/find_contact_list',{periodId:periodId,matchModelId:1}).success(function (res) {
            $scope.regionData = res.resultData;
        });
    $scope.checkMatchContact();
    $scope.regionData = function(){
        $http.post($URL_LANQIAOBEIDASAI+"/api/match_contact/check_match_contact",{
            "priodId":periodId,
            "matchModelId":1,
            "matchCategoryId":$scope.matchCategoryId
        }).success(function(res){
            $scope.checkMC=res.resultData;
            if(res.resultCode===0){
                if($scope.checkMC==true){
                    setTimeout(function(){
                        if($scope.matchflowId==3||$scope.matchflowId==7){
                        	$("#matchContactBtn").html("修改");
                            showAlert(0,'请先添加领队老师！');
                        }else if($scope.matchflowId==2||$scope.matchflowId==6){
                        	$("#matchContactBtn").html("添加");
                            showAlert(0,'请先添加负责人、联系人！');
                        }
                    },500);
                    return false;
                }
            }else{
                setTimeout(function(){
                    $("#matchContactBtn").html("修改"); },500);
            }
        })
    }
    $http.post($URL_LANQIAOBEIDASAI+"/api/contact/match/findMatchContacts",
        {
            periodId:periodId,
            matchModelId:1,
            matchCategoryId:matchCategoryId,
            contactTypeId:1
        }).success(function(res){
            if(res.resultCode===0){
                $scope.contace1=res.resultData;
                $scope.contace1Selected=$scope.contace1.contactId;
                $("#contace1temp").val($scope.contace1.contactId);
            }else{
                $scope.contace1=undefined;
                $scope.contace1Selected='';
                $("#contace1temp").val('');
            }

        })
    $http.post($URL_LANQIAOBEIDASAI+"/api/contact/match/findMatchContacts",
        {
            periodId:periodId,
            matchModelId:1,
            matchCategoryId:matchCategoryId,
            contactTypeId:2
        }).success(function(res){
            if(res.resultCode===0){
                $scope.contace2=res.resultData;
                $scope.contace2Selected=$scope.contace2.contactId;
                $("#contace2temp").val($scope.contace2.contactId);
            }else{
                $scope.contace2=undefined;
                $scope.contace2Selected='';
                $("#contace2temp").val('');
            }
        })
    $scope.showMatchContacts=function(){
        //$scope.contace2Selected=$scope.contace2.contactId;
        //$scope.contace1Selected=$scope.contace1.contactId;
        $("#showContacts").hide();
        $("#editContacts").show();
        if(isNotNull($scope.contace1) && isNotNull($scope.contace1.contactId)) {
            $("#contace1temp").val($scope.contace1.contactId);
        }
        if(isNotNull($scope.contace1) && isNotNull($scope.contace2.contactId)) {
            $("#contace2temp").val($scope.contace2.contactId);
        }
    };
    $scope.changeContact1 = function(){
        $("#contace1temp").val($scope.regionData[$('select[ng-model="contace1Selected"]').val()].contactId);
        var msg_box = $('select[ng-model="contace1Selected"]').next().size()>0 ? $('select[ng-model="contace1Selected"]').next():$('<div class="msg-box"></div>');
        if(!$('select[ng-model="contace1Selected" ]').next().size()>0){
            msg_box.appendTo($('select[ng-model="contace1Selected" ]').parent());
        }
        if($scope.regionData[$('select[ng-model="contace1Selected"]').val()].contactId===undefined||$scope.regionData[$('select[ng-model="contace1Selected"]').val()].contactId==''){
            msg_box.html('<span class="icon"></span><span class="msg">'+$('select[ng-model="contace1Selected"]').attr("data-rule").split(":")[1]+'</span>');
            $('select[ng-model="contace1Selected"]').css("border-color","#ff5600");
        }else{
            msg_box.html('<span class="icon ok"></span>');
            $('select[ng-model="contace1Selected"]').css("border-color","#c8d2d7");
        }
    }
    $scope.changeContact2 = function(){
        $("#contace2temp").val($scope.regionData[$('select[ng-model="contace2Selected"]').val()].contactId);
        var msg_box = $('select[ng-model="contace2Selected"]').next().size()>0 ? $('select[ng-model="contace2Selected"]').next():$('<div class="msg-box"></div>');
        if(!$('select[ng-model="contace2Selected" ]').next().size()>0){
            msg_box.appendTo($('select[ng-model="contace2Selected" ]').parent());
        }
        if($scope.regionData[$('select[ng-model="contace2Selected"]').val()].contactId===undefined||$scope.regionData[$('select[ng-model="contace2Selected"]').val()].contactId==''){
            msg_box.html('<span class="icon"></span><span class="msg">'+$('select[ng-model="contace2Selected"]').attr("data-rule").split(":")[1]+'</span>');
            $('select[ng-model="contace2Selected"]').css("border-color","#ff5600");
        }else{
            msg_box.html('<span class="icon ok"></span>');
            $('select[ng-model="contace2Selected"]').css("border-color","#c8d2d7");
        }
    }
    $scope.add_match_contact = function(){
        console.log(FormUtil.formSerializeObj($("#lanqiaoPersonalContact"),true));
        var msg_box1 = $('select[ng-model="contace1"]').next().size()>0 ? $('select[ng-model="contace1"]').next():$('<div class="msg-box"></div>');
        if(!$('select[ng-model="contace1" ]').next().size()>0){
            msg_box1.appendTo($('select[ng-model="contace1" ]').parent());
        }
        var msg_box2 = $('select[ng-model="contace2"]').next().size()>0 ? $('select[ng-model="contace2"]').next():$('<div class="msg-box"></div>');
        if(!$('select[ng-model="contace2" ]').next().size()>0){
            msg_box2.appendTo($('select[ng-model="contace2" ]').parent());
        }
        if($scope.contace1===undefined||$scope.contace1==''||$scope.contace2===undefined||$scope.contace2==''){
            if($scope.contace1===undefined||$scope.contace1==''){
                $('select[ng-model="contace1"]').css("border-color","#ff5600");
                msg_box1.html('<span class="icon"></span><span class="msg">'+$('select[ng-model="contace1"]').attr("data-rule").split(":")[1]+'</span>');
            }
            if($scope.contace2===undefined||$scope.contace2==''){
                msg_box2.html('<span class="icon"></span><span class="msg">'+$('select[ng-model="contace2"]').attr("data-rule").split(":")[1]+'</span>');
                $('select[ng-model="contace2"]').css("border-color","#ff5600");
            }
            return ;
        }
        $http.post($URL_LANQIAOBEIDASAI+"/api/match_contact/add_match_contact",FormUtil.formSerializeObj($("#lanqiaoPersonalContact"),true)).success(function(res){
            if(res.resultCode===0){
                $("#ent_dialog").fadeOut();
                $scope.contact1="";
                $scope.contact2="";
                $('.msg-box').remove();
            }else{
                $('.grouperror').html('数据保存失败，请联系系统管理员'+res.resultCode+res.resultMsg);
            }
        })

    }
    $scope.update_match_contact = function(){
        var msg_box1 = $('select[ng-model="contace1Selected"]').next().size()>0 ? $('select[ng-model="contace1Selected"]').next():$('<div class="msg-box"></div>');
        if(!$('select[ng-model="contace1Selected" ]').next().size()>0){
            msg_box1.appendTo($('select[ng-model="contace1Selected" ]').parent());
        }
        var msg_box2 = $('select[ng-model="contace2Selected"]').next().size()>0 ? $('select[ng-model="contace2Selected"]').next():$('<div class="msg-box"></div>');
        if(!$('select[ng-model="contace2Selected" ]').next().size()>0){
            msg_box2.appendTo($('select[ng-model="contace2Selected" ]').parent());
        }
        if($("#contace1temp").val()===undefined||$("#contace1temp").val()==''||$("#contace2temp").val()===undefined||$("#contace2temp").val()==''||$('select[ng-model="contace2Selected"]').val()==null||$('select[ng-model="contace1Selected"]').val()==null){
            if($("#contace1temp").val()===undefined||$("#contace1temp").val()==''||$('select[ng-model="contace1Selected"]').val()==null){
                $('select[ng-model="contace1Selected"]').css("border-color","#ff5600");
                msg_box1.html('<span class="icon"></span><span class="msg">'+$('select[ng-model="contace1Selected"]').attr("data-rule").split(":")[1]+'</span>');
            }
            if($("#contace2temp").val()===undefined||$("#contace2temp").val()==''||$('select[ng-model="contace2Selected"]').val()==null){
                msg_box2.html('<span class="icon"></span><span class="msg">'+$('select[ng-model="contace2Selected"]').attr("data-rule").split(":")[1]+'</span>');
                $('select[ng-model="contace2Selected"]').css("border-color","#ff5600");
            }
            return ;
        }
        if($(".edit").hasClass("disabled")){
            return false;
        }
        $(".edit").addClass("disabled");
        $(".edit").attr("disabled","disabled");
        console.log(FormUtil.formSerializeObj($("#lanqiaoPersonalContact"),true));
        $http.post($URL_LANQIAOBEIDASAI+"/api/match_contact/add_match_contact",FormUtil.formSerializeObj($("#lanqiaoPersonalContact"),true)).success(function(res){
            if(res.resultCode===0){
                location.reload();
                $("#editContacts").hide();
                $("#showContacts").show();
            }else{
                $('.grouperror').html('请选择联系人、负责人！');
            }
        })

    }

  //时间设置
    $http.post(
            $URL_LANQIAOBEIDASAI+"/api/action/timeaxis/timesetting",{matchCategoryId:matchCategoryId,matchFlowId:matchFlowId}).success(function(res) {
            	console.log("timesetting",res);
            	var itemPayEndDate = new Date(res.data.itemPayEndDate.value.replace(/-/g,"/"));
                $scope.payEndDate = itemPayEndDate;
                $scope.flagOther=res.data.itemPayEndDate.open || !res.data.itemApplyStartDate.open ;
            });
    /**
    $http.post(
        $URL_LANQIAOBEIDASAI+"/api/action/timeaxis/personalProvinceApply").success(function(res) {
            $scope.data = res.resultData;
            console.log($scope.data);
            if (matchCategoryId < 5) {
                for (var i = 0; i < $scope.data.lqmfp.length; i++) {
                    if ($scope.data.lqmfp[i].matchCategoryId == matchCategoryId) {
                        var itemPayEndDate = new Date($scope.data.lqmfp[i].itemPayEndDate);
                        $scope.payEndDate = new Date($scope.data.lqmfp[i].itemPayEndDate.replace(/-/g,"/"));
                    }
                }
            } else {
                for (var i = 0; i < $scope.data.design.length; i++) {
                    if ($scope.data.design[i].matchCategoryId == matchCategoryId) {
                        var itemPayEndDate = new Date($scope.data.design[i].itemPayEndDate);
                        $scope.payEndDate = new Date($scope.data.lqmfp[i].itemPayEndDate.replace(/-/g,"/"));
                    }
                }
            }
            var NowTime = new Date();
            // var NowTime = new Date('2017-04-21 00:00:00');
            var t1 = itemPayEndDate.getTime() - NowTime.getTime();
            if (t1 > 0) {
                $scope.flag=true;
            }else {
                $scope.flag=false;
            }
        });
*/

    //加入代缴费
    $scope.waitPay=function(contact,obj){
        if(!$scope.checkMatchContact()){
        	if(matchFlowId==3){
        		showAlert(0,"请先添加负责人联系人");
        	}
        	
        	return;
        }
        if(contact){
            var pid=obj.personalApplyId;
            $("#cbox"+obj.personalApplyId).val("");
            $.unique($scope.personalApplyIds);
            if($.inArray(obj.personalApplyId, $scope.personalApplyIds)>-1) {
                $scope.personalApplyIds.splice($.inArray(obj.personalApplyId, $scope.personalApplyIds), 1);
                delete $scope.personalApplyNames[obj.identityRealname + ""];//没选择的就删除
            }
            if(!( contact instanceof Object)) {
                for (var j in $scope.teachli) {
                    if (contact == $scope.teachli[j].contactId) {
                        contact = $scope.teachli[j];
                        break;
                    }

                }
            }

            //院校报名--分配指导老师--【数据插入confirm报名确认表】
            $http.post($URL_LANQIAOBEIDASAI + "/api/matchApply/allotTeacher",
                {personalApplyId:obj.personalApplyId,contactId:contact.contactId
                    ,contactDataVersion:contact.dataVersion,personalConfirmId:obj.personalConfirmId}
            ).success(function (res) {
                if (res.resultCode === 0) {
                    $scope.searchList($scope.searchData.page);
                    $scope.tempContactId=0;
                } else if(res.resultCode ===211003){

                    showAlert(0,res.resultMsg);
                    $scope.tempContactId=0;
                    $scope.searchList($scope.searchData.page);
                    //$.alert({
                    //    title : '提示',
                    //    content : res.resultMsg,
                    //    confirmButton : '确认'
                    //});
                }
                console.log(res);
            });
        }

    }

    //删除代缴费
    $scope.delWaitPay=function(obj){
        $scope.checkMatchContact();
        //var pid=obj.personalApplyId;
        //$("#cbox"+obj.personalApplyId).val("");
        //$.unique($scope.personalApplyIds);
        //if($.inArray(obj.personalApplyId, $scope.personalApplyIds)>-1) {
        //    $scope.personalApplyIds.splice($.inArray(obj.personalApplyId, $scope.personalApplyIds), 1);
        //    delete $scope.personalApplyNames[obj.identityRealname + ""];//没选择的就删除
        //}

        //院校报名--分配指导老师--【数据插入confirm报名确认表】
        $http.post($URL_LANQIAOBEIDASAI + "/api/matchApply/delTeacher",
            {personalConfirmId:obj.personalConfirmId}
        ).success(function (res) {
            if (res.resultCode === 0) {
                $scope.searchList($scope.searchData.page);
            }
            console.log(res);
        });

    }
    $scope.pageNo="";
    $scope.pageLength="";
    $scope.search="";
    //查找数据并将页数置为1
    $scope.searchListNew=function(){
        $scope.pageCount="";
        $scope.pageNo="";//置空为了让pagination监听到
        $scope.searchList();
    }
    $scope.onenter=function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.searchListNew();
        }
    };
    $scope.searchList();

    $http.post($URL_LANQIAOBEIDASAI+ "/api/contact/findAllContact").success(function(res){
        if(res.resultCode===0) {
            $scope.teachli = res.resultData;
        }
    });

    //$scope.teachterNames="";

    $scope.contactId;
    $scope.contactDataVersion;
    //$scope.addTeachtersData;
    $scope.addTeachters=function(){
        $scope.checkMatchContact();
        $scope.reloadSelected();

        var names="";
        var ids="";
        //var personalApplyIds=[];
        //$scope.searchData[name]=selectedIds;

        if($scope.personalApplyNames){
            for(var key in $scope.personalApplyNames){
                names+=key+",";
            }
        }else{
            return;
        }

        //$.each($("input[name=checkApplyIds]:checked"),function(i,ele){
        //    //names+=$(ele).val().identityRealname+",";
        //    names+=$(ele).attr("stu_name")+",";
        //    //personalApplyIds.push($(ele).val());
        //    //id
        //
        //});
        //$scope.personalApplyIds=personalApplyIds;
        if(names.length==0){
            showAlert(0,"请先选择要指派指导老师的学生");
        }else{
            showDialog('#tea_dialog');
            //$scope.$apply();

            //if(names.length>5){
            //    $scope.teachterNames=names.substring(0,5)+"...等N位学生";
            //} else {
            //    $scope.teachterNames=names.substring(0,names.length-1);
            //}
            $scope.teachterNames=names.substring(0,names.length-1);
            console.log(names);
        }

    };
    $scope.submitAddTeachters=function(obj){
        $scope.checkMatchContact();
    	if(obj&&$('[ng-model="contacts"]').val()){


	        $scope.contactId=obj.contactId;
	        $scope.contactDataVersion=obj.dataVersion;
	        $.unique($scope.personalApplyIds);
        
        	//院校报名--批量分配指导老师--【数据插入confirm报名确认表】
            $http.post($URL_LANQIAOBEIDASAI + "/api/matchApply/allotTeachers",
                {contactId:$scope.contactId,contactDataVersion:$scope.contactDataVersion,personalApplyIds:$scope.personalApplyIds}
            ).success(function (res) {
                if (res.resultCode === 0) {

                    for(var i in $scope.personalApplyIds) {
                        $("#cbox" + $scope.personalApplyIds[i]).val("");
                    }
                    $scope.personalApplyIds=[];
                    $scope.personalApplyNames={};

                    closeDialog('.dialog')
                    $scope.searchList($scope.searchData.page);
                    //contacts=null;
                    $scope.contacts=null;
                }
                console.log(res);
            });



        }

    };
    
    $scope.waitPayPage=function() {
        location.href = $URL_LANQIAOBEIDASAI+"/pages/dasai/college_stuwaitpay.html?matchCategoryId="+matchCategoryId+"&matchFlowId="+matchFlowId
    }
    $scope.paySuccPage=function() {
        location.href = $URL_LANQIAOBEIDASAI+"/pages/dasai/college_stupaysucc.html?matchCategoryId="+matchCategoryId+"&matchFlowId="+matchFlowId;
    }
    $scope.feachDel=function(){
    	
    	 $scope.checkMatchContact();
	        $scope.reloadSelected();
	        var ids= $.unique($scope.personalApplyIds).toString();
	        if(ids.length==0){
	            showAlert(0,"没有选择任何学生");
	            return;
	        }else{
	        	var len=ids.split(",").length;
		    	 $.yehDialog({
		             dialogWidth:445,
		             title:"信息",
		             content:'<p><font color=red>'+len+'</font>名学生将转为个人报名,若转为个人报名,将由学生自己缴费,是否继续?</p>',
		             okText:"确定",
		             cancelText:"取消",		          
		             ok:function(){    	
			       
			            if($("#feachDel").hasClass('disabled')){
			                return false;
			            }
			            $("#feachDel").addClass('disabled');
			            $http.post($URL_LANQIAOBEIDASAI+"/api/matchdelapply/college/del",{matchFlowId:matchFlowId,personalApplyIds:ids}).success(function(res){
			                if(res.resultCode===211002){
			                    showAlert(0,'当前报名信息已分配准考证,无法完成切换!');
			                    return false;
			                }
			                if(res.resultCode==211003){
			                    showAlert(0,'处理时间已超过缴费截止日期,无法完成切换!');
			                    return false;
			                }
			                if(res.resultCode==120000||res.resultCode==130000){
			                    showAlert(0,'系统异常请刷新后重试!');
			                    return false;
			                }
			                if(res.resultCode===0){
			                	showAlert(1,'操作成功!');			                    
			                	setTimeout(function(){ window.location.reload();},1000);
			                }
			            })
			        }});
             }
    	 
    }
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

    //导出列表execl
    $scope.matchApplyListExportXls=function(){
//$http.post(
        if($scope.totalRecords>0){
            var url=$URL_LANQIAOBEIDASAI + "/api/matchApply/matchApplyListExportXls";
            $.fileDownload(url,{
                httpMethod:"POST",
                data:param($scope.searchData),
                successCallback: function (url) {
                    //$("#exportExcelModal").modal("hide");
                },
                failCallback: function (html, url) {
                    alert("导出失败，未知的异常。");
                    //$("#exportExcelModal").modal("hide");
                }
            });
        }else{
            showAlert(0,"暂无数据");
        }


    }
    //导入导师需要的模板学生报名数据
    $scope.downLoadTeacherTemp=function(){
        if($scope.totalRecords>0){
            var url=$URL_LANQIAOBEIDASAI + "/api/matchApply/softElectDownLoadForTeacherTemp";
            $.fileDownload(url,{
                httpMethod:"POST",
                data:param($scope.searchData),
                successCallback: function (url) {
                    //$("#exportExcelModal").modal("hide");
                },
                failCallback: function (html, url) {
                    alert("导出失败，未知的异常。");
                    //$("#exportExcelModal").modal("hide");
                }
            });
        }else{
            showAlert(0,"暂无数据");
        }
    }
    
    
    $scope.upLoadTeacherTemp=function(){
    	if(!$scope.flagOther){
    		showDialog('.showInfo');
        	$("#speedid").html("");
            $(".showInfo").css("height",$(document).height()+"px");//弹框遮罩层高度
    	}else{
    		showAlert(0,"报名已结束");
    	}
    	
    }
}]);


var leftbar_dasai_show_timer;
function uploader() {
    uploader = WebUploader.create({
    		  // 选完文件后，是否自动上传。
        swf: '/common/js/lib/upload/Uploader.swf',//swf文件路径
        server: $URL_LANQIAOBEIDASAI + '/api/matchApply/uploadTeacher',//文件接受服务端
        pick: {//选择文件的按钮
            id: "#filePicker",
            multiple: false
        },//选择文件的按钮
        auto: true,
		 fileNumLimit: 1,
		 multiple: false,
		 formData:{'matchCategoryId':matchCategoryId,'matchFlowId':matchFlowId},
//        duplicate: true,
        fileSizeLimit: 200000 * 1024 * 1024,    // 200 M
        fileSingleSizeLimit: 100 * 1024 * 1024, //, //50M
		accept: {
	        title: 'Applications',
	        extensions: 'xlsx,xls',
	        mimeTypes: 'application/*，image/*'
		}
    });


    uploader.on("error", function (type) {
        if (type == "Q_TYPE_DENIED") {
            showAlert(0, "文件格式错误")
        }
        if (type == "F_EXCEED_SIZE") {
            showAlert(0, "文件大小超过限制");
        }
    })


    //上传之前动态绑定参数
    uploader.on('uploadBeforeSend', function (block, data) {
        $("input[name='file']").attr("disabled","disabled");
     
    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
       
    });

    // 文件上传出错
    uploader.on('uploadError', function (file) {
        $("input[name='file']").removeAttr("disabled");
        //$("#fileErr").html('<span class="icon"></span><span class="msg">上传出错</span>');
    });
    //上传成功
    uploader.on('uploadSuccess', function (file, response) {
        if (response.resultCode ==200) { //如果是分段上传
        	$("#uploader-demo").hide();
        	$("#speedid").show();
            var uuid = response.resultData;
            if (uuid) {
                window.upUuid = uuid;
                window.uploaderTimer = setInterval(function () {
                    $.ajax({
                        type: "POST",
                        url:$URL_LANQIAOBEIDASAI+ "/api/matchApply/importSpeed",
                        data: {
                            sid:  window.upUuid
                        },
                        success: function (res) {
                           console.log(res)
                           if(res.succeed){
                        	   clearInterval(window.uploaderTimer);
                        	   $("#uploader-demo").show();
                        	   $("#speedid").hide();
                        	   console.log(res.resultCode)
                        	   if(res.code==-1){
                        		   showAlert(0, "发生错误，导入未完成。")
                        	   }else if(res.code==200){
                        		   showAlert(1, "导入成功。")
                        		   var appElement=document.querySelector('[ng-controller=matchpersonListCtrl]');
                        		   $scope=angular.element(appElement).scope();
                        		   $scope.searchListNew();
                        		   $scope.$apply();
                        	   }else if(res.code==-2){
                        		   var ps='<p>'+res.msg+'</p>';
                        		   for(var i in res.data){
                        			   ps+='<p>'+res.data[i].msg+'</p>';
                        		   }
                        		   $("#speedid").html(ps);
                        		   $("#speedid").show();
                        	   }
                           }else{
                        	   $("#speedid").html(res.msg);
                           }
                        }
                    });
                }, 500);
            } else {
                $('#file_' + file.id).addClass("err");
                $('#file_' + file.id).css("color", "red");
                $('#file_' + file.id).find(".pro").html("上传出错");
                $("[name='file']").removeAttr("disabled");
            }
        } else {
            showAlert(0, response.msg);
            $('#file_' + file.id).addClass("err");
            $('#file_' + file.id).css("color", "red");
            $('#file_' + file.id).find(".pro").html("上传出错");
            $("[name='file']").removeAttr("disabled");
        }
    });

    //上传完成：重置插件
    uploader.on('uploadComplete', function (file) {
    	 uploader.reset();//毛用
    	 $("#filePicker").find("input[type='file']").removeAttr("disabled");
    });
}

$(function(){
	uploader()
	/**
    $("img.more").click(function(){
    	
        if($("#collegelisdiv").height()<60){
            return;
        }
        
        var isShow = $(this).data("isshow");
        if(isShow == "0"){
            $(this).prev().css("height","auto");
            $(this).data("isshow","1");
        }else{
            $(this).prev().css("height","32px");
            $(this).data("isshow","0");
        }
    });
*/
    //检索
    //$("#dataFrom").attr("action",$URL_LANQIAOBEIDASAI + "/api/matchApply/matchApplyList");

    //左侧导航处理.
    leftbar_dasai_show_timer=setInterval(function(){
        if($("#leftbar_dasai:visible").length==0||!matchCategoryId){
            return;
        }
        clearInterval(leftbar_dasai_show_timer);
        $("#leftbar_dasai ul [matchCategoryId][value="+matchCategoryId+"]").addClass("act");
        $("#leftbar_dasai ul").show();
    },100);


    $("#allstulistView").on("click",".sel-block a",function(){

        var name=$(this).attr("name");
        var selectedIds="";
        var $p= $(this).parents(".sel-block:first");
        if($(this).is("[all]")){//如果是点的全部
            $p.find("a").removeClass("active");
            $(this).addClass("active");
        }else {
        	//改为单选,新增此段
        	$p.find("a").removeClass("active");
        	$(this).addClass("active");
        	selectedIds=[];
            selectedIds.push($(this).attr("data-val"));
        	
        	
        	/**  改为单选,此段禁用
            if( $(this).is(".active")) {
                $(this).removeClass("active");
            }else{
                $(this).addClass("active");
            }
            
            //如果是全选
            if($p.find("a.active").not("[all]").length==$p.find("a").not("[all]").length){
                $p.find("a[all]").addClass("active");
            }else{
                $p.find("a[all]").removeClass("active");
                selectedIds=[];
                selectedIds.push($(this).attr("data-val"));
            
                $.each($p.find("a.active").not("[all]"),function(i,ele){
                    selectedIds.push($(ele).attr("data-val"));
                });
            }
            
            //如果全部清空了,也当作是全选吧
            if($p.find("a.active").not("[all]").length==0){
                $p.find("a[all]").addClass("active");
            }
            */
        }

        var $scope=$("#stulistdiv").scope().$parent;
        if(!$scope){
            console.error("$scope not found when setting searchData");
            return;
        }

        $scope.searchData[name]=selectedIds;
        $scope.searchList();
    });
    $("body").on("click","input[type='checkbox']",function() {
        var size = $("input[type='checkbox']").not("#checkAll").length;
        var checkSize = $("input[type='checkbox']:checked").not("#checkAll").length;
        if (size == checkSize) {
            $("#checkAll").parent().addClass("active");
        } else {
            $("#checkAll").parent().removeClass("active");
        }

        if($(this).attr("id") === "checkAll"){
            checkAll();
        }else{
            $(this).parent().toggleClass("active");
        }

    });
});


