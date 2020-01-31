var mustShowMcId=2; //电子类的要求选择赛项
$(function(){
    $('#checkAll').click(function(){
        if($('#checkAll').is(':checked')){
        	$("input[name='matchid']").prop('checked',true);
        }else{
        	$("input[name='matchid']").prop('checked',false);
        }
         
    })
	console.log($(":radio[name='matchCategoryId']"))
	$(":radio[name='matchCategoryId']").click(function(){
		if($(this).val()==mustShowMcId){
			$("#itemlist").show();
		}else{
			$("#itemlist").hide();
		}
	});
})

lanqiaoApp.controller('matchListCtrl', ['$scope', '$http',function ($scope, $http) {
	$scope.selectedProvinces='';
	$scope.selectedCitys='';
	$scope.citys='';
	$scope.ids='';
	$scope.list2=[];
	$scope.ch=function(){
		 var i=0;
	        var arr=$('tbody').find('input').length;
	        $('tbody input').each(function(){
	            if($(this).is(':checked')){
	                i++;
	            }
	        })
	        if(i==arr){
	            $('#all').addClass("active");
	            $("#checkAll").prop('checked',true);
	        }else{
	            $('#all').removeClass("active");
	            $("#checkAll").prop('checked',false);
	        }
	}
	$scope.getSelect =function(obj){
//		console.log(obj);
    	$http.post($URL_THIRDINTERFACE+'/api/action/areas/findAreas').success(function (res) {
    		if(obj){
    			$scope.selectedProvinces=obj.citiesProvinceCode;
    			
    		}
    		$scope.regionData = res.resultData;
    	});
	}
	$scope.getSelect();
	$scope.getCities=function(){
		if($("#provinceCodeSelect").val()){
			$http.post($URL_THIRDINTERFACE+'/api/action/areas/findAreas',{citiesProvinceCode:$(".clearfix.updateTeacherscope").scope().contact.citiesProvinceCode}).success(function (res) {
				if(res.resultCode===0&&res.resultData&&res.resultData.length>0)	{
					$scope.citys = res.resultData;
				}
			});
		}else{
			$scope.citys='';
			console.log($("#provinceCodeSelect").val())
		}
		
	}
	$scope.cityChange=function(){
		if(!$("#provinceCodeSelect").val()||!$("#citieCodeSelect").val()){
			$("#sel").html('<span style="display: inline-block;height: 18px; width: 18px; background: url('+$STATIC_URL+'/dasai/images/icon/icon-fail.png) no-repeat center;background-size: 18px 18px;vertical-align: middle;margin-top: -2px;margin: -2px 5px 0 0;"></span><span class="msg">请选择地市</span>');
			
		}else{
			$("#sel").html('<span class="icon ok"></span>');
		}
	}
	$scope.edit=function(obj){
		$scope.object=obj;
//		console.log(obj);
		$scope.getSelect(obj);
		$http.post($URL_THIRDINTERFACE+'/api/action/areas/findAreas',{citiesProvinceCode:obj.citiesProvinceCode}).success(function (res) {
			if(res.resultCode===0&&res.resultData&&res.resultData.length>0)	{
//				console.log(res)
				$scope.citys = res.resultData;
			}
		});
		if(obj.authStatusId===2||obj.authStatusId===5){
	        $(".clearfix.updateTeacherscope").scope().contact=obj;
	        showDialog('.updateTeacher');

	        $("form").find("input[name='matchCategoryId']").each(function(){
	        	if($(this).val()==obj.matchCategoryId){
	        		console.log(111)
	        		$(this).prop("checked",true);
	        		$(this).parent("label").addClass("active");
					if(obj.matchCategoryId==mustShowMcId){
						$("#itemlist").show();
					}else{
						$("#itemlist").hide();
					}
	        	}else{
	        		console.log(0)
	        		$(this).parent("label").removeClass("active");
	        		$(this).prop("checked",false);
	        	}

	        })
	        $(".updateTeacher").css("height",$(document).height()+"px");
		}else{       
			return;
        }
		$("#itemlist :radio").each(function(){
			if($(this).val()==obj.subItemIds){
				$(this)[0].checked=true;
			}else{
				$(this)[0].checked=false;
			}
		})
	}
	
	$scope.updataMatchPoint=function(){
		var formMatchPoint=$("#updateContactForm");
		console.log(formMatchPoint.serialize());
		if(!$scope.subForm(formMatchPoint)){
			return;
		}
		$http.post($URL_LANQIAOBEIDASAI+"/api/matchPoint/updateMatchPoint",formMatchPoint.serialize()).success(function(data){
//			console.log(res);
			if(data.resultCode===0){
				$scope.closeUpdata();
        		// $scope.getMatcgList();
        	}else{
    			$.yehDialog({
	            dialogWidth:345,
	            title:"信息",
	            content:'<p>'+data.resultMsg+'</p>',
	            okText:"确定",
	            ok: function() {
	                $( this ).dialog( "close" );
	            }
			});
    		}
		});
	}
	$scope.closeUpdata=function(){
		var formMatchPoint=$("#updateContactForm");
//		console.log(5);
//		console.log(formMatchPoint.serialize());
		$('.dialog').fadeOut();
		$('.dialog').find("form").find(".msg-box,.err").text("");
		$('.dialog').find("form").find("input:text:visible").removeAttr("style");
		$('.dialog').find("form").find("textarea").css("border-color","#c8d2d7");
		$('.dialog').find("form").find("span").remove();
		$scope.getMatcgList();
		// window.location.href="/pages/dasai/match_point_wait_apply.html";

	}	
	$scope.closeUpdata2=function(){
		$scope.list2=[];
		$('.dialog').fadeOut();
	}
	$scope.objecttmp=new Object();
	$scope.writeProp=function(obj){
		showDialog('.venue-confirm');
		$scope.objecttmp=obj;

	}
	$scope.ok=function(){
		console.log($scope.objecttmp);
		var id=$scope.objecttmp.matchPointAuthId;
		if($scope.objecttmp.authStatusId===2||$scope.objecttmp.authStatusId===5){
			return;
		}else{
			window.location.href="/pages/dasai/matchpoint/match_point_write_prop.html?id="+id;
		}
	}
	$scope.ok2=function(){
		var chk_value =[]; 
		$("input[name='matchid']:checked").each(function(){ 
			chk_value.push($(this).val()); 
			console.log(chk_value);
		}); 
		for(var i=0;i<chk_value.length;i++){
			if(i<chk_value.length-1){
				$scope.ids+=chk_value[i]+'-';
			}else{
				$scope.ids+=chk_value[i];
			}
		}
		window.location.href="/pages/dasai/matchpoint/match_point_write_prop.html?id="+$scope.ids;
		$scope.ids='';
	}
	$scope.jqchk=function(){ //jquery获取复选框值 
//		alert();
		var chk_value =[]; 
		$("input[name='matchid']:checked").each(function(){ 
			chk_value.push($(this).val()); 
			console.log(chk_value);
		}); 
		
		if(chk_value.length>0){
			
			showDialog('.list');
			for(var j=0;j<chk_value.length;j++){
				for(var k=0;k<$scope.matchList.length;k++){
					if(chk_value[j]==$scope.matchList[k].matchPointAuthId){
						$scope.list2.push($scope.matchList[k]);
					}
					
				}
			}
		}else{
			$.yehDialog({
	            dialogWidth:345,
	            title:"信息",
	            content:'<p class="h5">您未选择赛点信息</p>',
	            okText:"确定",
	            ok:function(){
	                 $( this ).dialog( "close" );
	            },
	           
			});
		}
	} 
	$scope.matchList=[];
	$scope.object=new Object();
	$http.post('/api/action/timeaxis/item/li/item').success(function (res) {
		if(res.resultCode===0&& res.resultData&&res.resultData.timeAxis){
			var currentItems =[];
			var lqmfp= res.resultData.timeAxis.lqmfp;
			for(var i in lqmfp){
				if(lqmfp[i].matchCategoryId==mustShowMcId){
					var itemTemp={
						itemId:lqmfp[i].itemId,
						itemName:lqmfp[i].itemName
					}
					currentItems.push(itemTemp);
				}
			}
			$scope.currentItems=currentItems;
			console.log($scope.currentItems)
		}
	});
	$scope.getMatcgList=function(){
		$http.post($URL_LANQIAOBEIDASAI+"/api/matchPoint/matchPointAuthList").success(function(data){
			if(data.resultData&&data.resultData.list&&data.resultData.list.length>0){
				$scope.matchList=data.resultData.list;
				console.log($scope.matchList)
				var i=0;
				var k=0;
				var m=0;
				for(var j=0; j< data.resultData.list.length;j++){
					if(data.resultData.list[j].authStatusId==4){
						i=i+1;
//						console.log("i:"+i)
					}else if(data.resultData.list[j].authStatusId==5){
						k=k+1;
					}else{
						m=m+1;
					}
					if(data.resultData.list[j].matchCategoryId==mustShowMcId&& data.resultData.list[j].subItemIds){//子类型
						data.resultData.list[j].subItemIdsStr="("+ Dict.Item[data.resultData.list[j].subItemIds].substring(0,3)+")";
					}
				}
				if(i===data.resultData.list.length){console.log(3)
					$("#info").text("恭喜贵校成为蓝桥杯赛事的赛点，请签署赛点劳务协议！");
				}else if(k===data.resultData.list.length){
					$("#info").text("很遗憾，贵校未能通过蓝桥杯大赛赛点审核，期待下次合作！");
				}else if(m===data.resultData.list.length){
					$("#info").text("已提交赛点申请相关信息，请您耐心等待后台审核！");
				}else if(i>0&&k>0&&m===0){console.log(1)
					$("#info").text("恭喜贵校成为蓝桥杯赛事的赛点，请签署赛点劳务协议！");
				}else if(i>0&&k===0&&m>0){console.log(1)
					$("#info").text("感谢贵校对蓝桥杯大赛的支持，部分赛点还在审核中，请耐心等待！");
				}else if(i===0&&k>0&&m>0){console.log(1)
					$("#info").text("感谢贵校对蓝桥杯大赛的支持，部分赛点还在审核中，请耐心等待！");
				}else if(i>0&&k>0&&m>0){
//					console.log(2)
					$("#info").text(" 感谢贵校对蓝桥杯大赛的支持，部分赛点还在审核中，请耐心等待！");
				}
			}else{
				$("#info").text("第八届蓝桥杯大赛开始申请赛点了，期待贵校的加入！");
				$("#tabId").addClass("hide");
			}
//			console.log(1)
//			console.log($scope.matchList);
			setTimeout(function(){ resetCheckBox($("#tbodyId"))},500);
		});
	}

	$scope.getMatcgList();

	$scope.seepop=function(obj){
		
		var id=obj.matchPointAuthId;
//		if(obj.authStatusId===4||obj.authStatusId===5||obj.expressStatus){
		if(obj.authStatusId===2 || obj.authStatusId === 5){
			window.location.href="/pages/dasai/matchpoint/match_point_confirm.html?id="+id;
		}else if(obj.authStatusId===4&&!obj.expressNumber){
//			console.log(obj);
			window.location.href="/pages/dasai/matchpoint/match_point_write_prop.html?id="+id;
		}else if(obj.authStatusId===4&&obj.expressNumber&&obj.expressStatus==false){
			window.location.href="/pages/dasai/matchpoint/send_prop.html?id="+id;
		}else if(obj.authStatusId===4&&!obj.expressNumber&&obj.expressStatus==true){
			window.location.href="/pages/dasai/matchpoint/comm_audit_confirm.html?id="+id;
		}else if(obj.authStatusId===4&&obj.expressNumber&&obj.expressStatus==true){
			window.location.href="/pages/dasai/matchpoint/comm_audit_confirm.html?id="+id;
		}
		
	}
	$scope.del=function(obj){
//		console.log(obj);
		if(obj.authStatusId===2||obj.authStatusId===5){
			$.yehDialog({
	            dialogWidth:445,
	            title:"信息",
	            content:'<p>您将要删除名称为[ '+obj.matchPointName+' ]的赛点,是否继续?</p>',
	            okText:"确定",
	            cancelText:"取消",
	            delId:obj.matchPointAuthId,
	            ok:function(){
	                $http.post(
	                		$URL_LANQIAOBEIDASAI+"/api/matchPoint/delMatchPoint"
	                    ,{matchPointAuthId:obj.matchPointAuthId} //contactId
	                ).success(function(data){
	                	if(data.resultCode===0){
	                		$scope.getMatcgList();
	                	}else{
	            			alert(data.resultMsg)
	            		}
	                });
	            },
	            Cancel: function() {
	                $( this ).dialog( "close" );
	            }
			});
        }else{
        	return;
        }
	}
	
	$scope.subForm=function (ele){
		var noPass = 0;
//		console.log(ele.serialize());
		ele.find("input[data-rule]").each(function(){
			var rule = $(this).data("rule").split(":");
				method = rule[0],
				msg = rule[1];
			var isPass = Validata.handlePass(Validata[method]($(this)),$(this),msg);
			if(!isPass){
				noPass++;
			}else {
				if(rule.length>2){
					methodlen=rule[2];
					msglen=rule[3];
					isPass=Validata.handlePass(Validata[methodlen]($(this)), $(this), msglen);
					if(!isPass){
						noPass++;
					}
				}
			}
		});
		ele.find("textarea[data-rule]").each(function(){
			var rule = $(this).data("rule").split(":");
				method = rule[0],
				msg = rule[1];
				methodlen=rule[2];
				msglen=rule[3];
			var isPass = Validata.handlePass(Validata[method]($(this)),$(this),msg);
			if(!isPass){
				noPass++;
			}else{
				isPass=Validata.handlePass(Validata[methodlen]($(this)), $(this), msglen);
				if(!isPass){
					noPass++;
				}
			}
		});
		if(!$("#provinceCodeSelect").val()||!$("#citieCodeSelect").val()){
			$("#sel").html('<span style="display: inline-block;height: 18px; width: 18px; background: url('+$STATIC_URL+'/dasai/images/icon/icon-fail.png) no-repeat center;background-size: 18px 18px;vertical-align: middle;margin-top: -2px;margin: -2px 5px 0 0;"></span><span class="msg">请选择地市</span>');
			noPass++;
		}else{
			$("#sel").html('<span class="icon ok"></span>');
		}
		ele.find("select[data-rule]").each(function(){
			var method = $(this).data("rule").split(":")[0];
			var isPass = Validata[method]($(this));
			if(!isPass){
				noPass++;
//				console.log(12)
				$(this).css("border-color","#c8d2d7")
				$(this).next(".dropdown").html('<span style="display: inline-block;height: 18px; width: 18px; background: url('+$STATIC_URL+'/dasai/images/icon/icon-fail.png) no-repeat center;background-size: 18px 18px;vertical-align: middle;margin-top: -2px;margin: -2px 5px 0 0;"></span><span class="msg">请选择地址</span>');
			}else{
//				console.log(1234)
				$("#sel").html('<span class="icon ok"></span>');
			}
		});
		var i=0;
		var temp=0;
		ele.find("input:radio").each(function(){
			var ch=$(this).prop("checked");
	
			//验证是软件类被选中
			console.log($(this).prop("name")+"      "+$(this).val()+"            "+ch)
			if($(this).prop("name")=="matchCategoryId"&&$(this).val()==1&&ch){
				console.log("软件     ")
				
				console.log($(this).prop("name")+"      "+$(this).val()+"            "+ch)
				console.log("     "+noPass)
				return false;
			}else if($(this).prop("name")=="matchCategoryId"&&$(this).val()==2&&ch){
				temp=1;
			}
			if(temp==1){
				if(!ch){
					i=i+1;
				}else{
					i=0;
				}		
				if(i==2){
					noPass++;
					$("#itemlist").find(".msg-box").html('<span style="display: inline-block;height: 18px; width: 18px; background: url('+$STATIC_URL+'/dasai/images/icon/icon-fail.png) no-repeat center;background-size: 18px 18px;vertical-align: middle;margin-top: -2px;margin: -2px 5px 0 0;"></span><span class="msg">请选择赛点类型</span>');
					i=0;
				}
			}
		})
		if(noPass>0){
//			console.log(noPass);
			return false;
		}else{
			return true;
		}
	}
	
	 $scope.myObj = {
			    "color" : "#19BB9B",

			  }
	 $scope.myObjt = {
			    "color" : "#778a99",
			  }
}]);

