//if(location.href.indexOf("test")<0) {
//	location="/pages/dasai/updating.html";
//
//}

lanqiaoApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/pages/dasai/index.html',
            controller: 'IndexListCtrl'
        })
    }]);
lanqiaoControllers.controller('IndexListCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $roarams) {
	$scope.oldNumOperate=function(){ //已弃用
		 $http.post($URL_LANQIAOBEIDASAI+"/api/matchnum/now").success(function(res){
			 if(res.resultCode===0){
					if(res.resultData>0){
						$("#matchNum").text(res.resultData);
						$("#matchStartDate").html("第八届注册人数&nbsp;截至"+h5.time.date('Y.m.d'));
					}else{
						$("#matchNum").text("报名日期");
						$("#matchNum").css("font-size","20px");
						$('<span></span>').text(h5.time.date('Y.m.d',new Date(res.otherProperties.matchStartDate.replace(/-/g,'/')).getTime()))
							.css("font-size","35px").appendTo($("#matchStartDate"));

					}
				 //$scope.matchNum=res.resultData;
			 }
		 });
	}
	
		 $scope.getSelect =
		    	$http.post($URL_LANQIAOBEIDASAI+'/api/match_contact/find_contact_list',{periodId:8,matchModelId:1}).success(function (res) {
		    		$scope.regionData = res.resultData;
		    		console.log($scope.regionData);
			});
		 $scope.timeaxisList=function(){
			 $http.post(
                $URL_LANQIAOBEIDASAI+"/api/action/timeaxis/li/simple").success(function(res){
				var data = res.resultData;
                var liHtml = '';

                for(var i = 0;i < data.length ;i++){
                    liHtml += '<li class="'+data[i].style +'"><span class="circle"></span>';
                    if(data[i].line){
                        liHtml += '<div class="line"></div>'
                    }
                    liHtml += '<div class="txt"><p>'+h5.time.date('Y-m',new Date(data[i].date.replace(/-/g,'/')).getTime()) +'</p><p>'+data[i].text2 +'</p></div>'+
                        '<div class="tag">'+data[i].matchModel +'</div>'+
                    '</li>'
                }

//                $(".timeline ul").html(liHtml);
                console.log(liHtml);
			});
		 }
		 //$scope.timeaxisList(); 已弃用
//		 $scope.add_match_contact = function(){
//			 $http.post($URL_LANQIAOBEIDASAI+"/api/match_contact/add_match_contact",{
//				 matchModelId:,matchCategoryId:,contactTypeId:,contactId:,contactDataVersion:
//			 }).success(function(res){
//				 if(res.resultCode===0){
//					 
//				 }else{
//					 
//				 }
//			 })
//		 }
		 $scope.showDesignItem=function(item){
			 var hhurl="/pages/dasai/personal_design_apply.html";
			 if($scope.data.items[item.itemId].targetId==2){
				 hhurl="/pages/dasai/personal_design_apply_dyteam.html";
			 }
//			 var user = $("#topUserDiv").scope().currentUser;
				if(window.currentUser&&window.currentUser.identityId===2){
					var itemOne = {
						 "matchModel":item.matchModel,
						 "matchCategory":item.matchCategory,
						 "matchCategoryId":item.matchCategoryId,
						 "matchFlowId":item.matchFlowId,
						 "matchFlow":item.matchFlow,
						 "periodId":item.periodId,
						 "periodCapital":item.periodCapital,
						 "matchItem":item.itemName,
						 "matchItemId":item.itemId,
						 "itemApplyStartDate":item.itemApplyStartDate,
						 "itemApplyEndDate":item.itemApplyEndDate
					};
					$http.post(
					$URL_THIRDINTERFACE+"/api/action/session/tmp/save",
					{key:$.md5(JSON.stringify(itemOne)),data:JSON.stringify(itemOne)}).success(function(res){
					if(res.resultCode===0){
						location.href=hhurl+"?key="+$.md5(JSON.stringify(itemOne));
						//window.open( $URL_LANQIAOBEIDASAI+"/pages/dasai/personal_design_apply.html?key="+$.md5(JSON.stringify(itemOne)));
					}else{
						window.open( $URL_LANQIAOBEIDASAI+"/pages/dasai/index.html");
					}
					});
				}else{
					var itemOne;
					if(undefined!=$scope.data.lanqiaobeiPersonalApply&&item.matchFlowId==3&&item.itemId==$scope.data.lanqiaobeiPersonalApply.itemId){
						 itemOne = {
							"matchModel":item.matchModel,
							"matchCategory":item.matchCategory,
							"matchCategoryId":item.matchCategoryId,
							"matchFlowId":item.matchFlowId,
							"matchFlow":item.matchFlow,
							"periodId":item.periodId,
							"periodCapital":item.periodCapital,
							"matchItem":item.itemName,
							"matchItemId":item.itemId,
							"itemApplyStartDate":item.itemApplyStartDate,
							"itemApplyEndDate":item.itemApplyEndDate,
							"itemGroup":$scope.data.lanqiaobeiPersonalApply.itemGroup,
							"itemGroupId":$scope.data.lanqiaobeiPersonalApply.itemGroupId

						};
					}else{
						 itemOne = {
							"matchModel":item.matchModel,
							"matchCategory":item.matchCategory,
							"matchCategoryId":item.matchCategoryId,
							"matchFlowId":item.matchFlowId,
							"matchFlow":item.matchFlow,
							"periodId":item.periodId,
							"periodCapital":item.periodCapital,
							"matchItem":item.itemName,
							"matchItemId":item.itemId,
							"itemApplyStartDate":item.itemApplyStartDate,
							"itemApplyEndDate":item.itemApplyEndDate
						};
					}
					
					
					$http.post(
						$URL_THIRDINTERFACE+"/api/action/session/tmp/save",
						{key:$.md5(JSON.stringify(itemOne)),data:JSON.stringify(itemOne)}).success(function(res){
						if(res.resultCode===0){
							location.href=hhurl+"?key="+$.md5(JSON.stringify(itemOne));
							//window.open( $URL_LANQIAOBEIDASAI+"/pages/dasai/personal_design_apply.html?key="+$.md5(JSON.stringify(itemOne)));
						}else{
							location.href = $URL_LANQIAOBEIDASAI+"/pages/dasai/index.html";
						}
					});
				}
		 }
		 $scope.showItem1 =function(item){
//			 var user = $("#topUserDiv").scope().currentUser;
			if(window.currentUser&&window.currentUser.identityId===2){
				var itemOne = {
					 "matchModel":item.matchModel,
					 "matchCategory":item.matchCategory,
					 "matchCategoryId":item.matchCategoryId,
					 "matchFlowId":item.matchFlowId,
					 "matchFlow":item.matchFlow,
					 "periodId":item.periodId,
					 "periodCapital":item.periodCapital,
					 "matchItem":item.itemName,
					 "matchItemId":item.itemId,
					 "itemApplyStartDate":item.itemApplyStartDate,
					 "itemApplyEndDate":item.itemApplyEndDate
				};
				$http.post(
				$URL_THIRDINTERFACE+"/api/action/session/tmp/save",
				{key:$.md5(JSON.stringify(itemOne)),data:JSON.stringify(itemOne)}).success(function(res){
				if(res.resultCode===0){
					location.href="/pages/dasai/personal_province_apply.html?key="+$.md5(JSON.stringify(itemOne));
					//window.open( $URL_LANQIAOBEIDASAI+"/pages/dasai/personal_province_apply.html?key="+$.md5(JSON.stringify(itemOne)));
				}else{
					location.href = $URL_LANQIAOBEIDASAI+"/pages/dasai/index.html";
				}
				});
			}else{
				var itemOne;
				if(undefined!=$scope.data.lanqiaobeiPersonalApply&&item.matchFlowId==3&&item.itemId==$scope.data.lanqiaobeiPersonalApply.itemId){
					 itemOne = {
						"matchModel":item.matchModel,
						"matchCategory":item.matchCategory,
						"matchCategoryId":item.matchCategoryId,
						"matchFlowId":item.matchFlowId,
						"matchFlow":item.matchFlow,
						"periodId":item.periodId,
						"periodCapital":item.periodCapital,
						"matchItem":item.itemName,
						"matchItemId":item.itemId,
						"itemApplyStartDate":item.itemApplyStartDate,
						"itemApplyEndDate":item.itemApplyEndDate,
						"itemGroup":$scope.data.lanqiaobeiPersonalApply.itemGroup,
						"itemGroupId":$scope.data.lanqiaobeiPersonalApply.itemGroupId

					};
				}else{
					 itemOne = {
						"matchModel":item.matchModel,
						"matchCategory":item.matchCategory,
						"matchCategoryId":item.matchCategoryId,
						"matchFlowId":item.matchFlowId,
						"matchFlow":item.matchFlow,
						"periodId":item.periodId,
						"periodCapital":item.periodCapital,
						"matchItem":item.itemName,
						"matchItemId":item.itemId,
						"itemApplyStartDate":item.itemApplyStartDate,
						"itemApplyEndDate":item.itemApplyEndDate
					};
				}

				$http.post(
					$URL_THIRDINTERFACE+"/api/action/session/tmp/save",
					{key:$.md5(JSON.stringify(itemOne)),data:JSON.stringify(itemOne)}).success(function(res){
					if(res.resultCode===0){
						location.href="/pages/dasai/personal_province_apply.html?key="+$.md5(JSON.stringify(itemOne));
						//window.open( $URL_LANQIAOBEIDASAI+"/pages/dasai/personal_province_apply.html?key="+$.md5(JSON.stringify(itemOne)));
					}else{
						location.href = $URL_LANQIAOBEIDASAI+"/pages/dasai/curren_item.html";
					}
				});
			}
		 }
		 $scope.itemDtoList=function(){
			 $http.post(
                $URL_LANQIAOBEIDASAI+"/api/action/timeaxis/personalProvinceApply").success(function(res){
				$scope.data = res.resultData;
				console.log($scope.data);
				$("#itemTitle").text($scope.data.indexTile);
				$(".btn").text($scope.data.info);
				$scope.design1=$scope.data.design[0];
				$scope.design2=$scope.data.design[1];
				$scope.design3=  $scope.data.items[11503];
				if($scope.design3 && $scope.design2){
					$scope.design3.matchFlowId=$scope.design2.matchFlowId;
				}
				toUrlClick();
				var item1 = $scope.data.lqmfp[0];
				var item2 = $scope.data.lqmfp[1];
				var item5 = $scope.data.lqmfp[2];
				var item3 = $scope.data.lqmfp[3];
				var item4 = $scope.data.lqmfp[4];
				var item6 = $scope.data.lqmfp[5];
				if(undefined!=$scope.data.lanqiaobeiPersonalApply&&item1.matchFlowId==3&&$scope.data.lanqiaobeiPersonalApply.matchFlowId==2){
					item1.title = "国赛报名";
					item2.title = "国赛报名";
					item3.title = "国赛报名";
					item4.title = "国赛报名";
					if($scope.data.lanqiaobeiPersonalApply.itemId!=item1.itemId){
						item1.title = "国赛报名";
					}
				}else if(undefined!=$scope.data.lanqiaobeiPersonalApply&&item1.matchFlowId==3&&$scope.data.lanqiaobeiPersonalApply.matchFlowId!=2){


				}else{

				}
				 $scope.item1 = item1;
				 $scope.item2 = item2;
				 $scope.item5 = item5;
				 $scope.item3 = item3;
				 $scope.item4 = item4;
				 $scope.item6 = item6;
			});
		 }
		 $scope.itemDtoList();
		$scope.userMobile = function(){
			//if($("#topUserDiv").scope()!=undefined){
			$http.post('/api/action/account/current/user').success(function (res) {
				if(res.resultCode===0){
					$scope.accountLoginDTO=res.resultData;
					if($scope.accountLoginDTO!=null||$scope.accountLoginDTO!=undefined){
							if($scope.accountLoginDTO.identityId===1&&($scope.accountLoginDTO.accountMobile==null||$scope.accountLoginDTO.accountMobile=='null')){
								$('.bindPhone').fadeIn(200);
							}else{
								$('.bindPhone').fadeOut(200);
							}

					}
				}
			})

		}
		//预选赛时间
		$scope.findPrelimTime=function(){
			$http.post($URL_LANQIAOBEIDASAI+'/api/action/timesetting/prelim_time').success(function (res) {
				if(res.succeed){
					var prelimTime={};
					for(var ii in res.data.times){
						if(res.data.times[ii].settingType=="prelim_start_date"){
							prelimTime.start=res.data.times[ii];
						}
						if(res.data.times[ii].settingType=="prelim_end_date"){
							prelimTime.end=res.data.times[ii];
						}
					}
					$scope.prelimTime=prelimTime;
					if(res.additionalProperties.account&&res.additionalProperties.account.identityId==2){
						$scope.prelim_btn_txt="报名审核";						
					}
				}
			});
		}
		$scope.findPrelimTime();
		$scope.userDepartment = function(){
			//if($("#topUserDiv").scope()!=undefined){
			$http.post('/api/action/audit/getDepartmentSign').success(function (res) {
				if(res.resultCode===0){
					if (!res.resultData) {
						$('.userDepartment').fadeIn(200);
					} else {
						$('.userDepartment').fadeOut(200);
					}

				}
			})

		}
		window.userMobileScope=$scope;
		window.userMobileTimer=setInterval(function () {
			if(window.currentUser){
				clearInterval(window.userMobileTimer);
				window.userMobileScope.userMobile();
			}
		},100);

		window.userDepartmentScope=$scope;
		window.userDepartmentTimer=setInterval(function () {
			if(window.currentUser){
				clearInterval(window.userDepartmentTimer);
				if(window.currentUser.identityId==2){
					window.userDepartmentScope.userDepartment();
				}
			}
		},100);

		// setTimeout(function(){
		// 	$scope.userMobile();
		// },400)
		 $scope.changeContact1 = function(){
			 $("#contace1temp").val($scope.contace1);
			 var msg_box = $('select[ng-model="contace1"]').next().size()>0 ? $('select[ng-model="contace1"]').next():$('<div class="msg-box"></div>');
			 if(!$('select[ng-model="contace1" ]').next().size()>0){
				 msg_box.appendTo($('select[ng-model="contace1" ]').parent());
			 }
			 if($scope.contace1===undefined||$scope.contace1==''){
				 msg_box.html('<span class="icon"></span><span class="msg">'+$('select[ng-model="contace1"]').attr("data-rule").split(":")[1]+'</span>');
				 $('select[ng-model="contace1"]').css("border-color","#ff5600");
			 }else{
				msg_box.html('<span class="icon ok"></span>');
				$('select[ng-model="contace1"]').css("border-color","#c8d2d7");
			 }
		 }
		 $scope.changeContact2 = function(){
			 $("#contace2temp").val($scope.contace2);
			 var msg_box = $('select[ng-model="contace2"]').next().size()>0 ? $('select[ng-model="contace2"]').next():$('<div class="msg-box"></div>');
			 if(!$('select[ng-model="contace2" ]').next().size()>0){
				 msg_box.appendTo($('select[ng-model="contace2" ]').parent());
			 }
			 if($scope.contace2===undefined||$scope.contace2==''){
				 msg_box.html('<span class="icon"></span><span class="msg">'+$('select[ng-model="contace2"]').attr("data-rule").split(":")[1]+'</span>');
				 $('select[ng-model="contace2"]').css("border-color","#ff5600");
			 }else{
				msg_box.html('<span class="icon ok"></span>');
				$('select[ng-model="contace2"]').css("border-color","#c8d2d7");
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
		 /**
		  * 新闻块
		  * msg：ajax拼接字符串到html
		  * id： 需要修改的新闻块类型
		  * */
		 var msg='';
		 function news_list(id){
		 	/*跨域（可跨所有域名）*/
		 	$getJSON($URL_INDEX_NEWS+"/API.php?m=list&id="+id+"&s=6&p=1",function(subres){
				subres=eval('('+subres+')');
		 		for(var j=0;j<6;j++){
		 			msg+=' <div class="list">';
		 			if(j<2){
		 				msg+='<a href="/pages/dasai/news_detail.html?id='+subres.new_list[j].id+'"  target="_blank" style="color: #ea393c;">'+subres.new_list[j].title.substring(0,16)+'</a>';
		 			}else{
		 				msg+='<a href="/pages/dasai/news_detail.html?id='+subres.new_list[j].id+'"  target="_blank" >'+subres.new_list[j].title.substring(0,16)+'</a>';
		 			}msg+='<p>'+subres.new_list[j].content.substring(0,63)+'......</p>';
		 			msg+='</div>';
		 		}
		 		$("#clearfix").html(msg);
		 	});
		 }
		 /**
		 * 通知块
		 * msg2：ajax拼接字符串到html
		 * id：需要修改的通知块类型
		 * */

		 var msg2='';

		 function notice_list(id){
		 	$getJSON($URL_INDEX_NEWS+"/API.php?m=list&id="+id+"&s=6&p=1",function(data){
				data=eval('('+data+')');
		 		for(var j=0;j<6;j++){
		 			msg2+=' <div class="list">';
		 			if(j<2){
		 				msg2+='<a href="/pages/dasai/news_detail.html?id='+data.new_list[j].id+'"  target="_blank" style="color: #ea393c;">'+data.new_list[j].title.substring(0,16)+'</a>';
		 			}else{
		 				msg2+='<a href="/pages/dasai/news_detail.html?id='+data.new_list[j].id+'"  target="_blank" >'+data.new_list[j].title.substring(0,16)+'</a>';
		 			}
		 			msg2+='<p>'+data.new_list[j].content.substring(0,63)+'......</p>';
		 			msg2+='</div>';
		 		}
		 		$("#clearfixnotice").html(msg2);
		 	});
		 }
		 $(function(){
		 	//news_list(19);
		 	//notice_list(20);

			 ajaxForm($("#userDepartment"),function(res){
				 console.log(res);
				 if(res.resultCode===0){ //成功注册
					 window.location.reload();

				 }else{ //失败
					 $("#collegeDepartment_error").text(res.resultMsg?res.resultMsg:"服务器繁忙,请稍微再试.");

				 }


			 },"/api/action/audit/addCollegeDepartment",function(){
				 var flag=true;

				 if(!$("#collegeDepartment").val()){
					 $("#collegeDepartment_error").text("请输入您当前账号所属部门");
					 flag=false;
				 }

				 return flag;
			 });

			initRefreshImgCode($("#updateMobile"));//重置验证码
			 ajaxForm($("#updateMobile"),function(res){
				 console.log(res);
				 if(res.resultCode===0){ //成功注册
					 window.location.reload();
				 }else if(res.resultCode==300008){
					 $("#mobile_sendvcode_error").text("您接收到的验证码填写错误");

				 }else{ //失败
					 $("#mobile_sendvcode_error").text(res.resultMsg?res.resultMsg:"服务器繁忙,请稍微再试.");
					 refreshImgCode($("#updateMobile"));//重置验证码
				 }


			 },"/api/action/account/updateMobile",function(){
				 var flag=true;
				 if(!$("#mobile_accountMobile").val()){
					 Validate.handlePass(false, $("#mobile_accountMobile"),"请输入您的手机号");
					 flag=false;
				 }
				 if(!$("#mobile_vcode").val()){
					 $("#mobile_vcode_error").text("请输入图片验证码");
					 flag=false;
				 }
				 if(!$("#mobile_sendvcode").val()){
					 $("#mobile_sendvcode_error").text("请输入您收到的验证码");
					 flag=false;
				 }
				 return flag;
			 });
			 $("#mobile_sendCodeBtn").click(function(){
				 if($(this)[0].disabled){
					 return;
				 }
				 var accountMobile=$("#mobile_accountMobile");
				 //如果不是手机号也不是邮箱
				 if(!Validate.phone(accountMobile)){
					 Validate.handlePass(false, $("#mobile_accountMobile"),"请填写正确的手机号");
					 return ;
				 }
				 //图片验证码错误
				 if($("#mobile_vcode").attr("pass")!="true"){
					 $("#mobile_vcode_error").text("图片验证码错误");
					 refreshImgCode($("#updateMobile"));
					 return;
				 }



				 $.ajax({
					 url: $URL_ACCOUNT + "/api/action/account/islogin",
					 type: "POST",
					 data: {login: $("#mobile_accountMobile").val()},
					 xhrFields: {withCredentials: true},
					 success: function (res) {
						 console.log(res);
						 if(res.resultCode!=0){
							 $ajax({
								 url:$URL_THIRDINTERFACE+"/api/action/directmail/sendValiCode",
								 data:{emailOrPhone:accountMobile.val(),vcode:$("#mobile_vcode").val()},
								 type:"POST",
								 success:function(res){
									 console.log(res);
									 if(res.resultCode===0){

									 }else if(res.resultCode==300008){//图片验证码错误
										 refreshImgCode($("#updateMobile"));//重置验证码
										 $("#mobile_vcode_error").text("图片验证码错误");
									 }
								 }
							 } );

							 $("#mobile_sendCodeBtn")[0].disabled=true;
							 $("#mobile_sendCodeBtn").attr("disabled","disabled");
							 $("#mobile_sendCodeBtn").text("重发(60)");
							 sendVCodeTime=setInterval(waitReSendValiCode,1000);
						 }else{
							 $("#mobile_sendvcode_error").text("该号码已被绑定");
						 }
					 }
				 });


			 });
			 $ajax({url:"/api/action/account/current/sessionkey",success:function(res){
				 refreshImgCode();
			 }}); //获取sessionkey
		 });
		var sendVCodeTimeI=60;
		var sendVCodeTime=null;
		function waitReSendValiCode(){
			sendVCodeTimeI--;
			if(sendVCodeTimeI<1){
				$("#mobile_sendCodeBtn")[0].disabled=false;
				$("#mobile_sendCodeBtn").removeAttr("disabled");
				$("#mobile_sendCodeBtn").css("cursor","pointer");
				clearInterval(sendVCodeTime);
				$("#mobile_sendCodeBtn").text("发送验证码");
				sendVCodeTimeI=60;
				return;
			}

			$("#mobile_sendCodeBtn").attr("disabled","disabled");
			//$("#sendCodeBtn").removeAttr("disabled");
			$("#mobile_sendCodeBtn").css("cursor","inherit");
			$("#mobile_sendCodeBtn")[0].disabled=true;
			$("#mobile_sendCodeBtn").text("重发("+sendVCodeTimeI+")");

		}
	}
]);
Validate.handlePass=function(flag,ele,msg){
	var msg_box = findNextErrBox(ele);
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

var findNextErrBox=function(ele){
	if($(ele).next().length>0&&$(ele).next().is(".err")){
		return $(ele).next();
	}
	if($(ele).parent().next().length>0&&$(ele).parent().next().is(".err")){
		return $(ele).parent().next();
	}
}
$(function(){
	$("input:text,input:password").val("");
})
function link(id){

	window.location.href="/pages/dasai/news_detail.html?id="+id;
	
}

if(window!=window.top){
	window.top.location.reload();
}
//首页左上边的蓝桥杯介绍
function dasai(){
 	$getJSON($URL_INDEX_NEWS+"/API.php?id=614",function(data){
		data=eval('('+data+')');
// 		暂时不用，后面修改
// 		$("#dasaibei_title").html(data.title.substring(0,20)+"...");
 		$("#dasaibei_content").html(data.content.substring(0,570)+"...");

 	});
 } 
//dasai();

