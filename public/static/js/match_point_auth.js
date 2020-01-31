var mustShowMcId=2; //电子类的要求选择赛项

function submitFun(){
	var formvalue=$("#applyMatchPoint");
//	console.log(formvalue.serialize());
	var formVals= FormUtil.formSerializeObj(formvalue,true);
	if(!subForm(formvalue)){
		return;
	}
	$.post($URL_LANQIAOBEIDASAI+"/api/matchPoint/applyMatchPoints",formvalue.serialize(),function(data){
		if(data.resultCode===0){
			window.location.href="/pages/dasai/match_point_wait_apply.html"; 
		}else{
			showAlert(0,data.resultMsg);
//			$.yehDialog({
//	            dialogWidth:345,
//	            title:"信息",
//	            content:'<p>'+data.resultMsg+'</p>',
//	            okText:"确定",
//	            ok: function() {
//	            	location.reload();
////	                $( this ).dialog( "close" );
//	            }
//			});
		}
    });
}
function clearFun(){
	$('#applyMatchPoint')[0].reset();
	$('#applyMatchPoint').find(".msg-box").html('');
	$('#applyMatchPoint').find(".dropdown").html('');
	$('#applyMatchPoint').find('input,select,textarea').css('border-color','');
	$('#applyMatchPoint').find('.radio').css('active','');
	window.location.href=window.location.href; 
	window.location.reload; 
//	history.pushState({}, "赛点申请", "/pages/dasai/match_point_auth.html");
//	history.replaceState(null, "赛点申请", "/pages/dasai/match_point_auth.html");
}