$(function(){
	$("body").on("click","#itemlist :radio",function(){
		$("#itemlist").find(".msg-box").html('<span class="icon ok"></span>')
		
	});
	$("body").delegate("input,textarea","blur",function(e){
		$("form textarea[data-rule]").blur(function(){
			var rule = $(this).data("rule").split(":");
				method = rule[0];
				methodlen=rule[2];
				msglen=rule[3];
			var isPass = Validata.handlePass(Validata[method]($(this)),$(this),msg);
			if(!isPass){
				
			}else{
				Validata.handlePass(Validata[methodlen]($(this)), $(this), msglen);
				
			}
		});
		$("form input[data-rule]").blur(function(){
			var rule = $(this).data("rule").split(":");
				method = rule[0];
				msg = rule[1];
				var isPass = Validata.handlePass(Validata[method]($(this)),$(this),msg);
				if(!isPass){
				}else {
					if(rule.length>2){
						methodlen=rule[2];
						msglen=rule[3];
						isPass=Validata.handlePass(Validata[methodlen]($(this)), $(this), msglen);
					}
				}
		});
		// setTimeout(function(){ 
			// resetCheckBox($("#tbodyId"))
		// },500);
	});
	$("body").delegate("select","change",function(e){

		$("select[data-rule]").change(function(){
			
			var method = $(this).data("rule").split(":")[0];
			var isPass = Validata[method]($(this));
			if(!isPass){
//				console.log(11111111111111);
				$(".dropdown").html('<span style="display: inline-block;height: 18px; width: 18px; background: url('+$STATIC_URL+'/dasai/images/icon/icon-fail.png) no-repeat center;background-size: 18px 18px;vertical-align: middle;margin-top: -2px;margin: -2px 5px 0 0;"></span><span class="msg">请选择地址</span>');
			}else{
//				console.log($("#sel").html());
				$("#sel").html('<span class="icon ok"></span>');
			}
		});
		$("select[data-rank]").change(function(){
			$(".dropdown").html('');
//			console.log(33333333333333)
		});
	});
	
})
var Validata = ({
	address:function(ele){
		var val = ele.val();
		return val==='0'?false:true;
	},
	arealen:function(ele){
		var len = ele.val().length;
		return len>=500?false:true;
	},
	addresslen:function(ele){
		var len = ele.val().length;
		return len>=100?false:true;
	},
	number : function(ele){
		var val = ele.val();
		return /^\d+$/.test(val);
	},
	postal:function(ele){
		var val = ele.val();
		return  /^[1-9][0-9]{5}$/.test(val);
	},
	require:function(ele){
		var val = ele.val();
		return !/^\s*$/g.test(val);
	},
	email:function(ele){
		var val = ele.val();
		return /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(val)
	},
	phone:function(ele){
		var val = ele.val();
		return /^13[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$/.test(val);
	},
	length:function(ele){
		var val = ele.val();
		return val.replace(/[^\x00-\xff]/g, '__').length;
	},
	zh_verify:function(ele){
		var val = ele.val();
		var min = ele.data("param").split(",")[0];
		var max = ele.data("param").split(",")[1];
		if( /^[\u4e00-\u9fa5]+$/.test(val) ){
			var length = val.length;
			return val.length>=min && val.length<=max;
		}
		return false;
	},
	range:function(ele){//字母或汉字开头,min-max位组成
		var val = ele.val();
		var min = ele.data("param").split(",")[0];
		var max = ele.data("param").split(",")[1];
		return val.length>=min && val.length<=max
	},
	password:function(ele){//数字＋字母,min-max位组成
		var val = ele.val();
		var min = ele.data("param").split(",")[0];
		var max = ele.data("param").split(",")[1];
		if( /^[A-Za-z0-9]+$/.test(val) ){
			var length = val.length;
			return val.length>=min && val.length<=max;
		}
		return false;
	},
	maxNum:function(ele){//小于max的数字
		var val = ele.val();
		var max = ele.data("param").split(",")[0];
		if( /^[0-9]+$/.test(val) ){
			return val>max;
		}
		return false;
	},
	handlePass:function(flag,ele,msg){
		var msg_box = ele.next().size()>0 ? ele.next():$('<div class="msg-box"></div>');
		if(!ele.next().size()>0){
			msg_box.appendTo(ele.parent());
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
});








