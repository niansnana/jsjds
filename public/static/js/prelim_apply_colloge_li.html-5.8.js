
lanqiaoApp.controller('prelimListAppCtrl', ['$scope', '$http',function ($scope, $http) {
	 $scope.period=new Object();
	$scope.init=function(){
//		$scope.getPeriodSelect();
		$scope.searchList();
	}
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
			}
		});
	}
	$scope.findPrelimTime()
	$scope.searchList=function(){
		$http.post($URL_LANQIAOBEIDASAI+"/api/perlimMatch/match/list",{periodId: $scope.period}).success(function (res) {
		    if(res.resultCode===0){
		    	if(res.resultData.length>0){
		    		$scope.recordList=res.resultData;

		    	}else{
		    		
		    	}
		        console.log($scope.recordList);
		    }
		})
	};
	$scope.showDialogMatch=function(){
		if($scope.prelimTime.start.open&&!$scope.prelimTime.end.ope){
			//已开启并且未结束
		}
		if(!$scope.prelimTime.start.open){
			//未开启
			showAlert(0,"选拔赛暂未开启，敬请期候。");
			return;
		}
		if($scope.prelimTime.end.open){
			//已结束
			showAlert(0,"选拔赛已经结束，敬请期候下一届。");
			return;
		}
		$(".examDialog.create").show();
		var idarr=["matchName","startTime","matchAddress"];
		var i=0;
		for (i=0;i<idarr.length;i++){
			$("#"+idarr[i]).val("");
		}
		$(".create .radio").removeClass("active").find("input").removeAttr("checked");
	}
	$scope.showDialogMatchEdit=function(id){
		$scope.getMatch(id);
		$(".examDialog.edit").show();
		
	}
	$scope.goMatch=function(pmid,pgid){
		location.href = $URL_LANQIAOBEIDASAI+"/pages/dasai/prelim/prelim_all_stu_apply.html?pmid="+pmid+"&pgid="+pgid;
	}
	$scope.saveMatch=function(){
		var  conuterr=0;
		var matchName=$("#pmatchName").val();
		var groupId=$("#editMatch input[name='pgroupId']:checked").val();
		if(!groupId){
			conuterr=conuterr+1;
			$("#pchid").html("请选择组别");
		}else{
			$("#pchid").html("")
		}
		var prelimMatchId=$("#prelimMatchId").val();
		var matchStartTime=$("#pstartTime").val();
//		alert(matchStartTime)
//		var matchEndTime=$("#pendTime").val();
		var matchAddress=$("#pmatchAddress").val();
		var idarr=["pmatchName","pstartTime","pmatchAddress"];//"pendTime",
		var i=0;
		for (i=0;i<idarr.length;i++){
			if(!$("#"+idarr[i]).val()){
				conuterr=conuterr+1;
				$("#"+idarr[i]).next("p").html("请选择"+$("#"+idarr[i]).attr("placeholder"))
			}else{
				$("#"+idarr[i]).next("p").html("")
			}
		}
		if(conuterr==0){
			$.ajax({
				type : "post",
				url : $URL_LANQIAOBEIDASAI + "/api/perlimMatch/save",	
				data : {
					prelimMatchId:prelimMatchId,
					matchName:matchName,
					prelimGroupId:groupId,
					matchStartTime:matchStartTime,
					matchAddress:matchAddress
				},
				dataType : "json",
				timeout : 60 * 1000,
				success : function(data, textStatus) {
					console.log("success :: " + textStatus);
				    if(data.resultCode==0){
				    	$scope.searchList();
						$(".examDialog.edit").hide();
						showAlert(1,"保存成功")
				    }else if(data.resultCode!=0){
				    	showAlert(0,data.resultMsg,4000);
				    }
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					
				},
				complete : function(XMLHttpRequest, textStatus) {
					
				}
			});
		}
	}
	$scope.getMatch=function(prelimMatchId){
		$.ajax({
			type : "post",
			url : $URL_LANQIAOBEIDASAI + "/api/perlimMatch/match/edit",	
			data : {
				prelimMatchId:prelimMatchId,
			},
			dataType : "json",
			timeout : 60 * 1000,
			success : function(data, textStatus) {
				console.log("success :: " + textStatus);
				$scope.info=data.resultData;
				if(data.resultData.prelimGroupId==1){
					$("#rd1").addClass("active");
					$("#rd2").removeClass("active");
					$("#rd1").find("input").attr("checked",'checked'); ;
					
				}else{
					$("#rd2").addClass("active");
					$("#rd1").removeClass("active");
					$("#rd2").find("input").attr("checked",'checked'); ;
					
				}
				$scope.$apply();
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				
			},
			complete : function(XMLHttpRequest, textStatus) {
				
			}
		});
	}

	var isSaving=false;
	$scope.createMatch=function(){
		var  conuterr=0;
		var matchName=$("#matchName").val();
		var groupId=$("#createMatch input[name='groupId']:checked").val();
		if(!groupId){
			conuterr=conuterr+1;
			$("#chid").html("请选择组别");
		}else{
			$("#chid").html("")
		}
//		var matchTimeLen=$("#matchTimeLen").val();
		var matchStartTime=$("#startTime").val();
//		var matchEndTime=$("#endTime").val();
//		alert(startTime)
		var matchAddress=$("#matchAddress").val();
		var idarr=["matchName","startTime","matchAddress"];//"endTime",
		var i=0;
		for (i=0;i<idarr.length;i++){
			if(!$("#"+idarr[i]).val()){
				conuterr=conuterr+1;
				$("#"+idarr[i]).next("p").html("请填写"+$("#"+idarr[i]).attr("placeholder"))
			}else{
				$("#"+idarr[i]).next("p").html("")
			}
		}
		if(conuterr==0){
			if(isSaving){
				showAlert(1,"创建过于频繁,请稍后创建。")
				return;
			}else{
				isSaving=true;
			}
			$.ajax({
				type : "post",
				url : $URL_LANQIAOBEIDASAI + "/api/perlimMatch/save",	
				data : {
					matchName:matchName,
					prelimGroupId:groupId,
					matchStartTime:matchStartTime,
//					matchEndTime:matchEndTime,
//					matchTimeLen:matchTimeLen,
					matchAddress:matchAddress
				},
				dataType : "json",
				timeout : 60 * 1000,
				success : function(data, textStatus) {
					if(data.resultCode==0){
						$scope.searchList();
						$(".examDialog.create").hide();
						showAlert(1,"创建成功")
				    }else if(data.resultCode==-2){
				    	showAlert(0,data.resultMsg)
				    }
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					
				},
				complete : function(XMLHttpRequest, textStatus) {
					isSaving=false;
				}
			});
		}
	}

	$scope.init();
}])