$(function(){
	$("body").on("click","#applyMatchPoint :radio", function() {
		$(this).parent().addClass("active").siblings().removeClass("active");
		$(this).parent().find("input[type='radio']").removeAttr('checked');
		$(this).parent().find("input[type='radio']").prop('checked', true);
//		console.log($(this).closest(".radio").closest(".list").find("span:last-child").html())
		$(this).closest(".radio").closest(".list").find("span:last-child").html('<span class="icon ok"></span>');
		var $index=$(this).parents(".addpoint").attr("index");

		if($(this).attr("value")==mustShowMcId){ //如果是要求选择赛项的赛类
			$(this).parents(".mclist").siblings(".itemlist").show();
			$pointFormScope.changeBindItem($index);
			$pointFormScope.$apply();
		}else{
			$(this).parents(".mclist").siblings(".itemlist").hide();
			$pointFormScope.points[$index].subItemIds=null;
			$pointFormScope.$apply();
			//$(this).parents(".mclist").siblings(".itemlist").find(".msg-box").html("");
		}

	});
	$("body").delegate("input,textarea","blur",function(e){
		$("form textarea[data-rule]").blur(function(){
			var rule = $(this).data("rule").split(":");
				method = rule[0];
				msg=rule[1];
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
		
//		$("input[type='radio']").on("click", function() {
//			$(this).parent().addClass("active").siblings().removeClass("active");
//			$(this).parent().find("input[type='radio']").removeAttr('checked');
//			$(this).parent().find("input[type='radio']").prop('checked', 'checked');
////			console.log(9);
////			console.log($(this).closest(".radio").next(".msg-box").html())
////			console.log($(this).closest(".radio").closest(".list").find("span:last-child").html())
//
//		});
		
	});
	

	$("body").delegate("select","change",function(e){
		$("select[data-rule]").change(function(){

			var method = $(this).data("rule").split(":")[0];
			var isPass = Validata[method]($(this));
			if(!isPass){
				$(this).closest(".dropdown").next().html('<span style="display: inline-block;height: 18px; width: 18px; background: url('+$STATIC_URL+'/dasai/images/icon/icon-fail.png) no-repeat center;background-size: 18px 18px;vertical-align: middle;margin-top: -2px;margin: -2px 5px 0 0;"></span><span class="msg">请选择地市</span>');
			}else{
				$(this).next(".dropdown").html('<span class="icon ok"></span>');
			}
		});
		$("select[data-rank]").change(function(){
			$(this).next().next(".dropdown").html('');
		});
	});

	$("body").on("click","#applyMatchPoint .itemlist :checkbox",function(){
		var selectedMc=$(this).parents(".itemlist").siblings(".mclist").find(":radio:checked").attr("value");
		if(selectedMc==mustShowMcId){
			var selectedItem=$(this).parents(".itemlist").find(":checkbox:checked").attr("value");
			if(!selectedItem){
				Validata.handlePass(false, $(this), "请选择该赛点能支持的赛项",$(this).parents(".itemlist").find(".msg-box"));
			}else{
				Validata.handlePass(true, $(this), "",$(this).parents(".itemlist").find(".msg-box"));
			}
		}
	});
	
})

lanqiaoApp.controller('authCtrl', ['$scope', '$http',function ($scope, $http) {
	$scope.points=[];
	$scope.points.push(new Object());
	window.$pointFormScope=$scope;
	$scope.addMorePoint=function(){
		$scope.points.push(new Object());
	}
	$scope.deletePoint=function($index){
		$scope.points.splice($index,1);
	}
	$scope.selectedProvinces=[];
	$scope.selectedCitys=[];
	$scope.citys=[];
	$scope.getSelect =function(){
    	$http.post($URL_THIRDINTERFACE+'/api/action/areas/findAreas').success(function (res) {
    		$scope.regionData = res.resultData;
//    		console.log($scope.resultData);
    	});
	}

	$scope.changeBindItem=function($index){
		var subItemIds=[];
		$(".itemlist:eq("+$index+")").find(":checkbox:checked").each(function(){
			subItemIds.push(
				{
					name: $(this).parent().text().trim().substr(0, 3),
					itemId: $(this).attr("value")
				}
			);
		});
		$scope.points[$index].subItemIds=subItemIds;
	}
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
	$scope.addid=false;
	$scope.subid=false;
	$scope.cancelid=false;
	$scope.isApplyed=false;
	$scope.hasMathPoint=false;
	$scope.goToApply=function(){
		console.log(11111)
		$scope.isApplyed=true;
	}
	$scope.initHTML=function(){
		
		$http.post($URL_LANQIAOBEIDASAI+"/api/matchPoint/matchPointAuthList").success(function(data){
			//console.log(data.resultData.list.length);
			if(data.resultData&&data.resultData.list&&data.resultData.list.length>0){
				$scope.isApplyed=true;
				$scope.hasMathPoint=true;
			}else{
				$scope.isApplyed=false;
			}
		});
		$.post($URL_LANQIAOBEIDASAI+"/api/matchPoint/getMatchPointApplyEndTime",function(data){
			if(data.resultCode==0) {
				var itemApplayEndDate;
				if(data.resultData&&data.resultData.indexOf("-")>0){
					itemApplayEndDate=data.resultData.replace(/-/g,"/");
				}
				var EndTime = new Date(itemApplayEndDate); //截止时间
				var NowTime = new Date();
				var t = EndTime.getTime() - NowTime.getTime();
				$scope.applyEndDate = data.resultData ? h5.time.date("Y年m月d日",data.resultData)  : '';
				if ( t>=0) {
					console.log(data);
					$scope.addid = true;
					$scope.subid = true;
					$scope.cancelid = true;

				}
			}
	});
	}
	$scope.initHTML();
	$scope.getSelect();
	
	$scope.getCities=function(index){
		if($scope.selectedProvinces[index]){
			$http.post($URL_THIRDINTERFACE+'/api/action/areas/findAreas',{citiesProvinceCode:$scope.selectedProvinces[index]}).success(function (res) {
				if(res.resultCode===0&&res.resultData&&res.resultData.length>0)	{
					$scope.citys[index] = res.resultData;
				}
			});
			
		}else{
			$scope.citys[index]=''; 
		}
	}
}]);
	setTimeout(function(){ applyTime();},500);
function applyTime(){
	
}
function subForm(ele){
	var noPass = 0;
	ele.find("input[data-rule]:visible").each(function(){
		var rule = $(this).data("rule").split(":");
			method = rule[0];
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
			var isPass;
		if($(this).val()=='赛点描述，输入不超过500字'){
			 isPass= Validata.handlePass(false,$(this),msg);
		}else{
			isPass = Validata.handlePass(Validata[method]($(this)),$(this),msg);
		}
		if(!isPass){
			noPass++;
		}else{
			isPass=Validata.handlePass(Validata[methodlen]($(this)), $(this), msglen);
			if(!isPass){
				noPass++;
			}
		}
	});
	
	ele.find("select[data-rule]").each(function(){
		var method = $(this).data("rule").split(":")[0];
		var isPass = Validata[method]($(this));
		if(!isPass){
			noPass++;
			$(this).next(".dropdown").html('<span style="display: inline-block;height: 18px; width: 18px; background: url('+$STATIC_URL+'/dasai/images/icon/icon-fail.png) no-repeat center;background-size: 18px 18px;vertical-align: middle;margin-top: -2px;margin: -2px 5px 0 0;"></span><span class="msg">请选择地市</span>');
		}else{
			$(this).closest(".msg-box").next().html('<span class="icon ok"></span>');
		}
	});
	
	var i=0;
	var j=0;
	ele.find("input:radio").each(function(){
		var ch=$(this).prop("checked");
		console.log(ch);
		j++;
		if(!ch){
			i=i+1;
			console.log('chi:'+i+' ,j:'+j)
		}else{
			i=0;
		}
		if(i==2){
			noPass++;
			$(this).closest(".ml10").next(".msg-box").html('<span style="display: inline-block;height: 18px; width: 18px; background: url('+$STATIC_URL+'/dasai/images/icon/icon-fail.png) no-repeat center;background-size: 18px 18px;vertical-align: middle;margin-top: -2px;margin: -2px 5px 0 0;"></span><span class="msg">请选择赛点类型</span>');
			i=0;
		}
		if(j%2==0){
			console.log('j%=2,i=:'+i+' ,j:'+j)
			i=0;
		}
	})
	ele.find(".itemlist").each(function(){
		var selectedMc=$(this).siblings(".mclist").find(":radio:checked").attr("value");
		if(selectedMc==mustShowMcId){
			var selectedItem=$(this).find(":checkbox:checked").attr("value");
			if(!selectedItem){
				var isPass=Validata.handlePass(false, $(this), "请选择该赛点能支持的赛项",$(this).find(".msg-box"));
				if(!isPass){
					noPass++;
				}
			}else{
				Validata.handlePass(true, $(this), "",$(this).find(".msg-box"));
			}
		}
	});
	if(noPass>0){
		return false;
	}else{
		return true;
	}
}

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
	handlePass:function(flag,ele,msg,show_msg_box){
		var msg_box =show_msg_box?show_msg_box:(ele.next().size()>0 ? ele.next():$('<div class="msg-box"></div>'));
		if(!show_msg_box&&!ele.next().size()>0){
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


/**
$(function(){
	subForm($("form"));    			
});
var newTemplate= $(".addpoint:first").prop("outerHTML"); 
function addMore(){ 

	$(".tmp").after(''+newTemplate);				       		
}
function delPoint(obj){       			 		
	$(obj).parent().remove();
}*/