var startTime = {
    elem: '#startTime',
    type:"datetime",
    format: 'YYYY-MM-DD hh:mm:ss',
    event: 'focus',
    istime: true,
    min: laydate.now(),
    max: '2099-12-31 23:59:59',
    istoday: false,
    choose: function(datas){
        setTime(this.elem,datas);
        e_time1.min = getDateStr(datas,+1); 
        e_time1.start = getDateStr(datas,+1); 
    }
};
$(function(){
//	laydate(startTime);
	var startTime = laydate({
    	elem: '#startTime',
    	type: 'datetime',
    	format: 'YYYY-MM-DD hh:mm',
    	istime: true,
    	min: laydate.now(),
        max: '2099-12-31 23:59:00',
    	theme: 'molv',
    	ready: function(date){
    		this.dateTime.hours=23;
    		this.dateTime.minutes=59;
    		this.dateTime.seconds=59;
		},
    	done: function(value, date, endDate){
    		if(value){
    			beginTime.config.max = {
        		        year:date.year,
        		        month:date.month-1,
        		        date: date.date,
        		        hours:date.hours>0?date.hours:23,
        		        minutes:date.minutes>0?date.minutes:59,
        		        seconds:date.seconds>0?date.seconds:59
        		      };
    		}else{
    			beginTime.config.max = {
        		        year:2099,
        		        month:11,
        		        date: 31,
        		        hours:0,
        		        minutes:0,
        		        seconds:0
    		      	};
    			
    		}
    	}
    });
	var pstartTime = laydate({
    	elem: '#pstartTime',
    	type: 'datetime',
    	format: 'YYYY-MM-DD hh:mm',
    	 istime: true,
    	theme: 'molv',
    	ready: function(date){
    		this.dateTime.hours=23;
    		this.dateTime.minutes=59;
    		this.dateTime.seconds=59;
		},
    	done: function(value, date, endDate){
    		if(value){
    			beginTime.config.max = {
        		        year:date.year,
        		        month:date.month-1,
        		        date: date.date,
        		        hours:date.hours>0?date.hours:23,
        		        minutes:date.minutes>0?date.minutes:59,
        		        seconds:date.seconds>0?date.seconds:59
        		      };
    		}else{
    			beginTime.config.max = {
        		        year:2099,
        		        month:11,
        		        date: 31,
        		        hours:0,
        		        minutes:0,
        		        seconds:0
    		      	};
    			
    		}
    	}
    });
//	var endTime = laydate({
//		elem: '#endTime',
//		type: 'datetime',
//		format: 'YYYY-MM-DD hh:mm',
//		istime: true,
//		theme: 'molv',
//		ready: function(date){
//			this.dateTime.hours=23;
//			this.dateTime.minutes=59;
//			this.dateTime.seconds=59;
//		},
//		done: function(value, date, endDate){
//			if(value){
//				beginTime.config.max = {
//						year:date.year,
//						month:date.month-1,
//						date: date.date,
//						hours:date.hours>0?date.hours:23,
//								minutes:date.minutes>0?date.minutes:59,
//										seconds:date.seconds>0?date.seconds:59
//				};
//			}else{
//				beginTime.config.max = {
//						year:2099,
//						month:11,
//						date: 31,
//						hours:0,
//						minutes:0,
//						seconds:0
//				};
//				
//			}
//		}
//	});
//	var pendTime = laydate({
//		elem: '#pendTime',
//		type: 'datetime',
//		format: 'YYYY-MM-DD hh:mm',
//		istime: true,
//		theme: 'molv',
//		ready: function(date){
//			this.dateTime.hours=23;
//			this.dateTime.minutes=59;
//			this.dateTime.seconds=59;
//		},
//		done: function(value, date, endDate){
//			if(value){
//				beginTime.config.max = {
//						year:date.year,
//						month:date.month-1,
//						date: date.date,
//						hours:date.hours>0?date.hours:23,
//								minutes:date.minutes>0?date.minutes:59,
//										seconds:date.seconds>0?date.seconds:59
//				};
//			}else{
//				beginTime.config.max = {
//						year:2099,
//						month:11,
//						date: 31,
//						hours:0,
//						minutes:0,
//						seconds:0
//				};
//				
//			}
//		}
//	});
})



















